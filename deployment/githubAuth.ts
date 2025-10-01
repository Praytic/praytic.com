import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";
import {iamService, stsService} from "./services";
import {app as places} from "./places/config"
import {app as portfolio} from "./portfolio/config"

const gcpConfig = new pulumi.Config("gcp");
const project = gcpConfig.require("project");

const githubActionsServiceAccount = new gcp.serviceaccount.Account("github-actions-service-account", {
  accountId: "github-actions-deployer",
  displayName: "GitHub Actions Deployer",
  description: "Service account for GitHub Actions to deploy to Cloud Storage",
});

const storageObjectsCreateBinding = new gcp.projects.IAMBinding("github-actions-storage-binding", {
  project: project,
  role: "roles/storage.expressModeServiceInput",
  members: [pulumi.interpolate`serviceAccount:${githubActionsServiceAccount.email}`],
});

const workloadIdentityPool = new gcp.iam.WorkloadIdentityPool("github-actions-pool", {
  workloadIdentityPoolId: "github-actions-pool",
  displayName: "GitHub Actions Pool",
  description: "Workload Identity Pool for GitHub Actions",
}, { dependsOn: [iamService, stsService] });

const workloadIdentityProvider = new gcp.iam.WorkloadIdentityPoolProvider("github-provider", {
  workloadIdentityPoolId: workloadIdentityPool.workloadIdentityPoolId,
  workloadIdentityPoolProviderId: "github-provider",
  displayName: "GitHub Provider",
  description: "GitHub OIDC Provider",
  attributeMapping: {
    "google.subject": "assertion.sub",
    "attribute.repository": "assertion.repository",
    "attribute.actor": "assertion.actor",
    "attribute.aud": "assertion.aud",
  },
  oidc: {
    issuerUri: "https://token.actions.githubusercontent.com",
  },
}, {dependsOn: [workloadIdentityPool]});

const workloadIdentityBinding = new gcp.serviceaccount.IAMBinding("github-actions-workload-identity", {
  serviceAccountId: githubActionsServiceAccount.name,
  role: "roles/iam.workloadIdentityUser",
  members: [portfolio.repo, places.repo].map(repo =>
    pulumi.interpolate`principalSet://iam.googleapis.com/${workloadIdentityPool.name}/attribute.repository/${repo}`
  ),
}, { dependsOn: [workloadIdentityPool] });

// Output the values needed for GitHub Secrets
export const outputs = {
  serviceAccountEmail: githubActionsServiceAccount.email,
  workloadIdentityProvider: pulumi.interpolate`projects/${project}/locations/global/workloadIdentityPools/${workloadIdentityPool.workloadIdentityPoolId}/providers/${workloadIdentityProvider.workloadIdentityPoolProviderId}`,
  projectId: project,
};

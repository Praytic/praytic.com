import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";

const gcpConfig = new pulumi.Config("gcp");
const project = gcpConfig.require("project");

export const githubActionsServiceAccount = new gcp.serviceaccount.Account("github-actions-service-account", {
  accountId: "github-actions-deployer",
  displayName: "GitHub Actions Deployer",
  description: "Service account for GitHub Actions to deploy to Cloud Storage",
});

export const storageObjectsCreateBinding = new gcp.projects.IAMBinding("github-actions-storage-binding", {
  project: project,
  role: "roles/storage.expressModeServiceInput",
  members: [pulumi.interpolate`serviceAccount:${githubActionsServiceAccount.email}`],
});

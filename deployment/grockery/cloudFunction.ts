import * as gcp from "@pulumi/gcp";
import { project, region, enableApis } from "./config";
import { bucket, sourceObject } from "./storage";
import { oauthClientSecret } from "./oauth";
import { sheetsServiceAccountSecret } from "./serviceAccount";

export const cloudFunction = new gcp.cloudfunctionsv2.Function("grockery", {
  name: "grockery",
  location: region,
  description: "Grockery - AI-powered receipt processing with Anthropic API",

  buildConfig: {
    runtime: "python311",
    entryPoint: "grockery_processor",
    source: {
      storageSource: {
        bucket: bucket.name,
        object: sourceObject.name,
      },
    },
  },

  serviceConfig: {
    maxInstanceCount: 10,
    minInstanceCount: 0,
    availableMemory: "512Mi",
    timeoutSeconds: 540,
    environmentVariables: {
      GCP_PROJECT: project,
      OAUTH_CLIENT_SECRET_NAME: oauthClientSecret.secretId,
      SHEETS_SERVICE_ACCOUNT_SECRET_NAME: sheetsServiceAccountSecret.secretId,
    },
    ingressSettings: "ALLOW_INTERNAL_AND_GCLB",
    allTrafficOnLatestRevision: true,
  },
}, {
  dependsOn: enableApis
});

export const cloudFunctionInvoker = new gcp.cloudfunctionsv2.FunctionIamMember("grockery-invoker", {
  project: project,
  location: region,
  cloudFunction: cloudFunction.name,
  role: "roles/cloudfunctions.invoker",
  member: "allUsers",
});

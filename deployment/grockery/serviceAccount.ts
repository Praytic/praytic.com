import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import { project } from "./config";

export const sheetsServiceAccount = new gcp.serviceaccount.Account("grockery-sheets-service-account", {
  accountId: "grockery-sheets-sa",
  displayName: "Grockery Sheets Service Account",
  description: "Service account for creating and managing Google Sheets",
});

export const sheetsServiceAccountKey = new gcp.serviceaccount.Key("grockery-sheets-service-account-key", {
  serviceAccountId: sheetsServiceAccount.name,
  publicKeyType: "TYPE_X509_PEM_FILE",
});

export const sheetsServiceAccountSecret = new gcp.secretmanager.Secret("grockery-sheets-service-account-key", {
  secretId: "grockery-sheets-service-account-key",
  replication: {
    auto: {},
  },
});

export const sheetsServiceAccountSecretVersion = new gcp.secretmanager.SecretVersion("grockery-sheets-service-account-key-version", {
  secret: sheetsServiceAccountSecret.id,
  secretData: sheetsServiceAccountKey.privateKey,
});

export const sheetsServiceAccountEditor = new gcp.projects.IAMMember("sheets-service-account-editor", {
  project: project,
  role: "roles/editor",
  member: pulumi.interpolate`serviceAccount:${sheetsServiceAccount.email}`,
});

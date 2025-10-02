import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";
import {app} from "./config";
import {firebaseService, firestoreService} from "../services";

const gcpConfig = new pulumi.Config("gcp")
const project = gcpConfig.require("project")

const firebaseProject = new gcp.firebase.Project(`${app.name}-firebase`, {
  project: project,
}, { dependsOn: [firebaseService] });

export const webApp = new gcp.firebase.WebApp(`${app.name}-webapp`, {
  project: project,
  displayName: app.name,
}, { dependsOn: [firebaseProject] });

export const webAppConfig = webApp.appId.apply(appId =>
  gcp.firebase.getWebAppConfig({
    webAppId: appId,
    project: project,
  })
);

const database = new gcp.firestore.Database(`${app.name}-database`, {
  name: "places",
  locationId: "nam5",
  type: "FIRESTORE_NATIVE",
  concurrencyMode: "OPTIMISTIC",
  appEngineIntegrationMode: "DISABLED",
  deleteProtectionState: "DELETE_PROTECTION_DISABLED",
}, {dependsOn: [firestoreService]});

// Create Firestore Rules
const primary = new gcp.firebaserules.Ruleset("primary", {
  source: {
    files: [{
      content: "service cloud.firestore {match /databases/{database}/documents { match /{document=**} { allow read, write: if true; } } }",
      name: "firestore.rules",
      fingerprint: "",
    }],
    language: "",
  },
  project: project,
});

const release = new gcp.firebaserules.Release("primary", {
  name: pulumi.interpolate`cloud.firestore/${database.name}`,
  rulesetName: primary.name,
  project: project,
});

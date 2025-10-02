import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";
import {app} from "./config";
import {firebaseService, firestoreService, mapsJavascriptService, placesService} from "../services";
import {domain} from "./website";

const gcpConfig = new pulumi.Config("gcp")
const project = gcpConfig.require("project")

const firebaseProject = new gcp.firebase.Project(`${app.name}-firebase`, {
  project: project,
}, { dependsOn: [firebaseService] });

const webApp = new gcp.firebase.WebApp(`${app.name}-webapp`, {
  project: project,
  displayName: app.name,
}, { dependsOn: [firebaseProject] });

const database = new gcp.firestore.Database(`${app.name}-database`, {
  name: "places",
  locationId: "nam5",
  type: "FIRESTORE_NATIVE",
  concurrencyMode: "OPTIMISTIC",
  appEngineIntegrationMode: "DISABLED",
  deleteProtectionState: "DELETE_PROTECTION_DISABLED",
  project: project
}, {dependsOn: [firestoreService]});

export const firebaseConfig = webApp.appId.apply(appId =>
  gcp.firebase.getWebAppConfig({
    webAppId: appId,
    project: project,
  })
);

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

const mapsApiKey = new gcp.projects.ApiKey(`${app.name}-maps-key`, {
  displayName: `${app.name}-google-maps`,
  project: project,
  restrictions: {
    apiTargets: [
      {
        service: "maps-backend.googleapis.com",
      },
      {
        service: "places-backend.googleapis.com",
      },
    ],
    browserKeyRestrictions: {
      allowedReferrers: [
        `https://${domain}/*`,
        `http://localhost:3000/*`
      ],
    },
  },
}, { dependsOn: [mapsJavascriptService, placesService] });

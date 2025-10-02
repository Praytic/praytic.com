import * as gcp from "@pulumi/gcp";

export const computeService = new gcp.projects.Service("compute", {
  service: "compute.googleapis.com",
  disableOnDestroy: false,
});

export const artifactRegistryService = new gcp.projects.Service("artifact-registry", {
  service: "artifactregistry.googleapis.com",
  disableOnDestroy: false,
});

export const cloudRunService = new gcp.projects.Service("cloud-run", {
  service: "run.googleapis.com",
  disableOnDestroy: false,
});

export const firestoreService = new gcp.projects.Service("firestore", {
  service: "firestore.googleapis.com",
  disableOnDestroy: false,
});

export const firebaseService = new gcp.projects.Service("firebase", {
  service: "firebase.googleapis.com",
  disableOnDestroy: false,
});

export const storageService = new gcp.projects.Service("storage", {
  service: "storage.googleapis.com",
  disableOnDestroy: false,
});

export const iamService = new gcp.projects.Service("iam", {
  service: "iam.googleapis.com",
  disableOnDestroy: false,
});

export const stsService = new gcp.projects.Service("sts", {
  service: "sts.googleapis.com",
});

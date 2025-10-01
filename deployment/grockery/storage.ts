import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

export const bucket = new gcp.storage.Bucket("grockery-source", {
  location: "US",
  uniformBucketLevelAccess: true,
});

export const functionSource = new pulumi.asset.FileArchive("../src");

export const sourceObject = new gcp.storage.BucketObject("grockery-source-zip", {
  bucket: bucket.name,
  source: functionSource,
});

import * as loadBalancer from "./loadBalancer";
import * as githubAuth from "./githubAuth";
import * as places from "./places/website";
import * as homepage from "./homepage/website";

export const placesWebsite = {
  domain: places.domain,
  bucket: places.bucket.name,
  bucketBackend: places.backendBucket.name
};
export const homepageWebsite = {
  domain: homepage.domain,
  bucket: homepage.bucket.name,
  bucketBackend: homepage.backendBucket.name
};
export const githubServiceAccountEmail = githubAuth.outputs.serviceAccountEmail;
export const githubWorkloadIdentityProvider = githubAuth.outputs.workloadIdentityProvider;
export const urlMap = loadBalancer.urlMap.id;

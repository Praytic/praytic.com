import * as loadBalancer from "./loadBalancer";
import * as githubAuth from "./githubAuth";
import * as places from "./places/website";
import * as portfolio from "./portfolio/website";

export const placesWebsite = {
  domain: places.domain,
  bucket: places.bucket.name,
  bucketBackend: places.backendBucket.name
};
export const portfolioWebsite = {
  domain: portfolio.domain,
  bucket: portfolio.bucket.name,
  bucketBackend: portfolio.backendBucket.name
};
export const githubServiceAccountEmail = githubAuth.outputs.serviceAccountEmail;
export const githubWorkloadIdentityProvider = githubAuth.outputs.workloadIdentityProvider;
export const urlMap = loadBalancer.urlMap.id;

import * as loadBalancer from "./loadBalancer";
import * as githubAuth from "./githubAuth";

export const githubServiceAccountEmail = githubAuth.outputs.serviceAccountEmail;
export const githubWorkloadIdentityProvider = githubAuth.outputs.workloadIdentityProvider;
export const githubProjectId = githubAuth.outputs.projectId;
export const urlMap = loadBalancer.urlMap;

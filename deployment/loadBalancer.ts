import * as gcp from "@pulumi/gcp";
import * as places from "./places";
import {computeService} from "./services"

export const urlMap = new gcp.compute.URLMap("default-url-map", {
  defaultService: places.website.backendBucket.selfLink,
  hostRules: [
    {
      hosts: [places.website.domain],
      pathMatcher: "places-matcher",
    },
  ],
  pathMatchers: [
    {
      name: "places-matcher",
      defaultService: places.website.backendBucket.selfLink,
    },
  ],
}, { dependsOn: [computeService, places.website.backendBucket]});


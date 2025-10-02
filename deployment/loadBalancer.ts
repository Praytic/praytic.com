import * as gcp from "@pulumi/gcp";
import * as homepage from "./homepage";
import * as places from "./places";
import {computeService} from "./services"

export const urlMap = new gcp.compute.URLMap("default-url-map", {
  defaultService: homepage.website.backendBucket.selfLink,
  hostRules: [
    {
      hosts: [homepage.website.domain],
      pathMatcher: "homepage-matcher",
    },
    {
      hosts: [places.website.domain],
      pathMatcher: "places-matcher",
    },
  ],
  pathMatchers: [
    {
      name: "homepage-matcher",
      defaultService: homepage.website.backendBucket.selfLink,
    },
    {
      name: "places-matcher",
      defaultService: places.website.backendBucket.selfLink,
    },
  ],
}, { dependsOn: [computeService, places.website.backendBucket, homepage.website.backendBucket]});


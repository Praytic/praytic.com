import * as gcp from "@pulumi/gcp";
import * as portfolio from "./portfolio";
import * as places from "./places";
import {computeService} from "./services"

export const urlMap = new gcp.compute.URLMap("url-map", {
  defaultService: portfolio.website.backendBucket.selfLink,
  hostRules: [
    {
      hosts: [places.website.domain],
      pathMatcher: "path-matcher-1",
    },
  ],
  pathMatchers: [
    {
      name: "path-matcher-1",
      defaultService: places.website.backendBucket.selfLink,
    },
  ],
}, { dependsOn: [computeService, places.website.backendBucket, portfolio.website.backendBucket]});

import {ResourceOptions} from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import {computeService, storageService} from "./services"
import * as pulumi from "@pulumi/pulumi";

export class ResourceUtils {
  constructor(
    private appName: string
  ) {}

  createWebBucket(options?: ResourceOptions): gcp.storage.Bucket {
    const bucket = new gcp.storage.Bucket(`${this.appName}-bucket`, {
      location: "US",
      forceDestroy: true,
      uniformBucketLevelAccess: true,
      website: {
        mainPageSuffix: "index.html",
        notFoundPage: "index.html",
      },
      cors: [{
        origins: ["*"],
        methods: [
          "GET",
          "HEAD",
          "PUT",
          "POST",
          "DELETE",
        ],
        responseHeaders: ["*"],
        maxAgeSeconds: 3600,
      }],
    }, { ...options, dependsOn: [storageService] });

    return bucket;
  }

  createBucketIAMBinding(bucket: gcp.storage.Bucket, options?: ResourceOptions): gcp.storage.BucketIAMBinding {
    const bucketIamBinding = new gcp.storage.BucketIAMBinding(`${this.appName}-bucket-iam`, {
      bucket: bucket.name,
      role: "roles/storage.objectViewer",
      members: ["allUsers"],
    }, { ...options, dependsOn: [storageService, bucket] });

    return bucketIamBinding;
  }

  createBackendBucket(bucket: gcp.storage.Bucket, options?: ResourceOptions): gcp.compute.BackendBucket {
    const backendBucket = new gcp.compute.BackendBucket(`${this.appName}-backend-bucket`, {
      name: `${this.appName}-backend-bucket`,
      bucketName: bucket.name,
      enableCdn: false,
    }, { ...options, dependsOn: [computeService, bucket] });

    return backendBucket;
  }

  createNetworkEndpointGroup(cloudFunction: gcp.cloudfunctionsv2.Function, options?: ResourceOptions): gcp.compute.RegionNetworkEndpointGroup {
    const functionNeg = new gcp.compute.RegionNetworkEndpointGroup(`${this.appName}-function-neg`, {
      name: `${this.appName}-function-neg`,
      region: cloudFunction.location,
      networkEndpointType: "SERVERLESS",
      cloudFunction: {
        function: cloudFunction.name,
      },
    }, { ...options, dependsOn: [computeService, cloudFunction] });

    return functionNeg
  }

  createBackendService(functionNeg: gcp.compute.RegionNetworkEndpointGroup, options?: ResourceOptions): gcp.compute.BackendService {
    const functionBackend = new gcp.compute.BackendService(`${this.appName}-function-backend`, {
      name: `${this.appName}-function-backend`,
      protocol: "HTTPS",
      backends: [{
        group: functionNeg.selfLink,
      }],
    }, { ...options, dependsOn: [computeService, functionNeg] });

    return functionBackend;
  }
}

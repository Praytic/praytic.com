import * as pulumi from "@pulumi/pulumi";
import {utils} from "./config";

const webConfig = new pulumi.Config("web");

export const bucket = utils.createWebBucket()
const bucketIamBinding = utils.createBucketIAMBinding(bucket)
export const backendBucket = utils.createBackendBucket(bucket)
export const domain = webConfig.require("domain")

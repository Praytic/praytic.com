import * as pulumi from "@pulumi/pulumi";
import {utils} from "./config";

const webConfig = new pulumi.Config("web");

const bucket = utils.createBucket()
const bucketIamBinding = utils.createBucketIAMBinding(bucket)
export const backendBucket = utils.createBackendBucket(bucket)
export const domain = webConfig.require("domain")

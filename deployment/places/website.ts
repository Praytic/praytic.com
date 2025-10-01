import * as pulumi from "@pulumi/pulumi";
import {app, utils} from "./config";

const webConfig = new pulumi.Config("web");

export const bucket = utils.createWebBucket()
const bucketIamBinding = utils.createBucketIAMBinding(bucket)
export const backendBucket = utils.createBackendBucket(bucket)
export const domain = `${app.name}.${webConfig.require("domain")}`

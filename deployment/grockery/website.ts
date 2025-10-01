import {app, utils} from "./config";
import * as pulumi from "@pulumi/pulumi";
import {cloudFunction} from "./cloudFunction"

const webConfig = new pulumi.Config("web");

const bucket = utils.createWebBucket()
const bucketIamBinding = utils.createBucketIAMBinding(bucket)
export const backendBucket = utils.createBackendBucket(bucket)
const neg = utils.createNetworkEndpointGroup(cloudFunction)
export const backendService = utils.createBackendService(neg)
export const domain = `${app.name}.${webConfig.require("domain")}`

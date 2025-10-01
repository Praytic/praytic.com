import * as pulumi from "@pulumi/pulumi";
import {ResourceUtils} from "../common";

type App = {
  name: string;
  repo: string;
}

const gcpConfig = new pulumi.Config("gcp");
const appConfig = new pulumi.Config("app").requireObject<App>("default")

export const project = gcpConfig.require("project");
export const app = appConfig
export const utils = new ResourceUtils(app.name)

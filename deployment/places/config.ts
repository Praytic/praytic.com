import * as pulumi from "@pulumi/pulumi";
import {ResourceUtils} from "../common";

type App = {
  name: string;
  repo: string;
}

const appConfig = new pulumi.Config("app").requireObject<App>("places")

export const app = appConfig
export const utils = new ResourceUtils(app.name)

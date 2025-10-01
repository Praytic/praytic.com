import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";
import {project, app} from "./config";
import {domain} from "./website";

export const oauthClient = new gcp.iam.OauthClient(`${app.name}-oauth-client`, {
  displayName: "Grockery Web Application",
  description: "OAuth client for Grockery web application authentication",
  location: "global",
  oauthClientId: `${app.name}-web-client`,
  clientType: "CONFIDENTIAL_CLIENT",
  allowedGrantTypes: ["authorization_code_grant"],
  allowedRedirectUris: [
    `https://${domain}`,
    "http://localhost:8000"
  ],
  allowedScopes: ["openid", "email"],
});

export const oauthClientCredential = new gcp.iam.OauthClientCredential(`${app.name}-oauth-client-credential`, {
  oauthclient: `${app.name}-web-client`,
  location: "global",
  oauthClientCredentialId: `${app.name}-credential`,
});

export const oauthClientSecret = new gcp.secretmanager.Secret(`${app.name}-oauth-client`, {
  secretId: `${app.name}-oauth-client`,
  replication: {
    auto: {},
  },
});

export const oauthClientSecretVersion = new gcp.secretmanager.SecretVersion(`${app.name}-oauth-client-version`, {
  secret: oauthClientSecret.id,
  secretData: pulumi.jsonStringify({
    web: {
      client_id: oauthClient.clientId,
      project_id: project,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_secret: oauthClientCredential.clientSecret,
      redirect_uris: [
        `https://${domain}`,
        "http://localhost:8000"
      ],
      javascript_origins: [
        `https://${domain}`,
        "http://localhost:8000"
      ]
    }
  }),
});

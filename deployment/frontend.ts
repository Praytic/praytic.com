import * as gcp from "@pulumi/gcp";
import { urlMap } from "./loadBalancer";
import * as places from "./places";

const staticIp = new gcp.compute.GlobalAddress("lb-static-ip", {
  name: "lb-ip",
});

const sslCert = new gcp.compute.ManagedSslCertificate("https-ssl-cert", {
  name: "https-ssl-cert",
  managed: {
    domains: [
      places.website.domain,
    ],
  },
});

const httpsProxy = new gcp.compute.TargetHttpsProxy("https-proxy", {
  name: "https-proxy",
  urlMap: urlMap.id,
  sslCertificates: [sslCert.id],
});

// HTTP to HTTPS redirect URL map
const httpRedirectUrlMap = new gcp.compute.URLMap("http-redirect-url-map", {
  name: "http-redirect-map",
  defaultUrlRedirect: {
    httpsRedirect: true,
    stripQuery: false,
  },
});

const httpProxy = new gcp.compute.TargetHttpProxy("http-proxy", {
  name: "http-proxy",
  urlMap: httpRedirectUrlMap.id,
});


const httpsForwardingRule = new gcp.compute.GlobalForwardingRule("https-forwarding-rule", {
  name: "https-rule",
  target: httpsProxy.id,
  portRange: "443",
  ipAddress: staticIp.address,
  ipProtocol: "TCP",
  loadBalancingScheme: "EXTERNAL_MANAGED",
});

const httpForwardingRule = new gcp.compute.GlobalForwardingRule("http-forwarding-rule", {
  name: "http-rule",
  target: httpProxy.id,
  portRange: "80",
  ipAddress: staticIp.address,
  ipProtocol: "TCP",
  loadBalancingScheme: "EXTERNAL_MANAGED",
});

export const loadBalancerIp = staticIp.address;
export const sslCertId = sslCert.id;

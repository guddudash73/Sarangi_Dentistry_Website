// sst.config.ts
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

function resolveStage(inputStage?: string) {
  return (inputStage || process.env.SST_STAGE || "dev").trim();
}

function requireEnv(name: string): string {
  const value = (process.env[name] || "").trim();

  if (!value) {
    throw new Error(`${name} is required for website deployment.`);
  }

  return value;
}

function getDomainForStage(stage: string): string | undefined {
  if (stage === "prod") return requireEnv("WEBSITE_DOMAIN_PROD");
  if (stage === "stage") return requireEnv("WEBSITE_DOMAIN_STAGE");

  return undefined;
}

function getRedirectDomainsForStage(
  stage: string,
  domain?: string,
): string[] | undefined {
  if (stage !== "prod" || !domain) {
    return undefined;
  }

  // Production-only canonical redirect:
  // https://www.sarangidentistry.in -> https://sarangidentistry.in
  return [`www.${domain}`];
}

export default $config({
  app() {
    return {
      name: "sarangi-website",
      home: "aws",
      providers: {
        aws: { region: "ap-south-1" },
      },
    };
  },

  async run() {
    const stage = resolveStage();

    const domain = getDomainForStage(stage);
    const redirectDomains = getRedirectDomainsForStage(stage, domain);

    const certArn =
      stage === "prod" || stage === "stage"
        ? requireEnv("WEBSITE_CERT_ARN")
        : undefined;

    const dcmCmsApiBaseUrl = requireEnv("DCM_CMS_API_BASE_URL");
    const cmsPublicApiKey = requireEnv("CMS_PUBLIC_API_KEY");

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
      (domain ? `https://${domain}` : "http://localhost:3000");

    const router =
      domain && certArn
        ? new sst.aws.Router("WebsiteRouter", {
            domain: {
              name: domain,
              redirects: redirectDomains,
              cert: certArn,

              // Keep DNS manual because your Route 53 records are already being
              // managed directly in the hosted zone.
              dns: false as const,
            },
          })
        : new sst.aws.Router("WebsiteRouter");

    const web = new sst.aws.Nextjs("Website", {
      path: ".",
      router: {
        instance: router,
      },
      environment: {
        NODE_ENV: "production",
        DCM_CMS_API_BASE_URL: dcmCmsApiBaseUrl,
        CMS_PUBLIC_API_KEY: cmsPublicApiKey,
        NEXT_PUBLIC_SITE_URL: siteUrl,
      },
    });

    return {
      stage,
      domain: domain ?? "",
      redirectDomains: redirectDomains ?? [],
      siteUrl,
      routerUrl: router.url,
      routerDistributionId: router.distributionID,
      webUrl: web.url,
    };
  },
});

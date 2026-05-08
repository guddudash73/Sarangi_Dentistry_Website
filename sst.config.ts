// sst.config.ts
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

export default $config({
  app(input: any) {
    const stage = resolveStage(input?.stage);

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
              cert: certArn,
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
      siteUrl,
      routerUrl: router.url,
      routerDistributionId: router.distributionID,
      webUrl: web.url,
    };
  },
});

import * as Sentry from "@sentry/node";

// Initialize Sentry
Sentry.init({
    dsn: "https://91f3896cf91df4e8a6e40aad6a50bf23@o4510362322731008.ingest.us.sentry.io/4510362333020160",
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    integrations:[Sentry.mongooseIntegration()],
    sendDefaultPii: true,
});
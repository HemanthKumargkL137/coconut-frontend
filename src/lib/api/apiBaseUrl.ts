const configuredBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").trim();

// A URL without a protocol is treated by browsers as a path on the frontend
// domain. Add HTTPS so a value such as `api.example.com` still works.
const apiBaseUrl = configuredBaseUrl
  ? (/^https?:\/\//i.test(configuredBaseUrl)
      ? configuredBaseUrl
      : `https://${configuredBaseUrl}`
    ).replace(/\/+$/, "")
  : "";

export default apiBaseUrl;

# Security Policy

## Supported Versions

This is an open source project that is provided as-is without warranty or liability. As such, we can make no support commitment. The maintainers will do the best they can to address any report promptly and responsibly.

While the discovery of new vulnerabilities is rare, we also recommend always using the latest versions of this library and its official companion libraries to ensure your application remains as secure as possible.

## Reporting a Vulnerability

Please use the "Private vulnerability reporting" feature in the GitHub repository (under the "Security" tab).

Please note that we do not consider XSS via asset loading methods a valid attack vector, because it can only happen if the user intentionally uses untrusted content as an asset. This is similar to knowingly pasting untrusted scripts into a browser console. We explicitly warn users against using untrusted content as a resource in their application.

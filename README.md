# Flarelytics

[![](https://img.shields.io/badge/Built%20on-Cloudflare%20Workers-orange)](https://workers.cloudflare.com)
[![TypeScript](https://img.shields.io/badge/--3178C6?logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org/)
[![JavaScript](https://img.shields.io/badge/--F7DF1E?logo=javascript&logoColor=000)](https://www.javascript.com/)
[![License](https://img.shields.io/badge/Licence-GPLv3%20-blue.svg)](./LICENSE)


Web analytics project to track the time visitors spend on the website.

Built on top of Cloudflare Workers and MongoDB. Currently, supports tracking for a *single domain* only.

## Why this project?

Being able to tell if people spend time reading your content (e.g. blog article) is crucial and makes you feel great too. Unfortunately, the popular web analytics services are violating visitors' privacy (e.g., Google Analytics is illegal in some EU states) or do not have a metric that checks how long people spend reading (e.g., [Plausible for single page visits](https://github.com/plausible/analytics/discussions/863)).

In addition, due to the increased ad/tracker blockers, even privacy-friendly web analytics tools might be blocked. One of the solutions is to deploy your custom web analytics solution to reduce the number of blocks. [This article](https://www.ctrl.blog/entry/ctrl-analytics.html) dives into pros and cons of self-hosted web analytics.

The Flarelytics project was born in response to the need for a self-deployable, privacy-friendly web analytics service to collect the time readers spend on each webpage.

## Development

The project consists of two parts:

- [Browser script](./analytics) - a JS script that needs to be embedded to the website; it sends events when visitors open and close the website.
- [Backend](./src) - a Cloudflare Worker with a simple HTTP API that handles events.

[This article](https://vmois.dev/build-web-analytics-project-from-scratch/) explains how the browser script works.

### Prerequisites

Do the steps below to set up the development environment:

1. Create [Cloudflare account](https://dash.cloudflare.com/sign-up/workers-and-pages). It is free.
2. Install Node.js and npm.
3. Install [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/).


## Where the project name comes from?

The project name was created from simple concatenation:

CloudFLARE + AnaLYTICS = Flarelytics

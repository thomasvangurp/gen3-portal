# se4bio/gen3-portal

Portal shell for the Clinical Genomic Research Workspace. Forked from
[`uc-cdis/commons-frontend-app`](https://github.com/uc-cdis/commons-frontend-app)
so we can register first-party Gen3 apps (currently: TrialMatcher) as
native components — sharing the portal's redux store, auth session, and
nav chrome — without duplicating app code in this repo.

App components are published from their own repos as npm packages and
imported here. Right now:

| App         | Source repo                              | Package                       |
|-------------|------------------------------------------|-------------------------------|
| TrialMatcher | `se4bio/clinical-trial-matcher-fe`      | `@se4bio/trial-matcher-app`   |

Registration happens in a single line in `src/pages/_app.tsx`, via
`src/lib/apps/registerTrialMatcher.ts`. Adding a new app = publish its
npm package and add a `registerX()` call.

## Build

```bash
# Locally:
npm ci
npm run build
npm start

# Docker (matches prod):
docker build -f Dockerfile.production -t se4bio/gen3-portal:local \
  --secret id=github_token,env=GITHUB_TOKEN .
```

The `github_token` BuildKit secret is a PAT with `read:packages` scope —
required because `@se4bio/trial-matcher-app` lives on GitHub Packages.
CI gets this automatically from `${{ secrets.GITHUB_TOKEN }}`.

## Release

- **Image**: push to `main` (or tag `v*`) triggers
  `.github/workflows/build-image.yml`, which publishes
  `ghcr.io/se4bio/gen3-portal:{main,latest,vX.Y.Z,sha-<sha>}`.
- **Upstream sync**: no automation — merge from
  `uc-cdis/commons-frontend-app:main` manually when we want to pick up
  changes. The diff against upstream is intentionally small (one import
  + one call in `_app.tsx`, plus package.json deps).

## Config

Portal runtime configs (`analysisTools.json`, `workspace.json`, etc.)
are NOT in this repo. They live in
[`se4bio/gen3-config`](https://github.com/se4bio/gen3-config) under
`<env>/frontend-framework-config/` and are mounted into the container
via a ConfigMap at `/gen3/config/gen3/`.

// Registers the CTM React component shipped by @se4bio/trial-matcher-app
// as a native Gen3App. Portal's /app/[appName] route will look up by
// name and render it inline, under the same NavPageLayout as every other
// Gen3 app, with shared redux store and auth session.
import { createGen3App } from '@gen3/core';
import { TrialMatcherApp } from '@se4bio/trial-matcher-app';

const NAME = 'TrialMatcher';
const VERSION = '1.0.0';

export const registerTrialMatcherApp = () => {
  createGen3App({
    App: TrialMatcherApp,
    name: NAME,
    version: VERSION,
    requiredEntityTypes: [],
  });
};

export const TrialMatcherAppName = NAME;

import type { Options } from '@wdio/types';
import { config as baseConfig } from './wdio.base.conf';

export const config: Options.Testrunner = {
    ...baseConfig,

    runner: 'local',

    specs: ['./test/features/*.feature'],
    exclude: ['./test/specs/end2end.spec.js'],

    maxInstances: 10,

    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                binary: '/Applications/Google Chrome 2.app/Contents/MacOS/Google Chrome',
                args: ['--no-sandbox', '--lang=en-US', '--start-maximized'],
            },
        } as Options.Capabilities,
    ],

    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://sapui5.hana.ondemand.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: ['@sap_oss/wdio-qmate-service'],

    framework: 'cucumber',

    cucumberOpts: {
        require: ['./test/step-definitions/*.ts', './test/support/world.ts'],
        timeout: 60000,
    },

    reporters: [
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
                useCucumberStepReporter: true,
            },
        ],
    ],

    beforeScenario: async function (_uri, _feature, scenario) {
        const { default: allure } = await import('@wdio/allure-reporter');
        allure.addFeature(scenario.pickle.name);
        scenario.pickle.parameters.forEach(param => {
            allure.addParameter(param.name, param.value);
        });
    },

    afterScenario: async function () {
        await util.browser.clearBrowser();
    },

    afterTest: async function (_test, _context, { passed }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    },
};
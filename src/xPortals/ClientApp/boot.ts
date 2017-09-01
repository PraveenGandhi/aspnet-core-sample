import 'isomorphic-fetch';
import { Aurelia, PLATFORM } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import 'jquery';
declare const IS_DEV_BUILD: boolean; // The value is supplied by Webpack during the build

export function configure(aurelia: Aurelia) {
    aurelia.use.standardConfiguration().
        //feature(PLATFORM.moduleName('app/components/resources')).
        plugin(PLATFORM.moduleName('aurelia-semantic-ui'));

    if (IS_DEV_BUILD) {
        aurelia.use.developmentLogging();
    }

    new HttpClient().configure(config => {
        const baseUrl = document.getElementsByTagName('base')[0].href;
        config.withBaseUrl(baseUrl)
            .withDefaults({
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'Fetch'
                }
            });
    });

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app/components/app/app')));
}

import { Aurelia, PLATFORM } from 'aurelia-framework';
declare const IS_DEV_BUILD: boolean; // The value is supplied by Webpack during the build

export async function configure(aurelia: Aurelia) {
    aurelia.use.
        standardConfiguration().
        feature(PLATFORM.moduleName('xPortals/resources/index')).
        plugin(PLATFORM.moduleName('aurelia-semantic-ui'));

    if (IS_DEV_BUILD) {
        aurelia.use.developmentLogging();
    }

    await aurelia.start();
    aurelia.setRoot(PLATFORM.moduleName('xPortals/app/app'));
}

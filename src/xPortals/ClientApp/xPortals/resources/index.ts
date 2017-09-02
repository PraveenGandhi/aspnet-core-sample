import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration): void {
    config.aurelia.use.globalResources(PLATFORM.moduleName('./elements/dso-header'));
    config.aurelia.use.globalResources(PLATFORM.moduleName('./elements/dso-footer'));
    config.aurelia.use.globalResources(PLATFORM.moduleName('./value-converters/capital'));
}
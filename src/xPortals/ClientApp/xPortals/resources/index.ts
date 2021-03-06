﻿import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration): void {
    config.globalResources([
        PLATFORM.moduleName('./elements/dso-header'),
        PLATFORM.moduleName('./elements/dso-footer'),
        PLATFORM.moduleName('./elements/form-control'),
        PLATFORM.moduleName('./elements/display-errors'),

        PLATFORM.moduleName('./value-converters/capital'),
        PLATFORM.moduleName('./value-converters/date')
    ]);
}
import { Aurelia, PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'xPortals';
        config.map([
            { route: ['', 'home'],                      title: 'Home',                  name: 'home',                moduleId: PLATFORM.moduleName('../General/home/home')},
            { route: '/mobile-verification/:id/:phone', title: 'Mobile Verification',   name: 'mobile-verification', moduleId: PLATFORM.moduleName('../General/home/registration/mobileVerification')},
            { route: '/set-password/:id/:fullName',     title: 'Registration',          name: 'set-password',        moduleId: PLATFORM.moduleName('../General/home/registration/setPassword')}
        ]);

        this.router = router;
    }
}

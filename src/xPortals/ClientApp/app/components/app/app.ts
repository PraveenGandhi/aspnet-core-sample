import { Aurelia, PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
    router: Router;

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'xPortals';
        config.map([{
            route: ['', 'home'],
            name: 'home',
            settings: { icon: 'home' },
            moduleId: PLATFORM.moduleName('../General/home/home'),
            nav: true,
            title: 'Home'
        },
        {
            route: '/mobile-verification/:id/:phone',
            name: 'mobile-verification',
            moduleId: PLATFORM.moduleName('../General/Registration/MobileVerification'),
            title: 'Mobile Verification'
        },
        {
            route: '/set-password/:id/:fullName',
            name: 'set-password',
            moduleId: PLATFORM.moduleName('../General/Registration/SetPassword'),
            title: 'Registration'
        }
        ]);

        this.router = router;
    }
}

import {Component} from 'angular2/core';
import {
    ROUTER_PROVIDERS
   ,ROUTER_DIRECTIVES
   ,Router
   ,RouteConfig
   ,RouterOutlet
   ,RouterLink
   ,CanActivate
} from 'angular2/router'

import {Auth} from '../services/AuthService';
import {Login} from '../login/login.component.js';
import {Home} from '../home/home.component.js';

let authModel = new Auth;
let ngRouter = null;

@CanActivate((router:Router) => {
    if (!authModel.isLoggedIn()) {
        ngRouter.navigate(['Login']);
        return false;
    }
    return true;
})
@Component({
    selector: 'index',
    providers: [ROUTER_PROVIDERS],
    template: ''
})
class Index{
    constructor(router:Router) {
        ngRouter.navigate(['Home']);
    }
};

@Component({
    selector: 'irrigation',
    providers: [ROUTER_PROVIDERS,Auth],
    template: require('./app.template.html')
})
class App {
    constructor(router:Router) {
        router.config([
            { path: '/', component: Index, name: 'Index'},
            { path: '/home', component: Home, name: 'Home', useAsDefault: true},
            { path: '/**', component: Login, name:'Login'}
        ]);
        ngRouter = router;
    }
}

module.exports.App = App;
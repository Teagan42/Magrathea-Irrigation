import {Component} from 'angular2/core';
import {ROUTER_PROVIDERS,Router} from 'angular2/router'
@Component({
    providers: [ROUTER_PROVIDERS, Router]
})
class Auth {
    constructor() {
        this.loggedIn = true;
    }

    login() {
        this.loggedIn = true;
    }

    logout() {
        this.loggedIn = false;
    }

    check() {
        console.log('auth check: ', this.loggedIn);
        return new Promise((resolve) => {
            return resolve(this.loggedIn);
        })
    }

    isLoggedIn() {
        // TODO
        return document.cookie.indexOf("magratheaToken") >= 0 ? true : false;;
    }
}

module.exports.Auth = Auth

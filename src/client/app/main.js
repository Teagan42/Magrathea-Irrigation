
import {bootstrap} from 'angular2/platform/browser';
import {provide, PLATFORM_DIRECTIVES} from 'angular2/core';
import {App} from './app.component.js';
import {Valve} from '../valve/valve.component.js';
import {
    ROUTER_PROVIDERS
   , ROUTER_DIRECTIVES
   , APP_BASE_HREF
   , LocationStrategy
   , HashLocationStrategy
} from 'angular2/router'



bootstrap(
    App
    , provide(PLATFORM_DIRECTIVES, {
        useValue: [ROUTER_DIRECTIVES]
        , multi: true
    })
    , provide(APP_BASE_HREF, {
        useValue: '/'
    })
    , provide(LocationStrategy, {
        useClass: HashLocationStrategy
    })
);


import {Component} from 'angular2/core';
import {CanActivate} from 'angular2/router';
import {Valve} from '../valve/valve.component';

@Component({
    selector: 'home',
    providers: [],
    directives: [Valve],
    template: require('./home.template.html')
})
class Home {
    constructor() {}
}


module.exports.Home = Home;
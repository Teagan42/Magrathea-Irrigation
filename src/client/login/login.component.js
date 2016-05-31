import {Component} from 'angular2/core';
import {CanActivate} from 'angular2/router';
//import 'paper-button/paper-button.html';

@Component({
    selector: 'login',
    providers: [],
    template: require('./login.template.html')
})
class Login {
    constructor() {}
}


module.exports.Login = Login;
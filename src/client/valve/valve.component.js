import {Component, Input} from 'angular2/core';
import {CanActivate} from 'angular2/router';

@Component({
    selector: 'valve',
    providers: [],
    template: require('./valve.template.html')
})
class Valve {
    @Input() valveName;
    @Input() valveStatus;
    constructor() {
    }
}

module.exports.Valve = Valve;
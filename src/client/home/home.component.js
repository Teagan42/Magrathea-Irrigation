import {Component} from 'angular2/core';
import {CanActivate} from 'angular2/router';
import {Valve} from '../valve/valve.component';
import {Http, headers} from 'angular2/http';

@Component({
    selector: 'home',
    providers: [],
    directives: [Valve],
    template: require('./home.template.html')
})
class Home {
    constructor() {
        this.valves = [];
        this.http = new Http();
        
        this.http.get('/api/valves')
            .map((res) => res.text())
            .subscribe((data) => this.valves.concat(data)
                    , (err) => console.log(err)
                    , () => console.log('Complete'));
    }
}


module.exports.Home = Home;

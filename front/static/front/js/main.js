import {CalendarApp} from "./apps/calendar-app.js";
import {ProfileApp} from "./apps/profile-app.js";
import {HomeApp} from "./apps/home-app.js";
import {CommunityApp} from "./apps/community-apps.js";
import * as base from './base.js';

async function get_user(){
    let request = await base.sendRequest(
        '/api/web-app/v1/me/',
        '',
        'GET',
    );
    if(request.ok){
        return await request.json();
    }else{
        window.Telegram.WebApp.showAlert('Не удалось загрузить данные =(')
        window.Telegram.WebApp.close();

    }
}

user = await get_user();

window.Telegram.WebApp.expand();

export class MainApp {
    default_apps = [
        new HomeApp(),
        new CalendarApp(),
        new ProfileApp(),
        new CommunityApp()

    ];

    constructor() {
        this.build_menu();
    }

    build_menu() {
        let li = document.getElementById('nav-list');
        this.default_apps.forEach( app => {
            let ul = app.get_menu_button();
            li.append(ul)
        })
    }
    async routing(){
        for(let index in this.default_apps){
            await this.default_apps[index].routing();
        }
    }


}

let main_app = new MainApp();

await main_app.routing();


(function(history){
    let pushState = history.pushState;
    history.pushState = function(state) {
        pushState.apply(history, arguments);
        (async () => {
            await main_app.routing()
        })();
    };
})(window.history);
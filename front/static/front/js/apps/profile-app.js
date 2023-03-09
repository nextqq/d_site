import * as base from '../base.js';
import {BaseApp} from "../base.js";

class ProfilePage extends BaseApp {
    replace_content(element, content){
        if(element.children.length) {
            element.children[0].remove();
        }
        element.append(content);
    }
    page(data){
        let page = document.getElementById(this.template_id);
        page.querySelector('p[name="profile-username"]').innerHTML = '@' + data['user']['username'];
        let full_name = data['user']['first_name'] + ' ' + data['user']['last_name'];
        full_name = full_name.trim().length === 0 ? 'Укажите имя' : full_name;
        page.querySelector('div[name="profile-full-name"]').innerHTML =  full_name;

        let self_profile = data['user']['pk'] === user['pk'];
        if(self_profile){
            let change_button = document.createElement('p')
            change_button.innerHTML = 'Изм.';
            change_button.classList.add('default-link-color', 'pointer');
            this.replace_content(page.querySelector('div[name="profile-change-button"]'), change_button)

        }else {
            let back_button = document.createElement('p')
            back_button.innerHTML = '< Назад';
            back_button.classList.add('default-link-color', 'pointer');
            this.replace_content(page.querySelector('div[name="profile-go-back"]'), back_button);
        }

        console.log(data);
    }
}

export class ProfileApp extends ProfilePage{
    name = 'Профиль';
    icon = 'person-outline';
    template_id = 'ProfileApp';
    urlpatterns = {
        '/main/profile/me/': this.open_me
    }
    async open_me(self){
        if (self.active_link === undefined || (self.active_link !== window.location.pathname)) {
            let user = await self.get_me();
            self.page({
                'user': user
            });
        }
        self.open();
    }
    constructor() {
        super();
        let self = this;
        (async (self) => {
            await this.async_constructor();
            return self;
        })();
    }
    async get_me(){
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
    async async_constructor(){
        // this.user = await this.get_user();
    }
}
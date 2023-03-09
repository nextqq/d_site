import {BaseApp} from "../base.js";

export class HomeApp extends BaseApp{
    name = 'Главная';
    icon = 'home-outline';
    template_id = 'HomeApp'
    urlpatterns = {
        '/main/': this.home
    };

    async home(self){
        self.open();
    }

}
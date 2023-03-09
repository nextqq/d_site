import {BaseApp} from "../base.js";
import {PeopleTab} from "../modules/tabs.js";

export class CommunityApp extends BaseApp{
    name = 'Сообщество';
    icon = 'compass-outline';
    template_id = 'CommunityApp'
    tabs = [];
    urlpatterns = {
        '/main/community/': this.home
    };

    constructor() {
        super();
        this.init_tabs();
    }

    init_tabs(){
        let ul = document.getElementById('CommunityTab');
        let container = document.getElementById('CommunityTabContent');
        this.tabs.push(new PeopleTab(ul, container));

    }

    async home(self){
        self.open();
    }

}
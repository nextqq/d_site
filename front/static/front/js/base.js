export async function sendRequest(url, params, method, body) {
    let host = window.location.protocol + "//" + window.location.host
    let WebApp = window.Telegram.WebApp;
    let initDataURLSP = new URLSearchParams(WebApp.initData);
    let hash = initDataURLSP.get('hash');
    let headers = {
        'Content-Type': 'application/json;charset=utf-8',
        'Hash': hash,
        'InitData': initDataURLSP,
    }
    return await fetch(

        `${host}${url}?${params}`,
        {
            method: method,
            headers: headers,
            body: JSON.stringify(body)
        });
}

export class BaseApp {
    button_html = '' +
        '    <a type="button" class="nav__link">\n' +
        '        <ion-icon class="nav__icon" name="<%-icon%>"></ion-icon>\n' +
        '        <span class="nav__name"><%-name%></span>\n' +
        '    </a>';
    name;
    icon;
    template_id;
    urlpatterns;

    get_menu_button() {
        this.li = document.createElement('li');
        this.li.classList.add('nav__item');
        let data = {
            name:this.name,
            icon:this.icon,
        }
        this.li.innerHTML = _.template(this.button_html)(data)
        let self = this;
        this.li.addEventListener('click', e => {
            if (self.active_link){
                self.go_to(self.active_link);
            }
            else {
                console.log(self.app_first_page);
                self.go_to(self.app_first_page)
            }
        })
        return this.li
    }

    get app_first_page(){
        if (this.urlpatterns) {
            return Object.keys(this.urlpatterns)[0]
        }
    }

    async routing(){
        if (this.urlpatterns) {
            for (const [key, value] of Object.entries(this.urlpatterns)) {
                if(key === window.location.pathname) {
                    await value(this);
                }
            }
        }
    }

    go_to(path, params){
        let params_str = new URLSearchParams(params).toString();
        let baseUrl = window.location.protocol + "//" + window.location.host + path;
        let newUrl = baseUrl + '?' + params_str;
        console.log(newUrl)
        history.pushState(null, null, newUrl);
    }

    open(){
        this.active_link = window.location.pathname;
        let li = document.getElementById('nav-list').querySelector('.active');
        if (li){
            li.classList.remove('active');
        }
        this.li.classList.add('active');
        let page = document.getElementById('main').querySelector('div:not(.hide).page');
        if(page){
            page.classList.add('hide')
        }
        document.getElementById(this.template_id).classList.remove('hide');
    }

}

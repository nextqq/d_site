

export class BaseTab {
    icon = '<ion-icon class="mr-1" name="people-outline"></ion-icon>';
    label;
    id_content;
    constructor(ul_element, container_div) {
        this.ul = ul_element;
        this.container = container_div;
    }

    init_tab_li() {
        let li = document.createElement('li');
        li.classList.add('nav-item', 'mr-2');

        let button = document.createElement('button');
        button.classList.add('nav-link', 'default-bg-color', 'default-text-hint-color');
        button.innerHTML = this.icon + this.label;
        button.id = this.id_content + '-tab';
        button.setAttribute('data-bs-toggle','tab');
        button.setAttribute('data-bs-target', '#' + this.id_content);
        button.setAttribute('type','button');
        button.setAttribute('role','tab');
        button.setAttribute('aria-controls',this.id_content);

        this.shown(button);
        this.hidden(button);
        li.appendChild(button);

        this.ul.appendChild(li);
    }

    init_tab_content(){
        this.div = document.createElement('div');
        this.div.id = this.id_content;
        this.div.classList.add('tab-pane', 'fade')
        this.div.setAttribute('role', 'tabpanel')
        this.container.appendChild(this.div);

    }

    shown(button){
        let self = this;
        button.addEventListener('show.bs.tab', function (event) {
            console.log('show ', pageYOffset);
        });
    }

    hidden(button){
        let self = this;
        button.addEventListener('hide.bs.tab', function (event) {
            console.log('hide ', self.div.scrollTop);
        });
    }

}

export class PeopleTab extends BaseTab{
    html_template = '' +
        '<div class="row">' +
            '<div class="col-2 p-0">' +
            '    <ion-icon class="row-image" name="person-circle-outline"></ion-icon>' +
            '</div>' +
            '<div class="col-10 pl-0">' +
            '    <div class="row">' +
            '        <div class="col-10 default-text-color">' +
            '            Длинное Имя пользователя' +
            '        </div>\n' +
            '        <div class="col-2 text-center default-link-color">' +
            '            <ion-icon name="checkmark-done-outline"></ion-icon>' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="col-12 default-text-hint-color default-border-bottom">' +
            '        Статус или что-то ещё' +
            '    </div>' +
            '</div>' +
        '</div>';
    label = 'Люди'
    id_content = 'people1';
    constructor(ul_element, container_div) {
        super(ul_element, container_div);
        this.init_tab_li();
        this.init_tab_content();
        this.build_page();
    }

    build_page(){
        for (let i = 0; i < 100; i++){
            let div = document.createElement('div')
            div.classList.add('col-12', 'p-0', 'mt-1', 'list-row', 'pointer')
            div.innerHTML = this.html_template;
            this.div.appendChild(div);
        }
    }
}
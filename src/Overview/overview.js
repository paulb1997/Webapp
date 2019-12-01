"use strict";

import "./overview.css";
import DatabaseConnector from '../database/DatabaseConnector';

class Overview {

    constructor(app){
        this.app = app;
        this.db = new DatabaseConnector();
    }

    async onShow() {
        let adressTemplate = await this._importAdressTemplate();
        let data = this._loadData();
        let htmlToRender = this._processData(data, adressTemplate);
        return this._createContentObject(htmlToRender);
    }

    _processData(data, template){
        let container = document.createElement('div');
        data.forEach((obj) => {
            let div = template.querySelector('.adress-tempalte').cloneNode(true);
            div.innerHTML = div.innerHTML.replace('$$NAME$$', obj.name);
            div.innerHTML = div.innerHTML.replace('$$TEL$$', obj.tel);
            div.innerHTML = div.innerHTML.replace('$$MAIL$$', obj.mail);
            container.appendChild(div);
        })
        return container;
    }
    

    async _importAdressTemplate() {
        const template = await import('./adress-template.html');
        let container = document.createElement('div');
        container.innerHTML = template.trim();
        return container;
    }

    _loadData(){
        return this.db.read(this.db.defaultKey());
    }

    _createContentObject(html) {
        let content = {
            className: "overview",
            main: html.querySelectorAll('div > *')
        };
        return content;
    }

    get title() {
        return "Übersicht";
    }
}

export default Overview;

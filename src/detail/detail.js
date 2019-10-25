"use strict";

import stylesheet from "./detail.css";

class Detail {
    constructor(app, id, mode){
        this.app = app;
        this.id = id;
    }

    onShow() {
        // Anzuzeigende HTML-Elemente ermitteln
        let section = document.querySelector("#detail").cloneNode(true);

        let content = {
            className: "detail",
            main: section.querySelectorAll("main > *"),
        };

        // Ergebnis zurückliefern
        return content;
    }

    onLeave(){

    }

    get title() {
        return "Detail";
    }
}

export default Detail;

"use strict";

class Rangliste {
    constructor(liste) {
        this._liste = liste;
    }

    async showPage() {
        let template = await import("./rangliste.html");
        let div = document.createElement("div");
        div.innerHTML = template.trim();
        document.getElementById("content").appendChild(div);

//        document.getElementById("erster").innerHTML =
//        document.getElementById("zweiter").innerHTML =
//        document.getElementById("dritter").innerHTML =
//        document.getElementById("vierter").innerHTML =
//        document.getElementById("fünfter").innerHTML =
//        document.getElementById("sechster").innerHTML =
//        document.getElementById("siebter").innerHTML =
//        document.getElementById("achter").innerHTML =
//        document.getElementById("neunter").innerHTML =
//        document.getElementById("zehnter").innerHTML = 
    }
}
export default Rangliste;

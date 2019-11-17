import Dexie from "dexie/dist/dexie.js";
import stylesheet from "./startseite.css";
import overview from "./startseite.html";

let database= new Dexie("Memory");
 database.version(1).stores({
     users: "++id, user";
     rang:"++id, punkte";
 });

 database.open();

 function add_new(user){
     database.transaction('rw', database.users, function(){
         insert_object={user:user};
         database.users.add(insert_object);
     }).catch(function(err){
         console.error(err.stack || err);

     });
     }

document.querySelector("anmelden").addEventListener("click",function(e) {
    add_new(document.getElementById("name").value,document.getElementById("user").value);
});

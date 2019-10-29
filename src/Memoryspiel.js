function showUsername(){
	var name = $('#username_input').val();
	$('#username').html('Hallo '+name+ '  :)');
	$('#username_container').slideUp();

}

	var ersteKarte=0;
	var zweiteKarte=0;
	var klickZaehler=0;
	var startzeit=0;
	var allePaare=10;
	var gefundenePaare=0;

function zeitzaehler(){
	jetzt = new Date();
	$('#zeit').html(Math.round((jetzt-startzeit)/1000));
}
setInterval(zeitzaehler, 1000);

function kartenwechsel(kartennummer){
	if(startzeit==0){
		startzeit = new Date();
	}
	klickZaehler++;
	$('#klickZaehler').html('Klicks:'+ klickZaehler);
	$('#karte-'+kartennummer).html('<img src="Karte-'+kartennummer+'.jpg" alt="Motivkarte">');
	if(ersteKarte==0){
		ersteKarte=$('#karte-'+kartennummer).data('kartenpaar');
	} else{
		zweiteKarte=$('#karte-'+kartennummer).data('kartenpaar');
	if(ersteKarte==zweiteKarte){

		ersteKarte=0;
		zweiteKarte=0;
		gefundenePaare++;

	} else{
		setTimeout(karteZurueck, 500);
	}
	}
}


function karteZurueck() {
	$('*[data-kartenpaar="'+ersteKarte+'"]').html('<img src="memoryRückseite.jpg">');
	$('*[data-kartenpaar="'+zweiteKarte+'"]').html('<img src="memoryRückseite.jpg">');
	ersteKarte=0;
	zweiteKarte=0;
}

function ausblenden(){
	$(".flexibles_div1").hide();
	alert("Herzlichen Glückwunsch " +$('#username_input').val()+ ", du hast das Memory erfolgreich zu Ende gespielt :)");
}





/*function glückwunsch() {
	if (allePaare==gefundenePaare){
	alert "Herzlichen Glückwunsch!";
	}
}*/

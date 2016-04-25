function quantity(data) {

	// quantità
	var pizze 			= data.length
		totaleFarina 	= .20 * pizze,
		totaleOlio 		= .02 * pizze,
		totaleLievito	= .00175 * pizze,
		totaleAcqua		= .15 * pizze,
		flour 			= d3.select('h4#flour'),
		oil 			= d3.select('h4#oil'),
		yeast 			= d3.select('h4#yeast'),
		water 			= d3.select('h4#water'),
		f 				= d3.round

	flour.html(f(totaleFarina, 1) + "<small> kg</small>");
	yeast.html(f(totaleLievito, 2) + "<small> kg</small>");
	oil.html(f(totaleOlio, 1) + "<small> L</small>");
	water.html(f(totaleAcqua, 1) + "<small> L</small>");

	/*console.log("Farina " + totaleFarina + "Kg");
	console.log("Olio " + totaleOlio + "l");
	console.log("Lievito " + totaleLievito + "g");
	console.log("Acqua " + totaleAcqua + "l");*/
}
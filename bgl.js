
(function($){

$(document).ready(function() {
	var tocdiv = document.createElement("div");
	tocdiv.id = "toc";
	//var toccontainer = $('body')[0];
	var toccontainer = $('div.wrapper')[0];
	toccontainer.insertBefore(tocdiv, toccontainer.firstChild);
	
	// TOC
	/*
	$('#toc').toc({
	'selectors': 'h1,h2,h3', //elements to use as headings
	'container': 'div.page', //element to find all selectors in
	'smoothScrolling': false, //enable or disable smooth scrolling on click
	'prefix': 'toc', //prefix for anchor tags and class names
	'onHighlight': function(el) {}, //called when a new section is highlighted 
	'highlightOnScroll': true, //add class to heading that is currently in focus
	'highlightOffset': 100, //offset to trigger the next headline
	'anchorName': function(i, heading, prefix) { //custom function for anchor name
	return prefix+i;
	},
	'headerText': function(i, heading, $heading) { //custom function building the header-item text
	return $heading.text();
	},
	'itemClass': function(i, heading, $heading, prefix) { // custom function for item class
	return $heading[0].tagName.toLowerCase();
	}
	});*/
	//$('#toc').toc();
	$('#toc').toc({'container': 'div.page'});

	// TABLE SORT
        $(".tablesorter").tablesorter();
	
	// QUTATIONS AND CITATIONS
	// TODO: better do this by putting a link inside (or around) the quote or citation.
	$('q').click(function() {
		if ($(this).attr('cite')) {
			window.location = "#" + $(this).attr('cite');
		}
	});
	$('q').each(function() {
		var reference = document.getElementById(this.getAttribute("cite"));
		if (reference) {
			this.title = reference.textContent;
		
			var refLink = document.createElement("a");
			refLink.href = "#" + reference.id;
			while (this.childNodes.length > 0) {
				refLink.appendChild(this.childNodes[0]);
			}
			this.appendChild(refLink);
		}
	});
	$('cite').click(function() {
		if ($(this).attr('ref')) {
			window.location = "#" + $(this).attr('ref');
		}
	});
	$('cite').each(function() {
		var reference = document.getElementById(this.getAttribute("ref"));
		if (reference) {
			this.title = reference.textContent;

			var refLink = document.createElement("a");
			refLink.href = "#" + reference.id;
			while (this.childNodes.length > 0) {
				refLink.appendChild(this.childNodes[0]);
			}
			this.appendChild(refLink);
		}
	});
	
	var bibEntryNumber = 1;
	// for every reference get the referencing q and cite elements, give them an id "<reference><a-z>" and add a link "<a-z>" as child to the reference.
	$('.bibliography').children('li').each(function() { // for every reference ...
		var reference = this;
		var referenceId = this.getAttribute("id");
		// ... get the referencing q ...
		var quotes = $('q[cite='+referenceId+']');
		// ... and cite elements.
		var cites = $('cite[ref='+referenceId+']');
		
		// give them an id
		var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
		var currentLetter = 0;
		
		//for (var i = 0; i < quotes.length; i++) {
		//	alert(alphabet[currentLetter]);
		//	currentLetter++;
		//}
		//for (var i = 0; i < cites.length; i++) {
		//	alert(alphabet[currentLetter]);
		//	currentLetter++;
		//}
		
		var backRefs = document.createElement("span");
		backRefs.classList.add("backRefs");
		this.insertBefore(backRefs, this.firstChild);
		
		quotes.each(function () {
			this.id = referenceId + alphabet[currentLetter];
			
			var backRef = document.createElement("a");
			backRef.href = "#" + this.id;
			backRef.appendChild(document.createTextNode(alphabet[currentLetter]));
			backRefs.appendChild(backRef);
			backRefs.appendChild(document.createTextNode(" "));
			
			currentLetter++;
			
			this.setAttribute("data-biblabel", bibEntryNumber);
		});
		cites.each(function () {
			this.id = referenceId + alphabet[currentLetter];
			
			var backRef = document.createElement("a");
			backRef.href = "#" + this.id;
			backRef.appendChild(document.createTextNode(alphabet[currentLetter]));
			backRefs.appendChild(backRef);
			backRefs.appendChild(document.createTextNode(" "));
			
			currentLetter++;
			
			this.setAttribute("data-biblabel", bibEntryNumber);
		});
		
		this.setAttribute("data-biblabel", bibEntryNumber);
		bibEntryNumber++;
	});
	
	// CODE DOWNLOADS
	//var preElements = document.getElementsByTagName("pre");
	//for (var i = 0; i < preElements.length; i++) {
	//}
	$('pre').each(function() {
		var ce=this.getElementsByTagName("code")[0];
				
		var codecontrols = document.createElement("div");
		codecontrols.classList.add("codecontrols");
		
		var collapsetoggle = document.createElement("a");
		collapsetoggle.classList.add("collapsetoggle");
		var preElement = this;
		collapsetoggle.onclick = function() {
			if(preElement.classList.contains("collapsed")) preElement.classList.remove("collapsed"); else preElement.classList.add("collapsed"); return false;
		};
		
		var downloadfile = document.createElement("a");
		downloadfile.classList.add("downloadfile");
		downloadfile.target = "_blank";
		downloadfile.href = "data:text/plain;charset=utf-8;base64," + btoa(ce.textContent);
		var filename = this.getAttribute("data-filename");
		if (!filename)
			filename = "code";
		downloadfile.download = filename;
		//downloadfile.appendChild(document.createTextNode(filename));


		codecontrols.appendChild(collapsetoggle);
		codecontrols.appendChild(document.createTextNode(" "));
		codecontrols.appendChild(downloadfile);
		
		//this.appendChild(codecontrols);
		this.insertBefore(codecontrols, this.firstChild);
		
		//this.style.paddingTop = "1.5em";
		//var spacer = document.createElement("div");
		//spacer.classList.add("spacer");
		//this.insertBefore(spacer, this.firstChild);
		
	});
    }
);

})(jQuery);


// AndroidAdditions

function l(h, t, x_id){
	// load item
	var x_id = x_id;
	$.get(chrome.extension.getURL("content/" + h + "/"+t+".txt"), function(d, x, e){
		$("<div>").addClass("androidadditon").html(d).appendTo(".add-id-" + x_id);
	}, "text");
}

$(document).ready(function(){
	p = document.location.pathname.substr(1);
	p = p.split("/");
	if(p[0] == "reference"){
		// Reference guide
		// Remove ref
		p = jQuery.grep(p, function(k,value) {
			return value != 0;
		});

		// Get rid of .html properly
		x = p[p.length-1].split(".");
		x = jQuery.grep(x, function(value) {
			return value != "html";
		});
		p[p.length-1] = x.join(".");

		h = p.join(".");

		// Request Class Overview
		$.get(chrome.extension.getURL("content/" + h + "/class-ov.txt"), function(d){
			$("<div>").addClass("androidadditon").insertAfter(".jd-descr:first").html(d);
		}, "text");
		$("<script>").attr("async", "true").attr("src", chrome.extension.getURL("content/" + h + "/class-ov.js")).appendTo("head");

		// Get all the detail extras
		var id = 0;
		$(".jd-details").each(function(){
			t = $(".jd-details-title", this).clone();
			$("span.normal", t).remove();
			t = t.text().trim();
			$(this).addClass("add-id-" + id);
			x_id = id;
			id = id+1;

			l(h, t, x_id);
		});
	} else if(p[0] == "design"){
		// Design
		$("img").each(function(){
			l = $(this).attr("src").split("/"); l.shift();
			var img = this;
			$.get(chrome.extension.getURL("content/design/" + l.join("_") + ".txt"), function(data){
				$("<div>").addClass("androidadditon").html(data).insertAfter(img);
			});
		});
	} else if(p[0] == "guide"){
		$.get(chrome.extension.getURL("content/guides/nav.html"), function(data){
			li = $("<li>").addClass("nav-section").html(data).insertBefore(".nav-section:first");
			$("ul a", li).each(function(){
				$(this).attr("target", "_blank").attr("href", chrome.extension.getURL("guide.html") + "#" + chrome.extension.getURL("content/guides/") + $(this).attr("href")).attr("title", "This guide is not provided by Google");
			});
		});
	}
});

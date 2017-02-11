//alert("You are visiting UCLA dining menu!");

/*
action: 'fetch', 'upvote', 'downvote'
name: String
*/
function accessMenuItem(action, name) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", 'http://192.241.229.194/?'+action+'='+name, true);

	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
	  	console.log(xhr.responseText);
	  	var response = JSON.parse(xhr.responseText);
	  	return response;
	  }
	}

	xhr.send();
}




var h2 = $("#page-header").text();
alert(h2);





$(".menu-item").each(function(index) {
	let str = $(this).children("span.tooltip-target-wrapper").children("a.recipelink").text();
	
	if (! $(this).children(".item-description-wrapper").children(".item-description").length) {
		$(this).children(".item-description-wrapper").append("<div class=\"item-description\"></div>");
	}
	$(this).children(".item-description-wrapper").children(".item-description").append("<div class=\"tt-prodwebcode\"><img alt=\"AEGG\" class=\"webcode\" src=\"\/Content\/Images\/WebCodes\/16px\/aegg.png\" />&nbsp;" + str + " is great!!! I love it!</div>");
	
	
	
	//BUTTON
	
	if (! $(this).children("span.tooltip-target-wrapper")).append("<img alt="V" class=\"webcode\" src=\"/Content/Images/WebCodes/16px/v.png\" />")
);
	
});



alert("updated?2");
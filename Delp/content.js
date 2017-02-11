
//alert("You are visiting UCLA dining menu!");

/*
action: 'fetch', 'upvote', 'downvote'
name: String
*/
function accessMenuItem(action, name) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", 'http://192.241.229.194/?'+action+'='+name, true);

	xhr.send();
	
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
	  	console.log(xhr.responseText);
	  	var response = JSON.parse(xhr.responseText);
	  	return response;
	  }
	}
}


function upvote(str, el) {
	accessMenuItem("upVote", str);
	
}

function downvote(str, el) {
	accessMenuItem("downVote", str)
}

function fetchvote(str) {
}

var Utils = {
	getUpvoteOnClickString: function(str, el, cls) {
		if (cls === undefined) {
			cls = "webcode";
		}
		
		var input_text = `
		<input type="image" 
		alt="upvote" 
		class="${cls}" 
		src="/Content/Images/WebCodes/16px/v.png" />`;
		
		var $input = $.parseHTML(input_text)[1];
		
		$input.addEventListener("click", function() {
			upvote(str, el);
		});
		
		return $input;
	},
	getDownvoteOnClickString: function(str, el, cls) {
		if (cls === undefined) {
			cls = "webcode";
		}
		
		var input_text = `
		<input type="image" 
		alt="upvote" 
		class="${cls}" 
		src="/Content/Images/WebCodes/16px/v.png" />`;
		
		var $input = $.parseHTML(input_text)[1];
		
		$input.addEventListener("click", function() {
			downvote(str, el);
		});
		return $input;
	},
	getUpvoteCount: function(str) {
		console.log(accessMenuItem("fetch", str));
		return String(accessMenuItem("fetch", str)["upVotes"]);
	},
	getDownvoteCount: function(str) {
		return String(accessMenuItem("fetch", str)["downVotes"]);
	}
}

$(".menu-item").each(function(index) {
	let str = $(this).children("span.tooltip-target-wrapper").children("a.recipelink").text();
	str = str.replace(/^\s+|\s+$/, "");
	
	let itemDescElement = $(this).children(".item-description-wrapper").children(".item-description");
	
	let upvoteCountElement,	downvoteCountElement;
	
	if (! itemDescElement.length) {
		$(this).children(".item-description-wrapper").append("<div class=\"item-description\"></div>");
		itemDescElement = $(this).children(".item-description-wrapper").children(".item-description");
	}
	
	
	$(this).children(".item-description-wrapper").children(".item-description").append("<div class=\"tt-prodwebcode\"><img alt=\"AEGG\" class=\"webcode\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA4UlEQVQ4T8WTsQ3CMBBF/8UMABtADYJEMn3YhBG8AWSCmBHYgA2gT5EQQKIMG0CLTA45UhoU4SgUuLPO7+nu60z48ZCL91PVfxmsRA9RFuj75/uvAguXBnsQ+QA2uYxVa8EHbLn2ggYYJfPiPNcHZwdNMIBHLuN+U15UhcQ0s0VBfDQGvke0d4ULcOEJBDRJVFgDtk0LthOgGuuvglsu42H3DpijfK7XnQWe4IHdzE4CBrYnGS9t4J0ET8Gja6CLSjBOle8Z0vZS9lhdAp1NE7VmUNi4C8T6JPWurjl/o2uh3jLOhd5dQweIAAAAAElFTkSuQmCC\" width=\"16\" height=\"16\" />&nbsp;" + Utils.getUpvoteCount(str) + " people enjoy this dish!</div>");
	upvoteCountElement = $(this).children(".item-description-wrapper").children(".item-description").children().last();
	
	//console.log(upvoteCountElement);
	
	$(this).children(".item-description-wrapper").children(".item-description").append("<div class=\"tt-prodwebcode\"><img alt=\"AEGG\" class=\"webcode\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA3UlEQVQ4T2NkoBAwUqifAWzAcx+bAwwMDPYMDAyODH/+PGBgZt7PwMiogG74fwaGD8yMfxPFNx/fAJPDNAAisx+ny/7/fyC59agi+QZAdDpKbjkCcjUWLxByAUT+gOSWI46UGMDA8OePouSOEw9IDwOo5/8z/JsoteVYAfkG/P+/UWrr0QDyDPjP8JGJ6W8CKDoxEtL7AAOB73+4DzAyMOrDogrmXGxRizUlYhiCFvfIBuFMyuiGMP/7Zyi27dgFdFfgzQsohkCjjSQDQIpBhvz4w2MAS3kkG0AotwIAH9JsEVioprIAAAAASUVORK5CYII=\" width=\"16\" height=\"16\" />&nbsp;" + Utils.getDownvoteCount(str) + " dislike this dish...</div>");
	downvoteCountElement = $(this).children(".item-description-wrapper").children(".item-description").children().last();
	
	
	
	//BUTTON
	$(this).children("span.tooltip-target-wrapper").append(Utils.getUpvoteOnClickString(str));
	$(this).children("span.tooltip-target-wrapper").append(Utils.getDownvoteOnClickString(str));
	
});

//alert("updated?2");
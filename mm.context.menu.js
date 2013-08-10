function useMM(info, tab) {
	//chrome.tabs.sendMessage(tab.id, { what: "getClickedElement" }, function(response) { alert(response.value);} );
	alert(JSON.stringify(info));
	if(info.checked){
		//alert('bind');
		chrome.tabs.executeScript(null, {code: '$("textarea, input:text, search").mmkb().addClass("__mm");'})
	}else{
		//alert('unbind');
		chrome.tabs.executeScript(null, {code: '$("textarea, input:text, search").unbindMmkb().removeClass("__mm");'})
	}
}

function createContextMenu(){
	try{
	  var rmm = chrome.contextMenus.create({"id": "rmm", "title": "Use Myanmar keyboard", "type": "checkbox", "contexts": ["editable"], "checked": false, "onclick": useMM});
	  //var rdf = chrome.contextMenus.create({"id": "rdf", "title": "Use default keyboard", "type": "radio", "contexts": ["editable"], "checked": false, "onclick": genericOnClick});
	}catch(ex){
		alert(ex);
	}
}

function getElement(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {what: "getClickedElement"}, function(response) {
	    //alert(response.value);
	  });
	});
}


(function(){
	createContextMenu();
	//alert('loaded');
})();


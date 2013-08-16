function useMM(info, tab) {
	//chrome.tabs.sendMessage(tab.id, { what: "getClickedElement" }, function(response) { alert(response.value);} );
	if(info.checked){
		chrome.tabs.executeScript(null, {code: '$("textarea, input:text, search").mmkb().addClass("__mm");'})
	}else{
		chrome.tabs.executeScript(null, {code: '$("textarea, input:text, search").unbindMmkb().removeClass("__mm");'})
	}
}

function createContextMenu(){
	try{
		var rmm = chrome.contextMenus.create({"id": "rmm", "title": "Use Myanmar keyboard", "type": "checkbox", "contexts": ["editable"], "checked": false, "onclick": useMM});
		//var rdf = chrome.contextMenus.create({"id": "rdf", "title": "Use default keyboard", "type": "radio", "contexts": ["editable"], "checked": false, "onclick": genericOnClick});
	}catch(ex){
		console.log(ex);
	}
}

function getElement(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {what: "getClickedElement"}, function(response) {
		});
	});
}


(function(){
	createContextMenu();
})();


function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

function createContextMenuItem(){
  var rmm = chrome.contextMenus.create({"id": 1, "title": "Use Myanmar keyboard", "type": "radio", "contexts":"editable", "checked ", false, "onclick": genericOnClick});}
  var rdf = chrome.contextMenus.create({"id": 2, "title": "Use default keyboard", "type": "radio", "contexts":"editable", "checked ", false, "onclick": genericOnClick});}
}
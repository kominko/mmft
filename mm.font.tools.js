/*
Original authors are
Font Busters - http://userscripts.org/scripts/show/42941 (mm font detection)
MM Font Tagger : http://userscripts.org/scripts/review/103745 (modified code particualarly the use of MutationObserver)
*/

function loadJquery(){
    if(jQuery == 'undefined') {
        chrome.tabs.executeScript(null, {file: 'jquery.min.js'})
    }
}

function addHandles() {
    chrome.runtime.onMessage.addListener(function(request, sender, callBack) {
        if (request.what == "getClickedElement") {
            callBack({value: 'hi' });
        }
    });
}

function injectCss(){
    var path = chrome.extension.getURL('mm.css');
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = path;
    document.head.appendChild(link);
}

(function() {
    addHandles();
    injectCss();
    var list = document.querySelector('body');
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    var node = mutation.addedNodes[i];
                    if (node.nodeType === Node.TEXT_NODE) {} else {
                        tagNode(node);
                    }
                }
            } else if (mutation.type === 'characterData') {
                tagNode(mutation.target);
            }
        });
    });
    
    observer.observe(list, {
        childList: true,
        attributes: false,
        characterData: true,
        subtree: true
    });
    
    var regexMM = new RegExp("[\u1000-\u109f\uaa60-\uaa7f]+");
    var regexUni = new RegExp("[ဃငဆဇဈဉညဋဌဍဎဏဒဓနဘရဝဟဠအ]်|ျ[က-အ]ါ|ျ[ါ-း]|[^\1031]စ်|\u103e|\u103f|\u1031[^\u1000-\u1021\u103b\u1040\u106a\u106b\u107e-\u1084\u108f\u1090]|\u1031$|\u1031[က-အ]\u1032|\u1025\u102f|\u103c\u103d[\u1000-\u1001]|ည်း|ျင်း|င်|န်း|ျာ|[ာ်ါ]တ်|ြို");
    var regexZG = new RegExp("\s\u1031| ေ[က-အ]်|[က-အ]း");
    var cUnicode = "__mm";
    var cZawgyi = "__zg";
    
    var tagNode = function(node) {
        if (node.className && node.className.indexOf && (node.className.indexOf(cUnicode) !== -1 || node.className.indexOf(cZawgyi) !== -1)) {
            return;
        }
        if (node.nodeType == Node.TEXT_NODE) {
            var text = node.textContent;
            if (!regexMM.test(text)) {
                return;
            }
            if (text) {
                var prNode = node.parentNode;
                text = prNode.textContent;
                if (regexUni.test(text) && !regexZG.test(text)) {
                    prNode.className += ' ' + cUnicode;
                } else {
                    prNode.className += ' ' + cZawgyi;
                }
            }
        } else {
            for (var i = 0; i < node.childNodes.length; i++) {
                var child = node.childNodes[i];
                tagNode(child);
            }
        }
    }
    if (document && document.body) tagNode(document.body);
})();
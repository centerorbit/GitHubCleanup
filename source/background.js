
var updateBadge = function( items ){
    chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 255, 255] });
    chrome.browserAction.setBadgeText( {text: String(items.cleaned)} );
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        if(request.msg == "updateBadge") {
            updateBadge( request.data );
        }
    }
);
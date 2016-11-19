
var runCleanup = function(){
    cleaned = 0;

    [].forEach.call(
        document.getElementsByClassName("comment-body"),
        function(element){
            toInspect = element.innerText;
            if( toInspect.indexOf("+1") != -1 
            ||  toInspect.indexOf("👍") != -1
            ||  toInspect.toLowerCase().indexOf("me to") != -1
            ||  toInspect.toLowerCase().indexOf("thank") != -1 
            ) {
                words = toInspect.split(' ').length;
                if (words < 7){
                    child = element.parentElement.parentElement.parentElement;
                    child.parentElement.removeChild(child);
                    cleaned++;
                }
            }
        }
    );
    
    return cleaned;
}

var saveAndDone = function( totalCleaned ){
    console.log("Cleaned up "+totalCleaned+" comments.");

    chrome.storage.sync.get(["key"], function(items){
        items = items.key;

        if( items == undefined || items.cleaned == undefined || items.cleaned){
            items = {cleaned : 0};
        }

        items.cleaned += totalCleaned;

        chrome.storage.sync.set({ "key": items }, function(){ 
            //Send a message to update the badge (look in background.js now)
            chrome.runtime.sendMessage({ msg: "updateBadge", data: items });
        });
    });
}



var timeout = 100;
var instanceCleanCount = 0;

var cleanupLoop = function(){
    cleaned = runCleanup( );
    instanceCleanCount += cleaned;

    if( cleaned > 0 ){
        timeout = timeout * 2;
        setTimeout(function(){cleanupLoop();}, timeout);
    }
    else {
        saveAndDone( instanceCleanCount );
    }
}
cleanupLoop( );
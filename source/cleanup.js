
cleanedNow = 0;

do {
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
    console.log("Cleaned up "+cleaned+" comments.");
    cleanedNow += cleaned;
    
} while ( cleaned > 0 );


chrome.storage.sync.get(["key"], function(items){
    items = items.key;
    console.log(JSON.stringify(items));

    if( items.cleaned == null ){
        //console.log("cleaned was null, initializing");
        items.cleaned = 0;
    }

    items.cleaned += cleanedNow;

    chrome.storage.sync.set({ "key": items }, function(){ 
        //Send a message to update the badge (look in background.js now)
        chrome.runtime.sendMessage({ msg: "updateBadge", data: items });
    });
});

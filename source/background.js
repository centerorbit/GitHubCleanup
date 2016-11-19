

// http://stackoverflow.com/questions/2692323/code-golf-friendly-number-abbreviator
var numberAbbreviator = function (n,d){

    //Don't shortten sub-1k numbers
    if( n < 1000 ){
        return String(n);
    }

    //Forget shorttening crazy large numbers
    if( n >= 1000000000000000000000 ){
        return "Wow"
    }

    x=(''+n).length,p=Math.pow,d=p(10,d)
    x-=x%3
    return String(Math.round(n*d/p(10,x))/d+" kMBTPE"[x/3])
}

var updateBadge = function( items ){

    var abbrv = numberAbbreviator(items.cleaned, 1);

    chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 255, 255] });
    chrome.browserAction.setBadgeText( {text: abbrv} );
}


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        if(request.msg == "updateBadge") {
            updateBadge( request.data );
        }
    }
);
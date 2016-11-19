
do {
    cleaned = 0;
    [].forEach.call(
        document.getElementsByClassName("comment-body"),
        function(element){
            toInspect = element.innerText;
            if( toInspect.indexOf("+1") != -1 
            ||  toInspect.indexOf("👍") != -1
            ||  toInspect.toLowerCase().indexOf("thanks") != -1 
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
} while ( cleaned > 0 );

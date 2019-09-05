function br2nl(str) {
    return str.replace(/<br\s*\/?>/mg,"\n");
}

function div2nl(str) {
    return str.replace(/<div\s*\/?>/mg,"\n");
}

function strip(html) {
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}


var timer;

document.getElementById("code-content").addEventListener('keyup', e => {


    timer = Math.floor(Date.now() / 1000); // takes the time right now

});

setInterval(function(){
    //test if the time have gon forward around 0.1 sec then color
    if(Math.floor(Date.now() / 1000) - timer >= 0.1 && Math.floor(Date.now() / 1000) - timer <= 1) {
        color();
    }
},1000);

//ferglägger diven
function color() {
    var content = document.getElementById("code-content");
    var text = content.innerHTML;
    text = div2nl(text);
    text = strip(text);

    console.log(text);

    text.replace(/\n/g,"(A)");

    console.log(text);

    var toks = text.split(' ');

    console.log(toks);


    var carPos = getCaretCharacterOffsetWithin(content);

    text = '';

    toks.forEach(e => {
        switch(e) {
            case "var":
            case "print":
                text += "<span style='color: red'>" + e + "</span> ";
                break;
            case "=":
                text += "<span style='color: green'>" + e + "</span> ";
                break;
            case "(N)":
                text += "\n";
                break;
            default:
                text += e + " ";
                break;
        }
    });

    content.innerHTML = text.replace(/&nbsp/g, ' ').substr(0, text.length-1);

    setCurrentCursorPosition(content, carPos);

}


//hämtar musens position i diven / sätter dit musens position
function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
        var range = win.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
        }
    } else if ((sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}





function setCurrentCursorPosition(content, chars) {
    if (chars >= 0) {
        var selection = window.getSelection();

        range = createRange(content, { count: chars });

        if (range) {
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
};



function createRange(node, chars, range) {
    if (!range) {
        range = document.createRange()
        range.selectNode(node);
        range.setStart(node, 0);
    }

    if (chars.count === 0) {
        range.setEnd(node, chars.count);
    } else if (node && chars.count >0) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.length < chars.count) {
                chars.count -= node.textContent.length;
            } else {
                range.setEnd(node, chars.count);
                chars.count = 0;
            }
        } else {
           for (var lp = 0; lp < node.childNodes.length; lp++) {
                range = createRange(node.childNodes[lp], chars, range);

                if (chars.count === 0) {
                    break;
                }
            }
        }
    } 

    return range;
};
  
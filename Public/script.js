String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

//write and collect info from html front 

function Enter(obj) {
    if(document.getElementById('controlpanel').value != "") {  
        console.log("test");
        document.getElementById('controlpanel').value = "";
    } else {
        addAndComputText(document.getElementById('input'), '# ');
    }
}

function addAndComputText(obj, sender) {
    var WEIV_PORT = document.getElementById("VIEW-port");

    var tag_null = document.getElementById("bass-tag-null");

    var tag = document.createElement("p");
    tag.innerHTML = sender + obj.value;

    WEIV_PORT.removeChild(tag_null);
    WEIV_PORT.appendChild(tag);
    WEIV_PORT.appendChild(tag_null);

    var l = lexer(obj.value);

    console.table(l);

    parser.run(l);


    obj.value = "";

}

function addText(text) {
    var WEIV_PORT = document.getElementById("VIEW-port");

    var tag_null = document.getElementById("bass-tag-null");

    var tag = document.createElement("p");
    tag.innerHTML = text;

    WEIV_PORT.removeChild(tag_null);
    WEIV_PORT.appendChild(tag);
    WEIV_PORT.appendChild(tag_null);

    WEIV_PORT.scrollTop = WEIV_PORT.scrollHeight;
}

function clear() {
    var WEIV_PORT = document.getElementById("VIEW-port");

    var tag_null = document.getElementById("bass-tag-null");

    WEIV_PORT.innerHTML = "";

    WEIV_PORT.appendChild(tag_null);
}

var f = true;

document.getElementById('controlpanel').onfocus = (e) => { f = false; }

document.getElementById('controlpanel').onblur = (e) => { f = true; document.getElementById('input').focus(); }

document.getElementById('input').onblur = function (event) { 
    var blurEl = this; 
    setTimeout(function() {
        if(f) blurEl.focus()
    }, 10);
};



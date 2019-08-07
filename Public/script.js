function Enter(obj) {
    addText(obj.value, '# ');
}




function addText(text, sender) {
    var WEIV_PORT = document.getElementById("VIEW-port");

    var tag_null = document.getElementById("bass-tag-null");

    var tag = document.createElement("p");
    tag.innerHTML = sender + text;

    WEIV_PORT.removeChild(tag_null);
    WEIV_PORT.appendChild(tag);
    WEIV_PORT.appendChild(tag_null);

}




document.getElementById('input').onblur = function (event) { 
    var blurEl = this; 
    setTimeout(function() {
        blurEl.focus()
    }, 10);
};
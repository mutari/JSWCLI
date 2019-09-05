function lexer(string) {

    var tokens = [];

    string += " ";

    var data = string.split('');

    var tok = "";

    var T = data.length*10;

    var string = false;
    var str = '';

    laxerLoop:
        for(var i = 0; i < data.length; i++) {
            T--;
            tok += data[i];
            //console.log(tok);

            if(tok === "\'") {
                if(string) {
                    string = false;
                    tokens.push({type: 'str', id: str});
                    str = "";
                    tok = "";
                } else {
                    string = true;
                    tok = "";
                }
            }
            else if(tok === '-') {
                tokens.push({type: 'param', id: data[i+1]});
                i++;
                tok = "";
            } 
            else if(string) {
                str += tok;
                tok = "";
            }
            else if(tok === "+" || tok === "-" || tok === "*" || tok === "/") {
                tokens.push({type: 'op', id: tok});
                tok = "";
            }
            else if(tok === " " || data[i] === " " || i == data.length || data[i] === ";") {
                if(tok != " " && tok != ";") {
                    var part = tok.split('');

                    
                    //test if number
                    if(part[0] === '9' || part[0] === '8' || part[0] === '7' || part[0] === '6' || part[0] === '5' || part[0] === '4' || part[0] === '3' || part[0] === '2' || part[0] === '1' || part[0] === '0') {
                        for(var j = 1; j < part.length-2; j++) {
                            if(part[j] === '9' || part[j] === '8' || part[j] === '7' || part[j] === '6' || part[j] === '5' || part[j] === '4' || part[j] === '3' || part[j] === '2' || part[j] === '1' || part[j] === '0') {

                            } else {
                                continue laxerLoop;
                            } 
                        }
                        tokens.push({type: 'num', id: tok.substr(0, tok.length-1)});
                        i--;
                        tok = "";
                    } else {
                        tokens.push({type: 'id', id: tok.substr(0, tok.length-1)});
                        i--;
                        tok = "";
                    }
                    
                } else {
                    tok = "";
                }
            }
            else if(tok === ";") {
                tokens.push({type: 'static', id: 'ENDL'});
                tok = "";
            }
            else if(tok === "=") {
                tokens.push({type: 'static', id: 'EQUAL'});
                tok = "";
            }
            else if(tok === "var") {
                tokens.push({type: 'static', id: 'VAR'});
                tok = "";
            }
            else if(tok === "print") {
                tokens.push({type: 'static', id: 'PRINT'});
                tok = "";
            }
            else if(tok === "editor") {
                tokens.push({type: 'static', id: 'EDITOR'});
                tok = "";
            } 
            else if(tok === "ls") {
                tokens.push({type: 'static', id: 'LS'});
                tok = "";
            }
            else if(tok === "cd") {
                tokens.push({type: 'static', id: 'CD'});
                tok = "";
            }
            else if(tok === "cat") {
                tokens.push({type: 'static', id: 'CAT'});
                tok = "";
            }
            else if(tok === "create") {
                tokens.push({type: 'static', id: 'CREATE'});
                tok = "";
            }
            else if(tok === "clear") {
                tokens.push({type: 'static', id: 'CLEAR'});
                tok = "";
            }
            else if(tok === "push") {
                tokens.push({type: 'static', id: 'PUSH'});
                tok = "";
            }
            else if(tok === "compile") {
                tokens.push({type: 'static', id: 'COMPILE'});
                tok = "";
            }
            else if(tok === "run") {
                tokens.push({type: 'static', id: 'RUN'});
                tok = "";
            }

            if(T <= 0) {
                console.log("time out");
                console.log(tok);
                return;
            }
 
        }
    
    return tokens;

}
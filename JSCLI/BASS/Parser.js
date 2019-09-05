// static is the furst key word
// R can be allot of difrent things
// you can have static params but then you need to spesic white for an exempel a if statment and test the static input


//params:
//i == input,
//s == static (neads a function to compute)
//p == param input (for exempel -f)

var parser = { 
    version: '2.0.0',
    run: (tokens) => {
        var T = tokens.length*10;

        var i = 0;
        while(i < tokens.length) {
            T--;
            
            for(var j = 0; j < parser.keywords.length; j++) {
                if(parser.keywords[j].static == tokens[i].id) {
                    parser.keywords[j].onRun(tokens.slice(i+1, i+1 + parser.keywords[j].params.length));
                    i += parser.keywords[j].params.length + 1;
                    break;
                }
            }

            if(T <= 0) {
                console.log("time out: ");
                console.table(tokens);
                return;
            }
        }   

    },




    keywords: [
        {
            static: 'VAR', //key word
            params: [{t: 'i', type: 'id'}, {t: 's', type: 'EQUAL'}, {t: 's', type: 'R'}], //parametrar
            onRun: (params) => { // add var
                variablar.vars.push({id: params[0].id, value: params[2].id});
            }
        },
        {
            static: 'PRINT',
            params: [{t: 's', type: 'R'}],
            onRun: (params) => {
                if(params[0].type === "id") {
                    addText(variablar.getVar(params[0].id).value);
                } else {
                    addText(params[0].id);
                }
            }
        }, 
        {
            static: 'EDITOR',
            params: [],
            onRun: (params) => {
                document.getElementById("CLI-port").classList.add("hide");
                document.getElementById("EDITOR-port").classList.remove("hide");
            }
        },
        {
            static: 'LS',
            params: [],
            onRun: (params) => {
                var folder = FILESYS.getThisFolder().data; 
                var output = "";

                for(var j = 0; j < folder.folder.length; j++) {
                    if(folder.folder[j].type === "file") {
                        output += folder.folder[j].name + "." + folder.folder[j].fileEnd + "\t";
                    } else if(folder.folder[j].type === "folder") {
                        output += folder.folder[j].name + "\t";
                    }
                }
                
                addText(output);
            }
        },
        {
            static: 'CD',
            params: [{t: 's', type: 'R'}],
            onRun: (params) => {
                if(params[0].type === 'id') {
                    if(params[0].id === '..') {
                        var folder = FILESYS.getThisFolder();

                        if(folder.past != 0) {
                            FILESYS.openFile = folder.past;
                        }

                    } else {
                        var folder = FILESYS.getThisFolder().data;

                        var newfile = params[0].id;
                        
                        for(var j = 0; j < folder.folder.length; j++) {
                            if(folder.folder[j].type === 'folder') {
                                if(folder.folder[j].name === newfile) {
                                    FILESYS.openFile = folder.folder[j].folderID;
                                    return;
                                }
                            }
                        }

                        addText("The file '" + newfile + "' do not exist");

                    }

                }
            }
        },
        {
            static: 'CAT',
            params: [{t: 's', type: 'R'}],
            onRun: (params) => {
                if(params[0].type === "str") {
                    var folder = FILESYS.getThisFolder().data;

                    var file = params[0].id;

                    for(var j = 0; j < folder.folder.length; j++) {
                        if(folder.folder[j].type === "file" && folder.folder[j].name + "." + folder.folder[j].fileEnd === file) {
                            addText(folder.folder[j].content);
                        }
                    }

                }
            }
        },
        {
            static: 'CREATE',
            params: [{t: 'p', type: 'static'}, {t: 's', type: 'R'}],
            onRun: (params) => {
                if(params[0].id === 'f') {
                    if(params[1].type === "str") {
                        var folder = FILESYS.getThisFolder().data;
    
                        folder.folder.push({
                            type: 'file',
                            name: params[1].id.split('.')[0],
                            fileEnd: params[1].id.split('.')[1],
                            content: "",
                            date: Date.now()
                        });
                    }
                }
            }
        },
        {
            static: 'PUSH',                    //file name          //text to push
            params: [{t: 'p', type: 'static'}, {t: 's', type: 'R'}, {t: 's', type: 'R'}],
            onRun: (params) => {
                if(params[0].id === 'f') { //push text to a text file
                    if(params[1].type === "str" && params[2].type === "str") {
                        var folder = FILESYS.getThisFolder().data;

                        var file = FILESYS.findFIle(params[1].id.split('.')[0], params[1].id.split('.')[1], folder.folder);

                        if(file != -1) {
                            file.content += params[2].id;
                        }

                    }
                }
            }
        },
        {
            static: 'COMPILE',
            params: [{t: 'p', type: 'static'}, {t: 's', type: 'R'}],
            onRun: (params) => {
                if(params[0].id === 'f') {
                    if(params[1].type === 'str') {
                        var filename = params[1].id;

                        var folder = FILESYS.getThisFolder().data;

                        var file = FILESYS.findFIle(filename.split('.')[0], filename.split('.')[1], folder.folder);

                        if(file != -1) {
                            var tokens = lexer(file.content);
                            
                            var string = JSON.stringify(tokens);

                            
                            var checkFile = FILESYS.findFIle(filename.split('.')[0], 'r', folder.folder);

                            if(checkFile == -1) {
                                folder.folder.push({
                                    type: 'file',
                                    name: filename.split('.')[0],
                                    fileEnd: 'r',
                                    content: string,
                                    date: Date.now()
                                });
                            } else 
                                checkFile.content = string;

                            return;
                        }

                        addText(`The file ${filename} do not exist`);

                    }
                }
            }
        },
        {
            static: 'RUN',
            params: [{t: 'p', type: 'static'}, {t: 's', type: 'R'}],
            onRun: (params) => {
                if(params[0].id === 'b') {
                    if(params[1].id.split('.')[1] === 'r') {
                        var folder = FILESYS.getThisFolder().data;

                        var file = FILESYS.findFIle(params[1].id.split('.')[0], 'r', folder.folder);

                        if(file != -1) {
                            var content = file.content;

                            var tokens = JSON.parse(content);

                            console.table(tokens);

                            parser.run(tokens);

                            return;
                        } else {
                            addText("this file do not exist");
                        } 

                    } else {    
                        addText("wrong file ending");
                    }
                }
            }
        },
        {
            static: 'CLEAR',
            params: [],
            onRun: (params) => {
                clear();
            }
        },
        {
            static: '',
            params: [],
            onRun: (params) => {

            }
        }
    ]
}
function parser(tokens) {

    var T = tokens.length*10;

    var i = 0;
    while(i < tokens.length) {
        T--;
        //static tokens
        if(tokens[i].type === "static") {

            if(tokens[i].id === "VAR" && tokens[i+1].type === "id") {

                vars.push({id: tokens[i+1].id, value: tokens[i+3].id});
                i += 4;

            }
            else if(tokens[i].id === "PRINT") {

                if(tokens[i+1].type == "id") {
                    addText(getVar(tokens[i+1].id).value);
                    i += 2;
                } else {
                    addText(tokens[i+1].id);
                    i += 2;
                }

            }
            else if(tokens[i].id === 'EDITOR') {

                document.getElementById("CLI-port").classList.add("hide");
                document.getElementById("EDITOR-port").classList.remove("hide");
                i += 1;

            }

            
            //CLI bass commandon -endast compatibla i terminalen (här ingår filer som du kör i terminalen)
            else if(tokens[i].id === 'LS') {
                var folder = FILESYS.getThisFolder().data; 
                var output = "";

                console.table(folder);

                for(var j = 0; j < folder.folder.length; j++) {
                    if(folder.folder[j].type === "file") {
                        output += folder.folder[j].name + "." + folder.folder[j].fileEnd + "\t";
                    } else if(folder.folder[j].type === "folder") {
                        output += folder.folder[j].name + "\t";
                    }
                }
                
                addText(output);

                i += 1;
            }

            else if(tokens[i].id === 'CD') {

                if(tokens[i+1].type === 'id') {
                    if(tokens[i+1].id === '..') {
                        var folder = FILESYS.getThisFolder();

                        if(folder.past != 0) {
                            FILESYS.openFile = folder.past;
                        }

                        i += 2;
                    } else {
                        var folder = FILESYS.getThisFolder().data;

                        var newfile = tokens[i+1].id;
                        
                        for(var j = 0; j < folder.folder.length; j++) {
                            if(folder.folder[j].type === 'folder') {
                                if(folder.folder[j].name === newfile) {
                                    FILESYS.openFile = folder.folder[j].folderID;
                                    i += 2;
                                }
                            }
                        }
                    }

                }

            }

            else if(tokens[i].id === "CAT") {

                if(tokens[i+1].type === "str") {
                    var folder = FILESYS.getThisFolder().data;

                    var file = tokens[i+1].id;

                    for(var j = 0; j < folder.folder.length; j++) {
                        if(folder.folder[j].type === "file" && folder.folder[j].name + "." + folder.folder[j].fileEnd === file) {
                            addText(folder.folder[j].content);
                        }
                    }

                    i += 2;

                }

            }

            else if(tokens[i].id === 'CFILE') {
                
                if(tokens[i+1].type === "str") {
                    var folder = FILESYS.getThisFolder().data;

                    folder.folder.push({
                        type: 'file',
                        name: tokens[i+1].id.split('.')[0],
                        fileEnd: tokens[i+1].id.split('.')[1],
                        content: "",
                        date: Date.now()
                    });

                    i += 2;
                }

            }

        } 

        //its a variabel
        else if(tokens[i].type === "id") {
            
        }

        if(T <= 0) {
            console.log("time out: ");
            console.table(tokens);
            return;
        }


    }

}
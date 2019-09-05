//basic file sys


/*

syntaks of a file
{
    type: 'folder'
    name: -namnet
    folderID: -ett unikt nummer för varje folder
    files: -en array av filer/folder
}


syntaks för text filer
{
    type: 'file'
    name: -namnet
    fileEnd: -fil extendsen
    content: -filens innehåll
    date: -datum filen skapades
}



*/

var FILESYS = {
    folder: [
        {
            type: 'folder',
            name: 'root',
            folderID: 1,
            folder: [
                {
                    type: 'file',
                    name: 'test',
                    fileEnd: 'bas',
                    content: 'var x = 10; print x',
                    date: Date.now()
                },
                {
                    type: 'folder',
                    name: 'temp',
                    folderID: 2,
                    folder: [

                    ]
                },
                {
                    type: 'folder',
                    name: 'user',
                    folderID: 3,
                    folder: [
                        {
                            type: 'folder',
                            name: 'documents',
                            folderID: 4,
                            folder: [
                                {
                                    type: 'file',
                                    name: 'text',
                                    fileEnd: 'txt',
                                    content: 'Hello world!! \nWhats upp?',
                                    date: Date.now()
                                }
                            ]
                        },

                    ]
                }
            ]
        }
    ],
    openFile: 1,
    getThisFolder: () => {
        var temp;
        for(var i = 0; i < FILESYS.folder.length; i++) {
            if(FILESYS.folder[i].type === 'folder') {
                if(FILESYS.folder[i].folderID == FILESYS.openFile) {
                    return {data: FILESYS.folder[i], past: 0};
                } else {
                    temp = FILESYS.find(FILESYS.openFile, FILESYS.folder[i].folder, FILESYS.folder[i].folderID);
                    if(temp != -1) {
                        return temp;
                    }
                }
            }
        }
        return -1;
    },
    findFIle: (name, fileEnd, arr) => { //name = namnet på filen, fileEnd == till exmepel .txt, arr == fill arrayen som jag ska söka i
        for(var i = 0; i < arr.length; i++) {
            if(arr[i].name === name && arr[i].fileEnd === fileEnd) return arr[i];
        }
        return -1;
    },
    find: (id, arr, past) => {
        for(var i = 0; i < arr.length; i++) {
            if(arr[i].type === 'folder') {
                if(arr[i].folderID == id) {
                    return {data: arr[i], past: past};
                } else {
                    temp = FILESYS.find(FILESYS.openFile, arr[i].folder, arr[i].folderID);
                    if(temp != -1) {
                        return temp;
                    }
                }
            }
        }
        return -1;
    },
    getFolderData: () => JSON.stringify(FILESYS.folder),
    setFolderData: data => FILESYS.folder = JSON.parse(data)
}
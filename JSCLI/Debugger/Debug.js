//debuging help
var debug = {
    getContentOfFile: (name, id) => { //name == name of file, id == id of folder that file is in
        return FILESYS.find(id, FILESYS.folder[0].folder, 0).data.folder.map(e => {
            if(e.name === name) {
                return name;
            }
        })[0];
    }
};
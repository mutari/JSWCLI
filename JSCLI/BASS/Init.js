var variablar = {
    vars: [],
    getVar: (name) => {
        for(var j = 0; j < variablar.vars.length; j++) {
            if(variablar.vars[j].id === name) {
                return variablar.vars[j];
            }
        }
    },
    newVar: (name, value) => {
        variablar.vars.push({id: name, value: value});
    }
}
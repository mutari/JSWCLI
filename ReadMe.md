# JS-CLI

This is the JavaScript version of WCLI and while work exlusevli for the webb
This wersion while include a BASS weriant writen in JS and it suports nativ JS 

The JS-CLI while run on NodeJS and BASS while exekute in serverside to allow easer hardwher axes

When you send a file you shuld allways use '' around the file name exemapel: **'text.txt'**
When you are working white folders you dont need to use ''

BASS basics
* var - is used to create a variabel exampel: **'var {name} = 12'**
* print - is used to print somthing to the console on serverside
* editor - a command to open a file editor exampel: **'editor {file name}'**
* ls - show all files in the folder
* cd - move to annother folder exampel: **'cd {name of folder}'**
* cat - show the content of a text file: **'cat {file name}'**
* create - creates somthing 
    * -f - creates a new file exampel: **'create -f {file name}'**
* push - adds text to somthing
    * -f - adds text to a file example: **'push -f {file to push text to} {string to push}'**
* clear - clears the CLI
* compile - compile a file to make a runebel bas file exampel: **'compile -f {file name} {new file name}'** it generats a file that and whit .r om det finns en file med {file name}.r eller {new file name} kommer dessa filer att överskridas
* run - runs a runebel file
    * -b - runs a bas file the file ned to end whit .r **'run -b {filename}.r'**
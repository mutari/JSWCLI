//Test server
const express = require('express');
const app = express();

app.use(express.static(__dirname + "/public"));

app.get('/JSCLI/BASS/:path', (req, res) => {
    res.sendFile(__dirname + "/JSCLI/BASS/" + req.params.path);
});

app.get('/JSCLI/WCLI/:path', (req, res) => {
    res.sendFile(__dirname + "/JSCLI/WCLI/" + req.params.path);
});

app.get('/JSCLI/Debugger/:path', (req, res) => {
    res.sendFile(__dirname + "/JSCLI/Debugger/" + req.params.path);
});

app.listen('3000', () => {
    console.log("Test server started and running on port 3000");
})
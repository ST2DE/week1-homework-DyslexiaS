const pug = require('pug');
const compiledFunction = pug.compileFile('intro.pug');
const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname)));
// for render
app.set('view engine','pug');
app.set('views', __dirname)

app.get('/', function(req, res){
    res.sendFile( __dirname + '/' + 'intro.html' );
});

app.get('/about_me', function(req, res){
    console.log(req.query.name);
    res.render('intro', {
        name: 'Hello, ' + req.query.name
    });
});

app.listen(3000, function(){
    console.log('App is running on port 3000.');
});

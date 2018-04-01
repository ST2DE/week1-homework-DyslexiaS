const sass = require('node-sass');
const pug = require('pug');
const fs = require('fs');
const htmlFn = pug.compileFile('intro.pug',{pretty:true});
fs.writeFile('intro.html',htmlFn());
sass.render( { file: 'intro.sass' }, function(err,result) {
	    fs.writeFile( 'intro.css', result.css, function( err ) {} );
} );



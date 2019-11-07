const express = require( 'express' )
const bodyParser = require ( 'body-parser' )
const indexRouter = require( '../routes/index')
const testRouter = require( '../routes/testpage' )
const scoreRouter = require( '../routes/score' )
const manageRouter = require( '../routes/testpage' )
const app = express();
const _PORT = 3000;

app.set( 'view engine', 'ejs' );
app.use( '/static', express.static('public') );
app.post('*', bodyParser.urlencoded({ extended: false }))

app.use( '/' , indexRouter );
app.use( '/test' , testRouter );
app.use( '/score' , scoreRouter );
app.use( '/manage' , manageRouter ); 

app.listen( _PORT, _ => {
  console.log( `server running at port ${_PORT}` )
} );

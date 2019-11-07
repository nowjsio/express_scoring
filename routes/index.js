const express = require( 'express' );
const router = express.Router();
const testpage = require( '../lib/testpage' );

router.get( '/', ( req, res) =>{
    testpage.Home( req, res );
})

module.exports= router
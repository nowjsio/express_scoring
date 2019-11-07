const express = require( 'express' );
const router = express.Router();
const managepage = require( '../lib/managepage' );

router.get( '/', ( req, res) =>{
    managepage.Home( req, res );
})

module.exports= router
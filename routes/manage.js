const express = require( 'express' );
const router = express.Router();
const managepage = require( '../lib/managepage' );

router.get( '/', ( req, res ) =>{
    managepage.Home( req, res );
})

router.post( '/createtestpage', ( req,res ) => {
    managepage.CreateTestpage( req, res );
})  

router.get ('/:pagenum', ( req, res ) => {
    managepage.PageNum ( req, res );
})

router.post ('/createpageid', ( req, res ) =>{
    managepage.CreatePageId ( req, res );
})
router.get ('/:pagenum/:pageid', ( req, res) => {
    managepage.PageId ( req, res ); 
})
module.exports= router
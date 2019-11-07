
const express = require( 'express' );
const router = express.Router();
const testpage = require( '../lib/testpage' );

router.get( '/1', ( req, res) => {
    var pageNumber=req.route.path
    testpage.Test_1( req, res, pageNumber );
})
router.get( '/2', ( req, res) => {
    var pageNumber = req.route.path
    testpage.Test_2( req, res, pageNumber );
})
router.get( '/3', ( req, res) => {
    var pageNumber = req.route.path
    testpage.Test_3( req, res, pageNumber );
})

module.exports= router
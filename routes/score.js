const express = require( 'express' );
const router = express.Router();
const score = require( '../lib/score' );

router.post( '/checking' , ( req, res ) => {
    score.Checking ( req, res );
})
router.get( '/yours' , ( req, res ) => {
    score.Yours ( req, res );
} )

module.exports= router
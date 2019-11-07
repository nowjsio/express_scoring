exports.Home = function ( req, res ) {
    res.render( 'index' )
}
exports.Test_1 = function ( req, res, pageNumber ) {
    
    res.render ( 'test1', {pageNumber} )
}
exports.Test_2 = function ( req, res, pageNumber ) {
    res.render ( 'test2', {pageNumber} )
}
exports.Test_3 = function( req, res, pageNumber ) {
    res.render ( 'test3', {pageNumber} )
}




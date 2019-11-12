var db = require ( './database/db' );

exports.Home = function ( req, res ) {
 
    res.render ( 'managepage' )
}

exports.CreateTestpage=function( req, res ) {
    var testnum = req.body.test

    res.redirect ( `/manage/test${testnum}` )
}
exports.PageNum=function( req, res ) {
    var page_num = req.params.pagenum
    var pagenum = page_num.replace('test','')
 
    const rate_accuracy = function(a,b){
        var rate = (a*100)/b;
        var rate_round = Math.round(rate)
        return (`${rate_round}%`);
    }



    db.manage_page(pagenum)
    .then((data) => {
        var manage_db = data.testpagerow;
        var manage_id = data.testpageid;
        console.log(manage_db)
       
        res.render ( 'managepagenum' ,{ pagenum, manage_db,rate_accuracy,manage_id } )
    })
    .catch((errMsg) => {
        console.log(errMsg);
    });

}
exports.CreatePageId=function( req, res ) {

    var testid = req.body.testid
    var pagenum = req.body.page_num

    res.redirect ( `/manage/test${pagenum}/${testid}` )
}
exports.PageId=function( req, res ) {
    var page_id = req.params.pageid;
    var pagenum = req.params.pagenum;
    var page_num = pagenum.replace('test','');

    db.check_idscore(page_num,page_id)
    .then((data) => {
        var ansdata = data.ans_rowdata
        var retdata = data.ret_rowdata
        console.log(retdata)
        
        res.render ( 'managepageid', {ansdata,retdata} )
    })
    .catch((errMsg) => {
        console.log(errMsg);
    });
}
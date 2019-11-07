var db = require ( './database/db' );

exports.Checking = function( req, res ){
   
    var post = req.body;
    var page = post.pagenumber;
    var pagenum = page.replace(/\//,'');

    if(post.q1?t1_q1=post.q1 : t1_q1=post.q10)
    if(post.q2?t1_q2=post.q2 : t1_q2=post.q20)
    if(post.q3?t1_q3=post.q3 : t1_q3=post.q30)
    
    db.test_inserttable(pagenum,t1_q1,t1_q2,t1_q3)
        .catch((errMsg) => {
            console.log(errMsg);
        });
    res.redirect ( '/score/yours' );
}

exports.Yours = function ( req, res ) {
    db.check_yourscore()
        .then((data) => {
            var ansdata = data.ans_rowdata
            var retdata = data.ret_rowdata
            console.log(ansdata)
            console.log(retdata)
            
            res.render ( 'yourscore', {ansdata,retdata} )
        })
        .catch((errMsg) => {
            console.log(errMsg);
        });
}

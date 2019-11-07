const mariadb = require('mariadb');
const vals = require('./dbconfig.json');
 
const pool = mariadb.createPool({
    host: vals.db_host, port:vals.db_port,
    user: vals.db_user, password: vals.db_pass,
    database: vals.db_database,
    connectionLimit: 5
});
async function Test_insertTable(pagenum,t1_q1,t1_q2,t1_q3){
    let conn;
    try{
        conn = await pool.getConnection();
        conn.query(`Use ${vals.db_database}`);
        conn.query(`INSERT INTO returnSheet (seqReturnSheet,question1, question2, question3) VALUES (?, ?, ?, ?)`,[pagenum,t1_q1,t1_q2,t1_q3])      
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn)  return conn.end();   
    }
}

async function Check_yourscore(){
    let conn,ans_row,ret_row;
    try{
        conn = await pool.getConnection();
        conn.query(`Use ${vals.db_database}`);
        ret_row = await conn.query(`SELECT seqReturnSheet,question1,question2,question3  FROM returnsheet  ORDER BY id DESC LIMIT 1`)  
        var ret_pagenum = ret_row[0].seqReturnSheet
        conn.query(`Use ${vals.db_database}`);
        ans_row = await conn.query(`SELECT seqAnswerSheet,question1,question2,question3  FROM answersheet where seqAnswerSheet=?`,[ret_pagenum])  
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn)  conn.end();   
        return {ans_rowdata : ans_row[0], ret_rowdata: ret_row[0]}
    }
}

module.exports = {
    test_inserttable: Test_insertTable,
    check_yourscore : Check_yourscore 
}

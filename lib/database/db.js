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

async function Mange_page(testpage_num){
    let conn, testpage_row, testpage_id;
    try{
        conn = await pool.getConnection();
        conn.query(`Use ${vals.db_database}`);
        testpage_row = await conn.query(`select 
                    a.seqAnswersheet TestpageNumber,
                    sum(a.question1 = r.question1) Q1,
                    sum(a.question2 = r.question2) Q2,
                    sum(a.question3 = r.question3) Q3,
                    count(*) total
                    from Answersheet a
                    inner join Returnsheet r on r.seqReturnsheet = a.seqAnswersheet
                    group by a.seqAnswersheet 
                    having TestpageNumber=?`,[testpage_num])  
        testpage_id = await conn.query('select id from returnsheet r where r.seqreturnsheet=?',[testpage_num])
     

    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();   
 
        return {testpagerow : testpage_row[0],testpageid : testpage_id}
    }
}

async function Check_idscore(pagenum,pageid){
    let conn,ans_row,ret_row;
    try{
        conn = await pool.getConnection();
        conn.query(`Use ${vals.db_database}`);
        ret_row = await conn.query(`SELECT * FROM returnsheet  where id=? and seqreturnsheet=?`,[pageid,pagenum])  

        conn.query(`Use ${vals.db_database}`);
        ans_row = await conn.query(`SELECT * FROM answersheet where seqAnswerSheet=?`,[pagenum])  
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
    test_inserttable : Test_insertTable,
    check_yourscore : Check_yourscore ,
    manage_page : Mange_page,
    check_idscore : Check_idscore
}

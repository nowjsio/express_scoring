# express_scoring # 

test page 에서 답안을 제출하면 retunrsheet 테이블에 저장 되고,

같은 데이터 베이스의 answersheet 테이블과 비교를 하여 채점을 하는 프로젝트 입니다.

```
localhost:3000        : main test page 

localhost:3000/test/1,2,3    : each test page 

localhost:3000/score/checking : checking test page    

locaclhost:3000/score/yours : checked your sheet 

loaclhost:3000/manage : main manage test page

locaclhost:3000/manage/testpage : examine each test page 
```


front-end : html (ejs), css, javscript(jquery)

back-end : express(nodejs) , mariaDB
import requests
import json
import datetime
import pymysql

conn = pymysql.connect(host='18.188.140.138', user='user01', password='1111', db='movies_db', charset='utf8') 
#conn = pymysql.connect(host='localhost', user='root', password='root', db='moviedata', charset='utf8') 
cursor = conn.cursor()

sql = "SELECT * FROM contents"

cursor.execute(sql)
mc = cursor.fetchall()


for i in range(len(mc)):
    movieCd = str(mc[i][0])
    
    url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=004ad60387947413715497415217ba54&movieCd='+movieCd

    req = requests.get(url)
    text = req.text

    d = json.loads(text)
    l = []
    count = 0
    for j in d['movieInfoResult']['movieInfo']['actors']:        
        name = j['peopleNm']
        
        url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json?key=004ad60387947413715497415217ba54&peopleNm='+name
        
        req = requests.get(url)
        text = req.text
        
        e = json.loads(text)
        
        sql = 'INSERT INTO test (person_id, person_name) VALUES (%s, %s)'
        
        
        for k in e['peopleListResult']['peopleList']:
            if k['repRoleNm']=='배우':
                #print(k['peopleCd']+k['peopleNm'])
                l.append([k['peopleCd'], k['peopleNm']])
        count += 1
        if count==10:
            count = 0
            break

    #print(l)
    for a in l:
        print(a)
        try:
            cursor.execute(sql,a)
        except:
            pass

        
conn.commit()
conn.close()
import requests
import json
import datetime
import pymysql

conn = pymysql.connect(host='18.188.140.138', user='user01', password='1111', db='movies_db', charset='utf8') 
#conn = pymysql.connect(host='localhost', user='root', password='root', db='moviedata', charset='utf8') 
cursor = conn.cursor()

sql = "SELECT * FROM test"

cursor.execute(sql)
mc = cursor.fetchall()


for i in range(len(mc)):
    peopleCd = str(mc[i][0])
    #if mc[i][2]==None:

        url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleInfo.json?key=004ad60387947413715497415217ba54&peopleCd='+peopleCd

        req = requests.get(url)
        text = req.text

        d = json.loads(text)
        filmos = ''

        print(mc[i][1])
        count = 0
        for j in d['peopleInfoResult']['peopleInfo']['filmos']:        
            #print('무비코드 : '+j['movieCd']+', 영화이름 : '+j['movieNm'])
            filmos += j['movieCd']+', '
            count += 1
            if count==30:
                count = 0
                break
        filmos = filmos.rstrip(', ')

        sql = 'UPDATE test SET filmo = "'+filmos+'" WHERE person_id = "'+peopleCd+'"'

        try:
            cursor.execute(sql)
            #print('성공')
        except:
            pass
        
conn.commit()
conn.close()
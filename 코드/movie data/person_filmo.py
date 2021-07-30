#person_filmo
import requests
import json
import datetime
import pymysql

conn = pymysql.connect(host='18.188.140.138', user='user01', password='1111', db='movies_db', charset='utf8') 
#conn = pymysql.connect(host='localhost', user='root', password='root', db='moviedata', charset='utf8') 
cursor = conn.cursor()

sql = "SELECT * FROM person"

cursor.execute(sql)
mc = cursor.fetchall()


for i in range(len(mc)):
    peopleCd = str(mc[i][0])
    #if mc[i][2]==None:

    url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleInfo.json?key='+mykey+'&peopleCd='+peopleCd

    req = requests.get(url)
    text = req.text

    d = json.loads(text)
    filmos = ''

    print(mc[i][1])
    count = 0
    check = ''
    for j in d['peopleInfoResult']['peopleInfo']['filmos']:        
        #print('무비코드 : '+j['movieCd']+', 영화이름 : '+j['movieNm'])
        if check != j['movieCd']:
            filmos += j['movieCd']+', '
            count += 1
        check = j['movieCd']        
        if count==30:
            count = 0
            break
    filmos = filmos.rstrip(', ')

    sql = 'UPDATE person SET filmo = "'+filmos+'" WHERE person_pid = "'+peopleCd+'"'

    try:
        cursor.execute(sql)
        #print('성공')
    except:
        pass
        
conn.commit()
conn.close()
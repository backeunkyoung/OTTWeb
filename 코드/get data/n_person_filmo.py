####person_filmo
import requests
import json
import datetime
import pymysql

conn = pymysql.connect(host='18.188.140.138', user='user01', password='1111', db='movies_db', charset='utf8')
cursor = conn.cursor()

sql = "SELECT * FROM person WHERE filmo IS NULL" #filmo가 null인것만 불러옴
#sql = "SELECT * FROM person WHERE" #배우 전체 filmo 업데이트하기 위해 전부 불러옴

cursor.execute(sql)
mc = cursor.fetchall()


for i in range(len(mc)):
    peopleCd = str(mc[i][0])

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
        if check != j['movieCd']: #리스트에 영화 중복 없도록 확인
            filmos += j['movieCd']+', '
            count += 1
        check = j['movieCd']
        if count==30: #배우 1명 당 필모 30개까지 검색
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
#######person_list (contents에 poster url아직 안 넣었을 때 실행시켜야 함 아니면 contents목록 받아올 때 같이 받아오는 코드로 수정)
import requests
import json
import time
import pymysql

conn = pymysql.connect(host='18.188.140.138', user='user01', password='1111', db='movies_db', charset='utf8') 
#conn = pymysql.connect(host='localhost', user='root', password='root', db='moviedata', charset='utf8') 
cursor = conn.cursor()

sql = "SELECT * FROM contents"

cursor.execute(sql)
mc = cursor.fetchall()


for i in range(len(mc)):
    if mc[i][8] == None: #poster가 없는 content만
        movieCd = str(mc[i][0])
        
        url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key='+mykey+'&movieCd='+movieCd

        req = requests.get(url)
        text = req.text

        d = json.loads(text)
        l = []
        count = 0
        for j in d['movieInfoResult']['movieInfo']['actors']:        
            name = j['peopleNm']
            
            time.sleep(3) #3초
            url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json?key='+mykey+'&peopleNm='+name
            
            
            req = requests.get(url)
            text = req.text

            e = json.loads(text)

            sql = 'INSERT INTO person (person_pid, Name) VALUES (%s, %s)'


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
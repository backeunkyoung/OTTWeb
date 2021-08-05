###정기적으로 영화 목록 받아오는 코드(스케줄러 사용) contents, links테이블 목록추가 코드 + 영화배우 목록 추가
import requests
import json
import datetime
import time
import pymysql

#current_datetime = datetime.datetime(2021, 1, 1)
current_datetime = datetime.datetime.today() #현재 날짜
current_datetime = current_datetime - timedelta(weeks=1) #저번 주의 박스오피스 가져오기 위해 (현재날짜 - 1weeks)
l = []
li = []

conn = pymysql.connect(host='18.188.140.138', user='user01', password='1111', db='movies_db', charset='utf8')
cursor = conn.cursor()


content_sql = "INSERT INTO contents (content_id, title, screening_date) VALUES (%s, %s, %s)"
link_sql = "INSERT INTO links (content_id, title) VALUES (%s, %s)"
person_sql = "INSERT INTO person (person_pid, Name) VALUES (%s, %s)"


targetDt = current_datetime.strftime('%Y%m%d')

url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key='+mykey+'&targetDt='+targetDt

req = requests.get(url)
text = req.text

d = json.loads(text)
#print(d)


for b in d['boxOfficeResult']['weeklyBoxOfficeList']:
    if(b['openDt']!=' '): #개봉일이 있는 영화만
        #print(int(b['movieCd']), b['movieNm'], b['openDt'])
        l.append([int(b['movieCd']), b['movieNm'], b['openDt']])
        li.append([b['movieCd'],b['movieNm']])


for b,d in zip(l,li):
    try:
        cursor.execute(content_sql,b)  #contents테이블에 목록추가
        print(b)
        cursor.execute(link_sql,d)  #links테이블에 목록추가
        print(d)
    except:
        pass

    
print('====================================================')
print('person')
print('====================================================')


#person_list불러오기
for i in range(len(l)):
    movieCd = str(l[i][0])
    url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key='+mykey+'&movieCd='+movieCd

    req = requests.get(url)
    text = req.text

    d = json.loads(text)
    
    people = []
    count = 0
    for j in d['movieInfoResult']['movieInfo']['actors']:
        name = j['peopleNm']

        time.sleep(3) #3초
        url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json?key='+mykey+'&peopleNm='+name

        req = requests.get(url)
        text = req.text

        e = json.loads(text)

        for k in e['peopleListResult']['peopleList']:
            if k['repRoleNm']=='배우':
                #print('배우번호 : '+k['peopleCd']+', 배우이름 : '+k['peopleNm'])
                people.append([k['peopleCd'], k['peopleNm']])
        count += 1
        if count==10: #영화 1편 당 배우 10명까지 검색
            count = 0
            break

    for p in people:
        try:
            cursor.execute(person_sql,p) #영화배우 목록추가
            print(p)
        except:
            pass
    
conn.commit() 

conn.close() 
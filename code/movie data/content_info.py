#content_info 국가테이블, 장르테이블에 없는 것 나오면 기타로 처리
import requests
import json
import datetime
import pymysql

#current_datetime = datetime.datetime(2020, 1, 1)
#l = []

conn = pymysql.connect(host='18.188.140.138', user='user01', password='1111', db='movies_db', charset='utf8') 
#conn = pymysql.connect(host='localhost', user='root', password='root', db='moviedata', charset='utf8') 
cursor = conn.cursor()

sql = "SELECT * FROM contents"

cursor.execute(sql)
mc = cursor.fetchall()

sql = "SELECT * FROM production_countrys"

cursor.execute(sql)
pc = cursor.fetchall()

sql = "SELECT * FROM attribute_genres"

cursor.execute(sql)
pcc = cursor.fetchall()

#movie_info=[]

for i in range(len(mc)):
    movieCd = str(mc[i][0])
    
    url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key='+mykey+'&movieCd='+movieCd

    req = requests.get(url)
    text = req.text

    d = json.loads(text)
    
    jj=''
    kk=''
    ll=''

    b=d['movieInfoResult']['movieInfo']
    #print(b)
    print(b['movieNm'])
    
    for j in b['nations']:
        jj += j['nationNm']+','
    #print(b['nations'][0]['nationNm'])
    print(jj.rstrip(','))
    country = jj.rstrip(',')
    country = country.split(',') #국가이름 받아옴 (리스트로)
    for k in range(len(country)):
        #print(k)
        check = 0
        for j in range(len(pc)): #국가이름을 코드로 치환
            #print(country[k]+'=='+pc[j][1])
            if country[k] == pc[j][1]:
                country[k] = pc[j][0]
                check = 1
                break
        if check == 0: #국가 테이블에 없는 국가는 기타(ee)로 저장됨
            country[k] = 'ee'        
    #print(','.join(country))
    country = ','.join(country) #대괄호 없애고 리스트 목록만 출력
    
    
    for k in b['genres']:
        kk += k['genreNm']+','
    print(kk.rstrip(','))
    genre = (kk.rstrip(','))
    genre = genre.split(',') #장르이름 받아옴 (리스트)
    for k in range(len(genre)):
        check = 0
        for j in range(len(pcc)): #장르를 코드로 치환
            #print(genre[k]+'=='+pcc[j][1])
            if genre[k] == pcc[j][1]:
                genre[k] = pcc[j][0]
                check = 1
                break
        if check == 0: #장르 테이블에 없으면 기타(30)로 저장됨
            genre[k] = '30'
    #print(','.join(genre))
    genre = ','.join(genre) #대괄호 없애고 리스트 목록만 출력
    
    
    for l in b['directors']:
        ll += l['peopleNm']+','
    print(ll.rstrip(','))
    director = ll.rstrip(',')
    
    
    if(b['audits'][0]['watchGradeNm']): #시청제한있으면
        print(b['audits'][0]['watchGradeNm'])
        age = b['audits'][0]['watchGradeNm']
    
    #movie_info.append([movieCd, jj.rstrip(','), kk.rstrip(','), b['audits'][0]['watchGradeNm']])
    #print(movie_info)

    #for b in d['movieInfoResult']['movieInfo']:
        #print(targetDt, b['movieCd'], b['movieNm'], b['openDt'])
        #l.append([int(b['movieCd']), b['movieNm'], b['openDt']])
    sql = 'UPDATE contents SET production_country = "'+country+'", attribute_genre = "'+genre+'", age_information = "'+age+'", director = "'+director+'" WHERE content_id = "'+movieCd+'"'
    
#new_list = []
#for v in l:
    #if v not in new_list:
        #new_list.append(v)
#print(new_list)
    
#for b in new_list: 
    cursor.execute(sql)
    
    
conn.commit() 

conn.close() 
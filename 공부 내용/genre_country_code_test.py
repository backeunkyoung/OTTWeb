#content_info
import requests
import json
import datetime
import pymysql

current_datetime = datetime.datetime(2020, 1, 1)
l = []

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
    for j in range(len(pc)): #국가이름을 코드로 치환
        #print(pc[j][0]+pc[j][1])
        country = country.replace(pc[j][1],pc[j][0])
        #print(country)
    
    for k in b['genres']:
        kk += k['genreNm']+','
    print(kk.rstrip(','))
    genre = (kk.rstrip(','))
    for j in range(len(pcc)): #장르를 코드로 치환
        #print(str(pcc[j][0])+pcc[j][1])
        genre = genre.replace(pcc[j][1],str(pcc[j][0]))
        #print(genre)
    
    for l in b['directors']:
        ll += l['peopleNm']+','
    print(ll.rstrip(','))
    director = ll.rstrip(',')
    
    if(b['audits'][0]['watchGradeNm']):
        print(b['audits'][0]['watchGradeNm'])
        age = b['audits'][0]['watchGradeNm']
    
    #movie_info.append([movieCd, jj.rstrip(','), kk.rstrip(','), b['audits'][0]['watchGradeNm']])
    #print(movie_info)

    #for b in d['movieInfoResult']['movieInfo']:
        #print(targetDt, b['movieCd'], b['movieNm'], b['openDt'])
        #l.append([int(b['movieCd']), b['movieNm'], b['openDt']])
    sql = 'UPDATE contents SET production_country = "'+country+'", field_genre = "'+genre+'", age_information = "'+age+'", director = "'+director+'" WHERE content_id = "'+movieCd+'"'
    
#new_list = []
#for v in l:
    #if v not in new_list:
        #new_list.append(v)
#print(new_list)
    
#for b in new_list: 
    cursor.execute(sql)
    
    
conn.commit() 

conn.close() 
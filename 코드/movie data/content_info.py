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

#movie_info=[]

for i in range(len(mc)):
    movieCd = str(mc[i][0])
    
    url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=004ad60387947413715497415217ba54&movieCd='+movieCd

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
    jjj = jj.rstrip(',')
    for k in b['genres']:
        kk += k['genreNm']+','
    print(kk.rstrip(','))
    kkk = (kk.rstrip(','))
    for l in b['directors']:
        ll += l['peopleNm']+','
    print(ll.rstrip(','))
    lll = ll.rstrip(',')
    if(b['audits'][0]['watchGradeNm']):
        print(b['audits'][0]['watchGradeNm'])
        mmm = b['audits'][0]['watchGradeNm']
    
    #movie_info.append([movieCd, jj.rstrip(','), kk.rstrip(','), b['audits'][0]['watchGradeNm']])
    #print(movie_info)

    #for b in d['movieInfoResult']['movieInfo']:
        #print(targetDt, b['movieCd'], b['movieNm'], b['openDt'])
        #l.append([int(b['movieCd']), b['movieNm'], b['openDt']])
    sql = 'UPDATE contents SET production_country = "'+jjj+'", field_genre = "'+kkk+'", age_information = "'+mmm+'", director = "'+lll+'" WHERE content_id = "'+movieCd+'"'
    
#new_list = []
#for v in l:
    #if v not in new_list:
        #new_list.append(v)
#print(new_list)
    
#for b in new_list: 
    cursor.execute(sql)
    
    
conn.commit() 

conn.close() 
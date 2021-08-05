####content_info 국가테이블, 장르테이블에 없는 요소 나오면 기타로 처리
import requests
import json
import datetime
import pymysql
import time


conn = pymysql.connect(host='18.188.140.138', user='user01', password='1111', db='movies_db', charset='utf8')
cursor = conn.cursor()

sql = "SELECT * FROM contents WHERE production_country IS NULL" #국가가 NULL인것만 불러옴

cursor.execute(sql)
mc = cursor.fetchall()

sql = "SELECT * FROM production_countrys"

cursor.execute(sql)
c_table = cursor.fetchall()

sql = "SELECT * FROM attribute_genres"

cursor.execute(sql)
g_table = cursor.fetchall()


for i in range(len(mc)):
    movieCd = str(mc[i][0])

    url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key='+mykey+'&movieCd='+movieCd

    time.sleep(3) #3초
    req = requests.get(url)
    text = req.text

    d = json.loads(text)

    nations = ''
    genres = ''
    directors = ''

    b=d['movieInfoResult']['movieInfo'] #b = 영화세부정보
    #print(b)
    print(b['movieNm'])
    
    #국가정보
    for j in b['nations']: #j = 영화 국가정보
        nations += j['nationNm']+','
        
    print(nations.rstrip(','))
    nations = nations.rstrip(',')
    nations = nations.split(',') #', '로 쪼갬 (국가이름 리스트) (코드로 치환하려고)
    
    for k in range(len(nations)):
        #print(k)
        check = 0
        for j in range(len(c_table)): #국가이름을 코드로 치환
            #print(country[k]+'=='+pc[j][1])
            if nations[k] == c_table[j][1]:
                nations[k] = c_table[j][0]
                check = 1
                break
        if check == 0: #국가 테이블에 없는 국가는 기타(ee)로 저장됨
            nations[k] = 'ee'
    print(','.join(nations))
    nations = ','.join(nations) #대괄호 없애고 리스트 목록만 출력(문자열)
    

    #장르정보
    for k in b['genres']: #k = 영화 장르정보
        genres += k['genreNm']+','
    
    print(genres.rstrip(','))
    genres = genres.rstrip(',')
    genres = genres.split(',') #', '로 쪼갬 (장르이름 리스트) (코드로 치환하려고)
    
    for k in range(len(genres)):
        check = 0
        for j in range(len(g_table)): #장르를 코드로 치환
            #print(genre[k]+'=='+pcc[j][1])
            if genres[k] == g_table[j][1]:
                genres[k] = str(g_table[j][0])
                check = 1
                break
        if check == 0: #장르 테이블에 없으면 기타(30)로 저장됨
            genres[k] = '30'
    print(','.join(genres))
    genres = ','.join(genres) #대괄호 없애고 리스트 목록만 출력(문자열)

    
    #감독정보
    for l in b['directors']: #l = 영화 감독정보
        directors += l['peopleNm']+','
        
    print(directors.rstrip(','))
    director = directors.rstrip(',') #영화감독 리스트(문자열)


    #시청제한 나이정보
    if(b['audits'][0]['watchGradeNm']): #시청제한있으면
        print(b['audits'][0]['watchGradeNm'])
        age = b['audits'][0]['watchGradeNm']


    sql = 'UPDATE contents SET production_country = "'+nations+'", attribute_genre = "'+genres+'", age_information = "'+age+'", director = "'+directors+'" WHERE content_id = "'+movieCd+'"'

    try:
        cursor.execute(sql)
    except:
        pass

    
conn.commit()
conn.close()
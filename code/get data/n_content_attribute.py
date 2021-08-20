#### content랑 genre 테이블 (이미 들어간 영화는 제외하고 실행시켜야 함) 수정
import requests
import json
import datetime
import pymysql
import time


conn = pymysql.connect(host='18.188.140.138', user='user01', password=password, db='movies_db', charset='utf8')
cursor = conn.cursor()

#content_attribute테이블에 없는 영화만
sql = "SELECT content_id, title FROM contents WHERE content_id NOT IN (SELECT content_pid FROM content_attribute)"

cursor.execute(sql)
mc = cursor.fetchall() #content테이블 content_id, title 불러옴
#print(mc)

sql = "SELECT * FROM attribute_genres"

cursor.execute(sql)
g_table = cursor.fetchall() #장르 테이블 불러옴



for i in range(len(mc)):
    movieCd = str(mc[i][0]) #검색을 위해 문자열로 바꿈

    #무비코드로 영화 상세정보 크롤링(영진위API)
    url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key='+mykey+'&movieCd='+movieCd

    #time.sleep(3) #3초
    req = requests.get(url)
    text = req.text

    d = json.loads(text)

    b=d['movieInfoResult']['movieInfo'] #b = 영화세부정보
    #print(b)
    print(b['movieNm'])

    #장르정보 (문자열 하나로 만들지 말고 하나하나 따로 로우로 만들어서 connect에 저장해야 함)
    for k in b['genres']: #k = 영화 장르정보
        genre = k['genreNm']
        check = 0
        for j in range(len(g_table)): #장르를 코드로 치환
            if genre in g_table[j][1]:
                genre_code = g_table[j][0]
                check = 1
                break
            if g_table[j][1] in genre:
                genre_code = g_table[j][0]
                check = 1
                break
        if check == 0: #장르 테이블에 없으면 기타(30)로 저장됨
            genre_code = 30
        #print('전:'+str(genre)+' 후:'+str(genre_code))
        l = [mc[i][0], genre_code]
        sql = "INSERT INTO content_attribute (content_pid, attribute_num) VALUES (%s, %s)"
        try:
            cursor.execute(sql,l)
        except:
            print('오류생김')
            pass
        
conn.commit()
conn.close()
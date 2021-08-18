####content랑 country 테이블 (이미 들어간 영화는 제외하고 실행시켜야 함) 수정
import requests
import json
import datetime
import pymysql
import time


conn = pymysql.connect(host='18.188.140.138', user='user01', password=password, db='movies_db', charset='utf8')
cursor = conn.cursor()

#content_country테이블에 없는 영화만
sql = "SELECT content_id, title FROM contents WHERE content_id NOT IN (SELECT content_pid FROM content_country)"

cursor.execute(sql)
mc = cursor.fetchall() #content테이블 content_id, title 불러옴
#print(mc)

sql = "SELECT * FROM production_countrys"

cursor.execute(sql)
c_table = cursor.fetchall() #국가 테이블 불러옴


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
    
    #국가정보 (문자열 하나로 만들지 말고 하나하나 따로 로우로 만들어서 connect2에 저장해야 함)
    for j in b['nations']: #j = 영화 국가정보
        nation = j['nationNm']
        check = 0
        for j in range(len(c_table)): #국가이름을 코드로 치환
            if nation == c_table[j][1]:
                nation_code = c_table[j][0]
                check = 1
                break
        if check == 0: #국가 테이블에 없는 국가는 기타(ee)로 저장됨
            nation_code = 'ee'
        #print('전:'+nation+' 후:'+nation_code)
        l = [mc[i][0], nation_code]
        sql = "INSERT INTO content_country (content_pid, nation_code) VALUES (%s, %s)"
        try:
            cursor.execute(sql,l)
        except:
            print('오류생김')
            pass
        
conn.commit()
conn.close()
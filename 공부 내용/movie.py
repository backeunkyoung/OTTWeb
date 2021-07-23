import requests
import json
import pandas as pd

url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json'

param = {
    'key' : '004ad60387947413715497415217ba54',
    'itemPerPage' : '30',
    'openEndDt' : '2021',
    'openStartDt' : '2021'
}

req = requests.get(url, params = param)
text = req.text
j = json.loads(text)

#print(j)

l = []
for b in j['movieListResult']['movieList']:
        #print(b['movieCd'], b['movieNm'], b['openDt'], b['typeNm'], b['repNationNm'], b['repGenreNm'], b['directors'], b['companys'])
        l.append([b['movieCd'],
                 b['movieNm'],
                 b['openDt'],
                 b['typeNm'],
                 b['repNationNm'],
                 b['repGenreNm'],
                 b['directors'],
                 b['companys']])
        
pd.DataFrame(l, columns=['영화코드',
                         '영화이름',
                         '개봉일',
                         '타입',
                         '국가',
                         '장르',
                         '감독',
                         '제작사'])
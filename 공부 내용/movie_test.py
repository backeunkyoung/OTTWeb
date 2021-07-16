import json
import pymysql
import requests

url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json'

param={
    'key' : 'db9b9a6a1b0bef28cb827ddf7729506b',
    'itemPerPage' : '100',
    'openEndDt' : '2021',
    'openStarDt' : '2021'
}

req = requests.get(url,params=param)
text = req.text
j = json.loads(text)

conn = pymysql.connect(host='127.0.0.1',user='root',password='root',db = 'test',charset='utf8')
cursor = conn.cursor()

sql = "INSERT INTO movie VALUES (%s,%s,%s,%s,%s,%s)"

for b in j['movieListResult']['movieList']:
    i=(b['movieCd'],b['movieNm'],b['openDt'],b['typeNm'],b['genreAlt'],b['nationAlt'])
    cursor.execute(sql,i)

conn.commit()
conn.close()
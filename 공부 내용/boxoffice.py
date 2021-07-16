import json
import pymysql
import requests

url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json'

param={
    'key' : 'db9b9a6a1b0bef28cb827ddf7729506b',
    'targetDt' : '20210710',
}

req = requests.get(url,params=param)
text = req.text
j = json.loads(text)

conn = pymysql.connect(host='127.0.0.1',user='root',password='root',db = 'test',charset='utf8')
cursor = conn.cursor()

sql = "INSERT INTO boxoffice VALUES (%s,%s,%s,%s,%s)"

for b in j['boxOfficeResult']['weeklyBoxOfficeList']:
    i=(b['rnum'],b['rank'],b['openDt'],b['movieCd'],b['movieNm'])
    print("순위 " + b['rank'] + " 영화제목 : " +b['movieNm'])
    cursor.execute(sql,i)

conn.commit()
conn.close()

import requests
import json
import datetime
import pymysql

current_datetime = datetime.datetime(2020, 1, 1)
l = []

conn = pymysql.connect(host='localhost', user='root', password='root', db='moviedata', charset='utf8') 
cursor = conn.cursor()

sql = "INSERT INTO movies (movieCd, movieNm) VALUES (%s, %s)"


for i in range(52):
    targetDt = current_datetime.strftime('%Y%m%d')

    url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=004ad60387947413715497415217ba54&targetDt='+targetDt

    req = requests.get(url)
    text = req.text

    d = json.loads(text)

#print(d)

    for b in d['boxOfficeResult']['weeklyBoxOfficeList']:
        print(targetDt, b['movieCd'], b['movieNm'])
        l.append([b['movieCd'],
          b['movieNm']])

        
    
    current_datetime = current_datetime + datetime.timedelta(weeks=1)

    
new_list = []
for v in l:
    if v not in new_list:
        new_list.append(v)
print(new_list)
    
for b in new_list: 
    cursor.execute(sql,b)
    
    
conn.commit() 

conn.close() 
#####links_list_new 나중에 content_list랑 같이 넣도록 만들어야겠다
import requests
import json
import datetime
import time
import pymysql

current_datetime = datetime.datetime(2021, 1, 1)
l = []

conn = pymysql.connect(host='18.188.140.138', user='user01', password='1111', db='movies_db', charset='utf8')
cursor = conn.cursor()

sql = "INSERT INTO links (content_id, title) VALUES (%s, %s)"


for i in range(26):
    targetDt = current_datetime.strftime('%Y%m%d')

    url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key='+mykey+'&targetDt='+targetDt

    time.sleep(3) #3초
    req = requests.get(url)
    text = req.text

    d = json.loads(text)

#print(d)

    for b in d['boxOfficeResult']['weeklyBoxOfficeList']:
        #print(targetDt, b['movieCd'], b['movieNm'])
        if(b['openDt']!=' '):
            l.append([int(b['movieCd']), b['movieNm']])
        
    
    current_datetime = current_datetime + datetime.timedelta(weeks=1)

    
new_list = []
for v in l:
    if v not in new_list:
        new_list.append(v)
#print(new_list)
    
for b in new_list:
    try:
        cursor.execute(sql,b)
    except:
        pass
    
    
conn.commit() 

conn.close() 
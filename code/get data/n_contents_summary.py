#####content_summary 수정수정
import requests
import json
import time
import pymysql 
from datetime import datetime
from urllib.parse import quote
from urllib.request import urlopen
from bs4 import BeautifulSoup
import re


conn = pymysql.connect(host='18.188.140.138', user='user01', password=password, db='movies_db', charset='utf8')
cursor = conn.cursor() 

#줄거리가 없는 영화만 links테이블에서 불러옴
sql = "SELECT * FROM links WHERE content_id IN (SELECT content_id FROM contents WHERE summary IS NULL)"

cursor.execute(sql)
mc = cursor.fetchall()

for i in range(len(mc)):
    link = mc[i][2]
    movieCd = mc[i][0]
    if link != None:
        try:
            time.sleep(1)
            res = requests.get(link)
            soup = BeautifulSoup(res.content, 'html.parser')
            summary = soup.find('p','con_tx')
            if summary != None:
                summary = re.sub('[^\da-zA-Z가-힣/.() ]', '', summary.text).strip()
                print(mc[i][1])
                summary = summary[:1000]
            sql = "UPDATE contents SET summary = '"+summary+"' WHERE content_id = '"+movieCd+"'"
            cursor.execute(sql)
            print(summary)
        except:
            pass

conn.commit()
conn.close()

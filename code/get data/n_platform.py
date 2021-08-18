#어느 플랫폼에 영화가 있는지 (플랫폼 리스트) platform 테이블
import requests
import json
import pymysql
from urllib.parse import quote
from urllib.request import urlopen
from bs4 import BeautifulSoup
import time


conn = pymysql.connect(host='18.188.140.138', user='user01', password=password, db='movies_db', charset='utf8')
cursor = conn.cursor() 

sql = "SELECT content_pid, pedia_link FROM platform"

cursor.execute(sql)
pc = cursor.fetchall()

for j in range(len(pc)):
    platform = ''
    movieCd = str(pc[j][0])
    print(str(pc[j][0]))
    link = pc[j][1]
    res = requests.get(link)
    soup = BeautifulSoup(res.content, 'html.parser')
    try:
        #제공하는 플랫폼 있으면
        pla = soup.find("section","css-l1ynz5").find_all("li", class_="css-wj6fn0")
        for k in range(len(pla)):
            plaa = soup.find("section","css-l1ynz5").find_all("li", class_="css-wj6fn0")[k].find("a")['title']
            print(plaa)
            platform += plaa+', '
        platform = platform.rstrip(', ')
        try:
            sql = 'UPDATE platform SET platform = "'+platform+'" WHERE content_pid = "'+movieCd+'"'
            cursor.execute(sql)
        except:
            print('db넣기 실패')
            pass
    except:
        #제공하는 플랫폼 없으면
        print('플랫폼 제공 안 함')
        try:
            sql = 'UPDATE platform SET platform = NULL WHERE content_pid = "'+movieCd+'"'
            cursor.execute(sql)
        except:
            print('db넣기 실패')
            pass
    
    
conn.commit()
conn.close()
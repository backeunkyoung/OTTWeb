#content_poster 영화 포스터 불러오기 (줄거리 불러오기 수정)
import requests
import json
import pymysql
from urllib.parse import quote
from urllib.request import urlopen
from bs4 import BeautifulSoup
import time


conn = pymysql.connect(host='18.188.140.138', user='user01', password='1111', db='movies_db', charset='utf8')
cursor = conn.cursor() 

sql = "SELECT * FROM links"

cursor.execute(sql)
mc = cursor.fetchall()


for i in range(len(mc)):
    link = mc[i][2]
    movieCd = mc[i][0]
    #print (movie)
    if(link):
        try:
            res = requests.get(link)
            soup = BeautifulSoup(res.content, 'html.parser')
            img = soup.find("div", class_="poster").find('img')['src']
            img = img[:-15] #화질 좋은 이미지가져오려면 url 뒷부분 잘라내야 함
            print(img)
            sql = 'UPDATE contents SET poster = "'+img+'" WHERE content_id = "'+movieCd+'"'
            cursor.execute(sql)
            time.sleep(3)  # 3초 기다림
        except:
            pass

conn.commit()
conn.close()
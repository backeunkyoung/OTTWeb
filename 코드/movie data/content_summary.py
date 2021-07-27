import requests
import json
import datetime
import pymysql 
from datetime import datetime
from urllib.parse import quote
from urllib.request import urlopen
from bs4 import BeautifulSoup
import re


conn = pymysql.connect(host='18.188.140.138', user='user01', password='1111', db='movies_db', charset='utf8') 
#conn = pymysql.connect(host='localhost', user='root', password='root', db='moviedata', charset='utf8') 
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
            naver = soup.find("p", class_="con_tx") #줄거리 불러옴
            if(naver): #줄거리가 있는 영화만
                naverr = re.sub('[^\da-zA-Z가-힣/.() ]', '', naver.text).strip()
                print(mc[i][1])
            sql = 'UPDATE contents SET summary = "'+naverr+'" WHERE content_id = "'+movieCd+'"'
            cursor.execute(sql)
        except:
            pass

conn.commit()
conn.close()
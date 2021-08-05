#####content_summary
import requests
import json
import time
import pymysql 
from datetime import datetime
from urllib.parse import quote
from urllib.request import urlopen
from bs4 import BeautifulSoup
import re


conn = pymysql.connect(host='18.188.140.138', user='user01', password='1111', db='movies_db', charset='utf8')
cursor = conn.cursor() 

sql = "SELECT * FROM links"

cursor.execute(sql)
mc = cursor.fetchall()

sql = "SELECT content_id, summary FROM contents"

cursor.execute(sql)
pc = cursor.fetchall()

for j in range(len(pc)):
    if pc[j][1] == None:
        for i in range(len(mc)):
            if str(pc[j][0]) == mc[i][0]:
                link = mc[i][2]
                movieCd = int(mc[i][0])
                if(link != None):
                    try:
                        time.sleep(3) #3초
                        res = requests.get(link)
                        soup = BeautifulSoup(res.content, 'html.parser')
                        naver = soup.find("p", class_="con_tx") #줄거리 불러옴
                        if(naver): #줄거리가 있는 영화만
                            naverr = re.sub('[^\da-zA-Z가-힣/.() ]', '', naver.text).strip()
                            print(mc[i][1])
                            print(naverr)
                        sql = 'UPDATE contents SET summary = "'+naverr+'" WHERE content_id = "'+movieCd+'"'
                        cursor.execute(sql)
                    except:
                        pass

conn.commit()
conn.close()
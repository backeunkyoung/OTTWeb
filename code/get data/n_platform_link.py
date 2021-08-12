#어느 플랫폼에 영화가 있는지 (url 가져오기) platform 테이블
import requests
import json
import pymysql
from urllib.parse import quote
from urllib.request import urlopen
from bs4 import BeautifulSoup
import time

conn = pymysql.connect(host='18.188.140.138', user='user01', password=password, db='movies_db', charset='utf8')
cursor = conn.cursor() 

sql = "SELECT content_id, title FROM contents"

cursor.execute(sql)
pc = cursor.fetchall()


pedia = []

for j in range(len(pc)):
    print(str(pc[j][0])+"||"+pc[j][1])
    link = 'https://pedia.watcha.com/ko-KR/searches/movies?query='+quote(pc[j][1])
    print(link)
    res = requests.get(link)
    soup = BeautifulSoup(res.content, 'html.parser')
    img = soup.find_all("li","css-19dwtmk")
    for i in range(len(img)):
        if pc[j][1].replace(" ","") == soup.find_all("li", class_="css-19dwtmk")[i].find("a")['title'].replace(" ",""):
            pp = soup.find_all("li", class_="css-19dwtmk")[i].find("a")['href']
            link1 = 'https://pedia.watcha.com'+pp
            print(link1)
            pedia.append([str(pc[j][0]), pc[j][1], link1])
            break

sql = "INSERT INTO platform (content_pid, title, pedia_link) VALUES (%s, %s, %s)"            

for p in pedia:
    try:
        cursor.execute(sql,p)
        print(p)
    except:
        print('안들어감')
        pass
    
conn.commit()
conn.close()
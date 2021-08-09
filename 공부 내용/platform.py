#어느 플랫폼에 영화가 있는지
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

for j in range(1):
    link = 'https://pedia.watcha.com/ko-KR/search?query='+quote('미드나잇 선')
    print(link)
    res = requests.get(link)
    soup = BeautifulSoup(res.content, 'html.parser')
    img = soup.find_all("section","css-1p366lz")[1].find_all("li", class_="css-19dwtmk")
    for i in range(len(img)):
        if '미드나잇 선' == soup.find_all("section","css-1p366lz")[1].find_all("li", class_="css-19dwtmk")[i].find("a")['title']:
            pp = soup.find_all("section","css-1p366lz")[1].find_all("li", class_="css-19dwtmk")[i].find("a")['href']
            link1 = 'https://pedia.watcha.com'+pp
            print(link1)
            res = requests.get(link1)
            soup1 = BeautifulSoup(res.content, 'html.parser')
            pla = soup1.find("section","css-l1ynz5").find_all("li", class_="css-wj6fn0")
            for k in range(len(pla)):
                plaa = soup1.find("section","css-l1ynz5").find_all("li", class_="css-wj6fn0")[k].find("a")['title']
                #print(soup1.find_all("li", class_="css-wj6fn0")[k].find("a"))
                print(plaa)
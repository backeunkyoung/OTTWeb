#####links_url
import requests
import json
import time
import pymysql
from urllib.parse import quote
from urllib.request import urlopen
from bs4 import BeautifulSoup


conn = pymysql.connect(host='18.188.140.138', user='user01', password='1111', db='movies_db', charset='utf8')
cursor = conn.cursor()

sql = "SELECT * FROM links WHERE link IS NULL" #link가 null인 것만 불러옴

cursor.execute(sql)
mc = cursor.fetchall()


for i in range(len(mc)):
    movieCd = str(mc[i][0])
    title = str(mc[i][1])
    query = '영화 '+title

    url = "https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query="+quote(query)

    time.sleep(3)
    req = requests.get(url)
    text = req.text
    soup = BeautifulSoup(text, 'html.parser')

    try:
        link = soup.find('a',"area_text_title")['href']
        print(title)
        print(link)
        sql = 'UPDATE links SET link = "'+link+'" WHERE content_id = "'+movieCd+'"'
        cursor.execute(sql)
    except:
        try:
            S_link = soup.find('a',"box_link")['href']
            url = 'https://search.naver.com/search.naver'+S_link
            #print(url)
            req = requests.get(url)
            text = req.text
            soup = BeautifulSoup(text, 'html.parser')

            link = soup.find('a',"area_text_title")['href']
            print(title)
            print(link)
            sql = 'UPDATE links SET link = "'+link+'" WHERE content_id = "'+movieCd+'"'
            cursor.execute(sql)
        except:
            try:
                S_link = soup.find('div',"answer_more").find('a')['href']
                url = 'https://search.naver.com/search.naver'+S_link
                #print(url)
                req = requests.get(url)
                text = req.text
                soup = BeautifulSoup(text, 'html.parser')

                link = soup.find('a',"area_text_title")['href']
                print(title)
                print(link)
                sql = 'UPDATE links SET link = "'+link+'" WHERE content_id = "'+movieCd+'"'
                cursor.execute(sql)
            except:
                pass

    
conn.commit() 

conn.close() 
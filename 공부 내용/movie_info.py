import requests
import json
import datetime
import pymysql 
from datetime import datetime
from urllib.parse import quote
from urllib.request import urlopen
from bs4 import BeautifulSoup


#네이버 영화 API 키 값
client_id = "h5M2JZomYznCLDAYrUQa"
client_secret = "ZfIJZaWGOl"

conn = pymysql.connect(host='localhost', user='root', password='root', db='moviedata', charset='utf8') 
cursor = conn.cursor() 

sql = "SELECT * FROM movies"

cursor.execute(sql)
mc = cursor.fetchall()

l = []
new_list = []
for i in range(len(mc)):
    movie = mc[i][1]
    #print (movie)
    header_parms ={"X-Naver-Client-Id":client_id,"X-Naver-Client-Secret":client_secret}
    url = f"https://openapi.naver.com/v1/search/movie.json?query={quote(movie)}"
    res=requests.get(url,headers=header_parms)
    data =res.json()
    
    #print(data)
    #print()
    #print()

    
    titles=[]
    links=[]
    images=[]
    dates=[]
    directors=[]
    actors=[]
    ratings=[]
    summary=[]

    for i in data['items']:
        #print(i)
        if (i['title'].strip('</b>').replace('<b>','').replace('</b>','') == movie): #똑같은 제목의 영화만
            if(i['image']): #이미지가 있는 영화만
                if(i['pubDate']>='1970'): #1970년 이후 제작된 영화만
                    res = requests.get(i['link'])
                    soup = BeautifulSoup(res.content, 'html.parser')
                    naver = soup.find("p", class_="con_tx") #줄거리 불러옴
                    if(naver): #줄거리가 있는 영화만
                        naver = re.sub('[^\da-zA-Z가-힣/. ]', '', naver.text).strip()
                        summary.append(naver)
                        titles.append(i['title'].strip('</b>').replace('<b>','').replace('</b>',''))
                        links.append(i['link'])
                        images.append(i['image'])
                        dates.append(i['pubDate'])
                        directors.append(i['director'].split('|')[0])
                        actors.append(i['actor'])
                        #배우들 리스트 그대로 안넣어져서 일단 문자열로 db에 저장
                        ratings.append(float(i['userRating']))

    for j in range(len(titles)):
        l.append([titles[j], links[j], images[j], dates[j], directors[j], actors[j], ratings[j], summary[j]])


for v in l:
    if v not in new_list:
        new_list.append(v)
print(new_list)

sql = "INSERT INTO movieinfo (title, link, image, date, director, actors, rating) VALUES (%s, %s, %s, %s, %s, %s, %s)"


#for b in new_list:
    #print(b)
    #cursor.execute(sql,b)

conn.commit()
conn.close()

import pandas as pd
pd.DataFrame(new_list, columns=['영화 제목','네이버 링크','포스터','개봉 년도','감독','출연진','평점','줄거리'])

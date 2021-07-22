import requests
import json
import datetime
import pymysql 
from datetime import datetime

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
    moviee = mc[i][1].replace('#','%23')
    #영화이름에 #있으면 16진수로 바꿔서 query에 넣어서 검색
    print (movie)
    header_parms ={"X-Naver-Client-Id":client_id,"X-Naver-Client-Secret":client_secret}
    url = f"https://openapi.naver.com/v1/search/movie.json?query={moviee}"
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

    for i in data['items']:
        print(i)
        if (i['title'].strip('</b>').replace('<b>','').replace('</b>','') == movie):
            titles.append(i['title'].strip('</b>').replace('<b>','').replace('</b>',''))
            links.append(i['link'])
            images.append(i['image'])
            dates.append(i['pubDate'])
            directors.append(i['director'].split('|')[0])
            actors.append(i['actor'])
            #배우들 리스트 그대로 안넣어져서 일단 문자열로 db에 저장
            ratings.append(float(i['userRating']))
        
    for j in range(len(titles)):
        l.append([titles[j], links[j], images[j], dates[j], directors[j], actors[j], ratings[j]])


for v in l:
    if v not in new_list:
        new_list.append(v)
#print(new_list)

sql = "INSERT INTO movieinfo (title, link, image, date, director, actors, rating) VALUES (%s, %s, %s, %s, %s, %s, %s)"


for b in new_list:
    print(b)
    cursor.execute(sql,b)

conn.commit()
conn.close()

#import pandas as pd
#pd.DataFrame(new_list, columns=['영화 제목','네이버 링크','포스터','개봉 년도','감독','출연진','평점'])

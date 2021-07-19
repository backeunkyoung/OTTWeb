import requests
import json
import datetime
import pymysql 

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
    header_parms ={"X-Naver-Client-Id":client_id,"X-Naver-Client-Secret":client_secret}
    url = f"https://openapi.naver.com/v1/search/movie.json?query={movie}"
    res=requests.get(url,headers=header_parms)
    data =res.json()
    
    print(data)

    
    titles=[]
    links=[]
    dates=[]
    directors=[]
    actors=[]
    ratings=[]

    for i in data['items']:
        titles.append(i['title'].strip('</b>').replace('<b>','').replace('</b>',''))
        links.append(i['link'])
        dates.append(i['pubDate'])
        directors.append(i['director'].split('|')[0])
        actors.append(i['actor'].split('|')[:-1])
        ratings.append(float(i['userRating']))
        
    for j in range(len(titles)):
        l.append([titles[j], links[j], dates[j], directors[j], actors[j], ratings[j]])
    
    
    #데이터 전처리
    #title=data['items'][0]['title'].strip('</b>')
    #link=data['items'][0]['link']
    #image=data['items'][0]['image']
    #date=data['items'][0]['pubDate']
    #director=data['items'][0]['director'].split('|')[0]
    #actors=data['items'][0]['actor'].split('|')[:-1]
    #rating=float(data['items'][0]['userRating'])
    
    #l.append([title, link, image, date, director, actors, rating])

for v in l:
    if v not in new_list:
        new_list.append(v)
print(new_list)

conn.commit() 
conn.close()
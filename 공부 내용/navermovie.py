import requests
import json
import datetime
import pymysql 

movie='연애'
header_parms ={"X-Naver-Client-Id":client_id,"X-Naver-Client-Secret":client_secret}
url = f"https://openapi.naver.com/v1/search/movie.json?query={movie}&genre=5&display=100"
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
    
df2=pd.DataFrame([titles,links,dates,directors,actors,ratings]).T
df2.columns=['영화 제목','네이버 링크','개봉 년도','감독','출연진','평점']

df2
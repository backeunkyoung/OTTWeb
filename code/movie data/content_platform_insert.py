#####content_platform 테이블
import pymysql

conn = pymysql.connect(host='18.188.140.138', user='user01', password=password, db='movies_db', charset='utf8') 
cursor = conn.cursor()

sql = "SELECT content_pid, title, platform FROM platform WHERE platform IS NOT NULL"

cursor.execute(sql)
mc = cursor.fetchall()


for i in range(len(mc)):
    print(i)
    movieCd = mc[i][0] #무비코드 받아옴
    platform_list = mc[i][2].split(', ')
    
    for j in range(len(platform_list)): #검색할 무비코드랑 영화인 필모의 무비코드 비교
        platform = platform_list[j]
        print('영화:'+mc[i][1]+' 플랫폼:'+platform)
        l = [int(movieCd),platform]
        sql = "INSERT INTO content_platform (content_pid, platform) VALUES (%s, %s)"
        try:
            cursor.execute(sql,l)
        except:
            print('안들어감')
            pass
    
    
conn.commit()
conn.close()
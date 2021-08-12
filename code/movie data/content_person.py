#content_person 수정 후
import pymysql

#conn = pymysql.connect(host='18.188.140.138', user='user01', password='1111', db='movies_db', charset='utf8') 
cursor = conn.cursor()

sql = "SELECT content_id FROM contents"

cursor.execute(sql)
mc = cursor.fetchall()


sql = "SELECT * FROM person"

cursor.execute(sql)
pc = cursor.fetchall()


for i in range(len(mc)):
    print(i)
    movieCd = str(mc[i][0]) #무비코드 받아옴 비교를 위해 문자열로 변환
    
    for j in range(len(pc)): #검색할 무비코드랑 영화인 필모의 무비코드 비교
        if movieCd in pc[j][2]: #영화인 필모에 무비코드 있으면 content_person테이블에 row추가 해야함
            person = pc[j][0]
            print('영화:'+movieCd+' 배우번호:'+person+' 이름:'+pc[j][1])
            l = [mc[i][0],person]
            sql = "INSERT INTO contents_persons (content_pid, person_pid) VALUES (%s, %s)"
            try:
                cursor.execute(sql,l)
            except:
                print('안들어감')
                pass
    
    
conn.commit()
conn.close()
#content_person
import pymysql

conn = pymysql.connect(host='18.188.140.138', user='user01', password='1111', db='movies_db', charset='utf8') 
#conn = pymysql.connect(host='localhost', user='root', password='root', db='moviedata', charset='utf8') 
cursor = conn.cursor()

sql = "SELECT content_id FROM contents"

cursor.execute(sql)
mc = cursor.fetchall()


sql = "SELECT * FROM person"

cursor.execute(sql)
pc = cursor.fetchall()

sql = "INSERT INTO contents_persons (content_pid, person_pid) VALUES (%s, %s)"

CnP = []
for i in range(len(mc)):
    print(i)
    l = ''
    movieCd = str(mc[i][0]) #무비코드 받아옴
    
    count = 0
    for j in range(len(pc)): #검색할 무비코드랑 영화인 필모의 무비코드 비교
        if movieCd in pc[j][2]: #영화인 필모에 무비코드 있으면 문자열에 추가
            l += pc[j][0]+', '
            count += 1
            print(pc[j][1])
        if count==30: #30명 이상이면 30명까지만 받음
            count = 0
            break
    l = l.rstrip(', ')
    print(l)
    
    CnP.append([movieCd, l])
    
    
for k in CnP:
    try:
        cursor.execute(sql,k)
        print(k)
    except:
        #print('안들어감')
        pass
    
    
conn.commit()
conn.close()
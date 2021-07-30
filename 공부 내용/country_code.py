#content_person
import pymysql

conn = pymysql.connect(host='18.188.140.138', user='user01', password='1111', db='movies_db', charset='utf8') 
#conn = pymysql.connect(host='localhost', user='root', password='root', db='moviedata', charset='utf8') 
cursor = conn.cursor()

sql = "SELECT content_id, production_country  FROM contents"

cursor.execute(sql)
mc = cursor.fetchall()


sql = "SELECT * FROM production_countrys"

cursor.execute(sql)
pc = cursor.fetchall()



for i in range(len(mc)):
    #print(i)
    movieCd = str(mc[i][0]) #무비코드 받아옴
    country = mc[i][1].split(',') #국가이름 받아옴

    for k in range(len(country)):
        #print(k)
        check = 0
        for j in range(len(pc)): #국가이름을 코드로 치환
            print(country[k]+'=='+pc[j][1])
            if country[k] == pc[j][1]:
                country[k] = pc[j][0]
                check = 1
                break
        if check == 0: #국가 테이블에 없는 국가는 기타(ee)로 저장됨
            country[k] = 'ee'
        
    print(country) 

    #sql = 'UPDATE contents SET production_country = "'+country+'" WHERE content_id = "'+movieCd+'"'
    #try:
        #cursor.execute(sql)
    #except:
     #   print('안들어감')
      #  pass
    
    
conn.commit()
conn.close()
##영화를 서비스하는 플랫폼이 사라졌을때 content_platform row 삭제하는 코드
import pymysql

conn = pymysql.connect(host='18.188.140.138', user='user01', password=password, db='movies_db', charset='utf8')
cursor = conn.cursor()

##제공하는 플랫폼이 하나도 없는 영화
sql = "SELECT content_pid, title FROM platform WHERE platform IS NULL"

cursor.execute(sql)
n_list = cursor.fetchall()

for i in range(len(n_list)):
    #print(i)
    movieCd = n_list[i][0] #무비코드 받아옴
    title = n_list[i][1] #영화제목
    
    #content_platform테이블에 영화가 있으면 행 삭제
    sql = "DELETE FROM content_platform WHERE content_pid = '"+movieCd+"'"
    try:
        if cursor.execute(sql):
            cursor.execute(sql)
            print(title)
    except:
        print('삭제 안 됨')
        pass
        
##제공하는 플랫폼이 하나 이상인 영화
sql = "SELECT content_pid, title, platform FROM platform WHERE platform IS NOT NULL"

cursor.execute(sql)
nn_list = cursor.fetchall()
#print(nn_list)

for i in range(len(nn_list)):
    #print(i)
    movieCd = nn_list[i][0] #무비코드
    title = nn_list[i][1] #영화제목
    pla_list = nn_list[i][2] #플랫폼목록
    #print(title)
    s_sql = "SELECT * FROM content_platform WHERE content_pid = '"+movieCd+"'"
    
    cursor.execute(s_sql)
    platform_row = cursor.fetchall()
    #print(platform_row)
    for j in range(len(platform_row)):
        #print(platform_row[j][1])
        if platform_row[j][1] not in pla_list: #platform열에 없는 플랫폼이 있으면 행 삭제
            print(platform_row[j][1]+'없음')
            d_sql = "DELETE FROM content_platform WHERE content_pid = '"+movieCd+"' AND platform = '"+platform_row[j][1]+"'"
            try:
                if cursor.execute(d_sql):
                    cursor.execute(d_sql)
                    print(title)
            except:
                print('삭제 안 됨')
                pass

conn.commit()
conn.close()

##영화를 서비스하는 플랫폼이 사라졌을때 content_platform row 삭제하는 코드
import pymysql

conn = pymysql.connect(host='18.188.140.138', user='user01', password=password, db='movies_db', charset='utf8') 
cursor = conn.cursor()

##제공하는 플랫폼이 하나도 없는 영화
sql = "SELECT content_pid, title FROM platform WHERE platform IS NULL" #제공하는 플랫폼이 없는 영화만

cursor.execute(sql)
n_list = cursor.fetchall()

for i in range(len(n_list)):
    #print(i)
    movieCd = n_list[i][0] #무비코드 받아옴
    title = n_list[i][1] #영화제목
    
    sql = "DELETE FROM content_platform WHERE content_pid = '"+movieCd+"'"
    try:
        if cursor.execute(sql):
            cursor.execute(sql)
            print(title)
    except:
        print('삭제 안 됨')
        pass
        
##제공하는 플랫폼이 하나 이상인 영화
sql = "SELECT content_pid, title, platform FROM platform WHERE platform IS NOT NULL" #제공하는 플랫폼이 있는 영화만

cursor.execute(sql)
nn_list = cursor.fetchall()

for i in range(len(nn_list)):
    #print(i)
    movieCd = nn_list[i][0] #무비코드
    title = nn_list[i][1] #영화제목
    pla_list = nn_list[i][2] #플랫폼목록
    #print(title)
    sql = "SELECT platform FROM content_platform WHERE content_pid = '"+movieCd+"'"
    
    cursor.execute(sql)
    platform_row = cursor.fetchall()
    
    for j in platform_row[0]:
        if j not in pla_list:
            sql = "DELETE FROM content_platform WHERE content_pid = '"+movieCd+"' AND platform = '"+j+"'"
            try:
                if cursor.execute(sql):
                    cursor.execute(sql)
                    print(title)
            except:
                print('삭제 안 됨')
                pass
            
conn.commit()
conn.close()
"C:\Python\Python39\python.exe" "C:\Users\USER\Documents\OTTWeb\code\get data\n_list.py" rem 영화 목록, 영화배우 목록
timeout /t 60 rem 60초씩 지연
"C:\Python\Python39\python.exe" "C:\Users\USER\Documents\OTTWeb\code\get data\n_links_url.py" rem 영화 link url
timeout /t 60
"C:\Python\Python39\python.exe" "C:\Users\USER\Documents\OTTWeb\code\get data\n_contents_info.py" rem 영화 상세정보 (국가, 장르, 연령제한, 감독)
timeout /t 60
"C:\Python\Python39\python.exe" "C:\Users\USER\Documents\OTTWeb\code\get data\n_contents_summary.py" rem 영화 줄거리
timeout /t 60
"C:\Python\Python39\python.exe" "C:\Users\USER\Documents\OTTWeb\code\get data\n_contents_poster.py" rem 영화 포스터
timeout /t 60
"C:\Python\Python39\python.exe" "C:\Users\USER\Documents\OTTWeb\code\get data\n_person_filmo.py" rem 영화 배우 필모리스트
timeout /t 60
"C:\Python\Python39\python.exe" "C:\Users\USER\Documents\OTTWeb\code\get data\n_contents_person.py" rem 영화-배우리스트

pause
from selenium import webdriver
import time
import pymysql
from selenium.webdriver.chrome.options import Options

chromedriver = 'C:/Users/tpdms/PycharmProjects/pythonProject9/chromedriver.exe'

chrome_options = Options()
#chrome_options.add_argument('--headless')
driver = webdriver.Chrome(options=chrome_options)

driver.get('http://www.cgv.co.kr/movies/pre-movies.aspx')
conn = pymysql.connect(host='18.188.140.138', user='user01', password='dkapflzksh0405', charset='utf8', db='movies_db') #DB 연결
cursor = conn.cursor()

time.sleep(3)


title = driver.find_element_by_class_name('sect-movie-chart')
title = title.find_elements_by_css_selector('div.box-contents > a')
date = driver.find_elements_by_css_selector('span.txt-info > strong')

sql2 = "DELETE FROM release_movie"
cursor.execute(sql2)

sql = "REPLACE INTO release_movie(movie,date) VALUES (%s, %s)"


for x,y in zip(title,date):
    title = x.text
    tmp = y.text
    date = tmp.split(' ')[0]
    cursor.execute(sql,(title,date))

conn.commit()
conn.close()
driver.quit()
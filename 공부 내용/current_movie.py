from selenium import webdriver
import time
import pymysql
from selenium.webdriver.chrome.options import Options

chromedriver = 'C:/Users/tpdms/PycharmProjects/pythonProject9/chromedriver.exe'

chrome_options = Options()
chrome_options.add_argument('--headless')
driver = webdriver.Chrome(options=chrome_options)

driver.get('http://www.cgv.co.kr/movies/')
driver.find_element_by_xpath('//*[@id="contents"]/div[1]/div[3]/button').click()
conn = pymysql.connect(host='18.188.140.138', user='user01', password='dkapflzksh0405', charset='utf8', db='movies_db') #DB 연결
cursor = conn.cursor()

time.sleep(3)


title = driver.find_element_by_class_name('sect-movie-chart')
title = title.find_elements_by_css_selector('div.box-contents > a')

sql = "INSERT INTO current_movie(movie) VALUES (%s)"
sql2 = "DELETE FROM current_movie"
cursor.execute(sql2)

for x in title:
    title = x.text
    cursor.execute(sql,title)
    print(title)

conn.commit()
conn.close()
driver.quit()
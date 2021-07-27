from selenium import webdriver
import time
import pymysql
from selenium.webdriver.chrome.options import Options

chromedriver = 'C:/Users/tpdms/PycharmProjects/pythonProject9/chromedriver.exe'

chrome_options = Options()
chrome_options.add_argument('--headless')
driver = webdriver.Chrome(options=chrome_options)


driver.get('https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=%EB%B0%95%EC%8A%A4%EC%98%A4%ED%94%BC%EC%8A%A4%EC%88%9C%EC%9C%84')
conn = pymysql.connect(host='18.188.140.138', user='user01', password='1111', charset='utf8', db='movies_db') #DB 연결
cursor = conn.cursor()

time.sleep(1)

title = driver.find_element_by_class_name('_panel')
num = driver.find_elements_by_class_name('this_text')
title = title.find_elements_by_class_name('name')


sql = "UPDATE boxoffice SET title = %s WHERE num = %s"
for name, n in zip(title, num):
    num = n.text
    title = name.text
    cursor.execute(sql,(title,num))
    print(num + "위 : " + title)

conn.commit()
conn.close()
driver.quit()
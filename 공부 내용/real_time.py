from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time,datetime
import pymysql
import requests


conn = pymysql.connect(host='18.188.140.138', user='user01', password='1111', charset='utf8', db='movies_db') #DB 연결
cursor = conn.cursor()


URL = "https://www.naver.com/"
driver_path = r'C:/Users/tpdms/PycharmProjects/pythonProject9/chromedriver.exe'
driver = webdriver.Chrome(driver_path)
driver.get(URL)
driver.find_element_by_id('query').send_keys('박스오피스순위')
driver.find_element_by_id('search_btn').click()
time.sleep(1)

title = driver.find_element_by_class_name('_panel')
num = driver.find_elements_by_class_name('this_text')
title = title.find_elements_by_class_name('name')

sql = "INSERT INTO boxoffice (num,title) VALUES ('%s' ,' %s')"
for name, n in zip(title, num):
    num = n
    title = name.text
    cursor.execute(sql,num,title)
    print(num + "위 : " + title)



cursor.commit()
conn.close()
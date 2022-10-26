#!/usr/bin/python
# -*- coding: UTF-8 -*-

from os import name
from os.path import exists as file_exists
from bs4 import BeautifulSoup
from lxml import etree
import urllib3 as urllib
import time
import csv
from trend import Trend
from trendStore import TrendStore
import re
import requests

CSV_FILE_PATH_PATTERN = "./result/result{date}.csv"
CSV_HEADER = ['Time',
              'No.',
              'Content',
              'Hotness']
CSV_BLANK_ROW = ['', '', '', '']
ROOT_XPATH = "/html/body/div[4]/main/div[3]/div/div[2]"
REQ_HEADERS = ({'User-Agent':
			'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 \
			(KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',\
			'Accept-Language': 'en-US, en;q=0.5'})
SLEEP_SECS = 10 # 60
LOCAL_TIME = time.localtime()
# print(CHROME_DRIVER_PATH)
myConfig = {}
myConfig['dbname'] = "ghtrends1" # "demo"
myConfig['date'] = time.strftime("%Y%m%d", LOCAL_TIME)
myConfig['host'] = "127.0.0.7" #"localhost"
myConfig['port'] = 3209 # 3306
myConfig['user'] = "doitall"
myConfig['password'] = "fromhereto123"

class weiboHotLineSpider:
    def __init__(self, store):
        self.csvRows = []
        self.hotlines = []
        self.nowStamp = ""
        self.dateStamp = ""
        self.timeStamp = 0
        self.csvName = "test.csv"
        self.trends = []
        self.store = store
        return

    def writeCSV(self):
        # print(f'--开始写入{self.csvName}文件的操作--')
        hasFile = False
        if file_exists(self.csvName):
            hasFile = True
        with open(self.csvName,'a+', encoding='UTF-8', newline='')as f:
            f_csv = csv.writer(f)
            if not hasFile:
                # f_csv.writerow(CSV_BLANK_ROW)
                f_csv.writerow(CSV_HEADER)
            f_csv.writerows(self.csvRows)
            # print(self.csvRows)
        print(f'++已完成写入{self.csvName}文件的操作++')
    
    def getContent(self):
        pass
        try:
            self.nowStamp = time.strftime("%Y-%m-%d %H:%M:%S", LOCAL_TIME)
            self.dateStamp = time.strftime("%Y%m%d", LOCAL_TIME)
            self.timeStamp = int(time.strftime("%H%M", LOCAL_TIME))
            self.csvName = CSV_FILE_PATH_PATTERN.format(date = self.dateStamp)
            print("\nWork Log at " + self.nowStamp + " .\n")
            url = "http://www.github.com/trending"
            
            webpage = requests.get(url, headers=REQ_HEADERS)
            print("Get Already!") # Let the user actually see something!
            time.sleep(SLEEP_SECS)
            print("Finish sleeping! - 1")
            soup = BeautifulSoup(webpage.content, "html.parser")
            dom = etree.HTML(str(soup))
            articles = dom.xpath('//article[@class="Box-row"]')
            if not (articles == None):
                self.hotlines = articles
                print("WE FOUND DIV OF NUM - {}\n".format(len(self.hotlines)))
            else :
                print("ERROR! HOTLINES LESS THAN 1\n")
        except NoSuchElementException:
            print("Error Log: \n" + time.strftime("%Y-%m-%d %H:%M:%S", LOCAL_TIME) + " Failed to fetch data.\n\n")
            pass
        except WebDriverException:
            print("Web Driver Exception!")

    def dealHotnessString(self, inputStr):
        # naiiveStr = inputStr.replace(",", "").replace('"', '').replace(" ", "")
        naiiveStrs = re.findall(r'[0-9]+', inputStr)
        return ''.join(naiiveStrs)


    def dealContent(self):
        try:
            if len(self.hotlines) > 0:
                self.csvRows = []
                self.trends = []
                self.csvRows.append([self.nowStamp, '', '', ''])
                index = 1
                try:
                    #hotpots = self.hotlines[0].find_elements(By.TAG_NAME, "tr")
                    for article in self.hotlines:
                        if (index > 30):
                            break
                        indexStr = "{0}".format(index)
                        titleStr = "---"
                        hotnessStr = "0"
                        
                        atag = article.xpath('./h1/a')
                        startTag = article.xpath('./div')[1].xpath('./a')
                        
                        if (len(atag) > 0 and len(startTag) > 0):
                            titleStr = (''.join(atag[0].itertext())).strip().replace(' ', '').replace('\n', '')
                            hotnessStr = self.dealHotnessString((''.join(startTag[0].itertext())).strip().replace(' ', '').replace('\n', ''))

                            tmpRow = []
                            tmpRow.append("") # tmpRow.append(nowStamp)
                            tmpRow.append(indexStr) # 1 - Index
                            tmpRow.append(titleStr) # 2 - Title
                            tmpRow.append(hotnessStr) # 3 - Star
                            self.csvRows.append(tmpRow)

                            trend = Trend(indexStr, titleStr, hotnessStr)
                            self.trends.append(trend)
                        index += 1
                except NoSuchElementException:
                    print("Fetch ERROR! Happening on index - {}".format(1352))
                    pass
                finally:
                    self.writeCSV()
                    pass
            else:
                print("Error Log Empty 0: \n" + time.strftime("%Y-%m-%d %H:%M:%S", LOCAL_TIME) + " Failed to fetch data.\n\n")

        except NoSuchElementException:
            print('ERROR: NoSuchElementException')
            
    
    def storeContent(self):
        try:
            self.store.operate(self.trends, self.timeStamp)
        finally:
            pass

    def run(self):
        try:
            self.getContent()
            self.dealContent()
            self.storeContent()
        finally:
            pass

# driver = webdriver.Chrome()  # Optional argument, if not specified will search path.

# driver.quit()

if __name__ == "__main__":

    try:
        myStore = TrendStore(myConfig)
        mySpider = weiboHotLineSpider(myStore)
        mySpider.run()
    except NoSuchElementException:
        print("Something weird happened.")
        pass
    finally:
        pass
        # browser.quit()
        # print("Quit the browser anyway.")

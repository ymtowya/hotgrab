from os import name
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException, WebDriverException
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time
import csv
from trend import Trend
from trendStore import TrendStore
import re

CSV_FILE_PATH_PATTERN = "./result/result{date}.csv"
CSV_HEADER = ['Time',
              'No.',
              'Content',
              'Hotness']
CSV_BLANK_ROW = ['', '', '', '']
# /html/body/div[1]/div[2]/div/div[2]/div[1]/table/tbody/tr[4]/td[2]/a
# /html/body/div[1]/div[2]/div[2]/table/tbody/tr[5]/td[2]/a
# /html/body/div[1]/div[2]/div/div[2]/div[1]/table/tbody/tr[16]/td[2]/a
# /html/body/div[1]/div[2]/div/div[2]/div[1]/table/tbody/tr[34]/td[2]/a
# /html/body/div[1]/div[2]/div/div[2]/div[1]/table/tbody
# /html/body/div/div/div/div[2]/main/div/div/div/div/div/div[3]/div/section/div/div
ROOT_XPATH = "/html/body/div[1]/div/div/div[2]/main/div/div/div/div/div/div[3]/div/section/div/div"
# "/usr/local/bin/chromedriver"
# "/home/ubuntu/proj/chrome/chromedriver"
# "/usr/bin/chromedriver"
# "C:/Program Files/Google/Chrome/Application/chromedriver.exe"
# "E:\\proj\\grab\\chromedriver\\chromedriver.exe"
# "C:\\Program Files\\Google\\Chrome\\Application\\chromedriver.exe"
CHROME_DRIVER_PATH = ".\\helper\\chromedriver\\chromedriver.exe"
CHROME_SERVICE = Service(CHROME_DRIVER_PATH)
SLEEP_SECS = 50 # 60
LOCAL_TIME = time.localtime()
print(CHROME_DRIVER_PATH)
myConfig = {}
myConfig['dbname'] = "weibotrends" # "demo"
myConfig['date'] = time.strftime("%Y%m%d", LOCAL_TIME)
myConfig['host'] = "localhost"
myConfig['port'] = 3307 # 3306
myConfig['user'] = "towya"
myConfig['password'] = "123456"

class weiboHotLineSpider:
    def __init__(self, browser, store):
        self.browser = browser
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
        with open(self.csvName,'a+', encoding='UTF-8', newline='')as f:
            f_csv = csv.writer(f)
            f_csv.writerow(CSV_BLANK_ROW)
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
            driver = self.browser
            driver.get('https://twitter.com/explore/tabs/trending')
            print("\nWork Log at " + self.nowStamp + " .\n")
            print("Get Already!") # Let the user actually see something!
            time.sleep(SLEEP_SECS)
            tmpHotlines = driver.find_elements(By.XPATH, ROOT_XPATH)
            print("HOTLINES - {}".format(len(tmpHotlines)))
            if (len(tmpHotlines) > 0):
                self.hotlines = tmpHotlines[0].find_elements(By.XPATH, ".//div[contains(@data-testid,\"cellInnerDiv\")]") 
                # driver.execute_script("window.scrollBy(0, 10000);")
                # time.sleep(5)
                # tmpHotLines2 = tmpHotlines[0].find_elements(By.XPATH, "//div[contains(@data-testid,\"cellInnerDiv\")]")
                # self.hotlines.extend(tmpHotLines2[-6:])
                print("WE FOUND DIV OF NUM - {}\n".format(len(self.hotlines)))
            else :
                print("ERROR! HOTLINES LESS THAN 1\n")
        except NoSuchElementException:
            print("Error Log: \n" + time.strftime("%Y-%m-%d %H:%M:%S", LOCAL_TIME) + " Failed to fetch data.\n\n")
            pass
        except WebDriverException:
            print("Web Driver Exception!")

    def dealHotnessString(self, inputStr):
        return inputStr.replace("Tweets", "").replace('"', '').replace(" ", "")

    def dealContent(self):
        try:
            if len(self.hotlines) > 0:
                self.csvRows = []
                self.trends = []
                self.csvRows.append([self.nowStamp, '', '', ''])
                index = 2
                try:
                    #hotpots = self.hotlines[0].find_elements(By.TAG_NAME, "tr")
                    for hotline in self.hotlines[2:]:
                        if (index > 31):
                            break
                        # hotline = self.browser.find_element(By.XPATH, "/html/body/div/div/div/div[2]/main/div/div/div/div/div/div[3]/div/section/div/div/div[{}]".format(i))
                        # spans = hotline.find_elements(By.TAG_NAME, "span")
                        divs = hotline.find_elements(By.XPATH, ".//div[@dir=\"ltr\"]")
                        # print("WE HAVE DIV NUM - {}\n".format(len(divs)))
                        if (len(divs) > 0):
                            tmpRow = []
                            tmpRow.append("") # tmpRow.append(nowStamp)
                            tmpRow.append("{0}".format(index - 1)) # 1 - Index
                            titleSpan = divs[0].find_elements(By.TAG_NAME, "span")
                            if (len(titleSpan) > 0):
                                tmpRow.append(titleSpan[0].text) # 2 - Title
                            else :
                                tmpRow.append("")
                            if (len(divs) > 1):
                                hotSpan = divs[1].find_elements(By.TAG_NAME, "span")
                                if (len(hotSpan) > 0):
                                    tmpRow.append(self.dealHotnessString(hotSpan[0].text)) # 3 - Hotness
                                    # print(hotSpan[0].text)
                                else :
                                    tmpRow.append("")
                            else:
                                tmpRow.append("")
                            self.csvRows.append(tmpRow)
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
            print('报错：NoSuchElementException')
    
    def storeContent(self):
        try:
            if not self.store.checkTable():
                self.store.createAndLog()
            if self.store.insertTrends(self.trends, self.timeStamp):
                print("INSERT SUCCESS INTO DBs")
        finally:
            pass

    def run(self):
        try:
            self.getContent()
            self.dealContent()
            # self.storeContent()
        finally:
            pass

# driver = webdriver.Chrome()  # Optional argument, if not specified will search path.

# driver.quit()

if __name__ == "__main__":

    try:

        chromeOptions = webdriver.ChromeOptions() 
        chromeOptions.add_experimental_option("prefs", {"profile.managed_default_content_settings.images": 2}) 
        chromeOptions.add_argument("--no-sandbox") 
        chromeOptions.add_argument('--headless')
        chromeOptions.add_argument("--disable-setuid-sandbox") 

        chromeOptions.add_argument("--remote-debugging-port=9222")  # this
        chromeOptions.add_argument("--window-size=2560,14400") # size
        chromeOptions.add_argument("--lang=en")

        chromeOptions.add_argument("--disable-dev-shm-using") 
        chromeOptions.add_argument("--disable-extensions") 
        chromeOptions.add_argument("--disable-gpu")
        chromeOptions.add_argument("start-maximized")
        chromeOptions.add_argument("disable-infobars")
        chromeOptions.headless = True
        # chromeOptions.add_argument(r"user-data-dir=.\cookies\\test") 

        browser = webdriver.Chrome(service=CHROME_SERVICE, options=chromeOptions)
        myStore = TrendStore(myConfig)
        mySpider = weiboHotLineSpider(browser, myStore)
        mySpider.run()
        browser.delete_all_cookies()
    except NoSuchElementException:
        print("Something weird happened.")
        pass
    finally:
        browser.quit()

# //*[@id="pl_top_realtimehot"]/table/tbody/tr[2]/td[2]/a
# /html/body/div[1]/div[2]/div[2]/table/tbody/tr[2]/td[2]/a
# /html/body/div[1]/div[2]/div[2]/table/tbody/tr[3]/td[2]/a
# /html/body/div[1]/div[2]/div[2]/table/tbody/tr[1]

# search_box.send_keys('ChromeDriver')

# search_box.submit()

# #!/usr/bin/python
# # -*- coding: UTF-8 -*-

from bs4 import BeautifulSoup
from lxml import etree
import requests


url = "http://www.github.com/trending"

HEADERS = ({'User-Agent':
			'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 \
			(KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',\
			'Accept-Language': 'en-US, en;q=0.5'})

webpage = requests.get(url, headers=HEADERS)
soup = BeautifulSoup(webpage.content, "html.parser")
dom = etree.HTML(str(soup))
articles = dom.xpath('//article[@class="Box-row"]')
for article in articles:
    atag = article.xpath('./h1/a')
    title = (''.join(atag[0].itertext())).strip().replace(' ', '').replace('\n', '')
    startTag = article.xpath('./div')[1].xpath('./a')
    star = (''.join(startTag[0].itertext())).strip().replace(' ', '').replace('\n', '')
    print(star)
    # print(title)
print(len(articles))
# written = root.xpath("//*[contains(.,'Written By')]/parent::*/*[@class='meta-value']/a/text()")
# written_links = root.xpath(".//*[contains(.,'Written By')]/parent::*/*[@class='meta-value']/a//@href")
# print(directed[0].text)


# from io import StringIO
# import urllib3
# from bs4 import BeautifulSoup
# from lxml import etree

# url = "http://www.github.com/trending"
            
# HEADERS = ({'User-Agent':
#             'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 \
#             (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
#             'Accept-Language': 'en-US, en;q=0.5'})
# http = urllib3.PoolManager()
# res = http.request('GET', url)
# htmlStr = res.data.decode('utf-8')
# dom = etree.parse(htmlStr)
# #webpage = requests.get(url, headers=HEADERS)
# #soup = BeautifulSoup(webpage.content, "html.parser")
# #dom = etree.HTML(str(soup))

# # response1 = urllib2.urlopen(url)
# # http = urllib.PoolManager()
# # response2 = http.request('GET', url)
# # request = urllib.Request(url)
# #模拟Mozilla浏览器进行爬虫
# # request.add_header("user-agent","Mozilla/5.0")
# # response2 = urllib.urlopen(request)
# # print response2.getcode()
# elems = dom.xpath('/html/body/div[5]/main/div[3]/div/div[2]/article[1]/h1/a')
# print(elems[0].text)





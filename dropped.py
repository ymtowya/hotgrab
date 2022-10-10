


//*[@data-testid="cellInnerDiv"]/div/div/div[2]/main/div/div/div/div/div/div[3]/div/section/div/div/div[1]

/html/body/div/div/div/div[2]/main/div/div/div/div/div/div[3]/div/section/div/div/div[27]
/html/body/div/div/div/div[2]/main/div/div/div/div/div/div[3]/div/section/div/div/div[8]
/html/body/div/div/div/div[2]/main/div/div/div/div/div/div[3]/div/section/div/div/div[8]/div/div/div/div/div[1]/div[1]/span
/html/body/div/div/div/div[2]/main/div/div/div/div/div/div[3]/div/section/div/div/div[8]/div/div/div/div/div[1]/div[3]/span
/html/body/div/div/div/div[2]/main/div/div/div/div/div/div[3]/div/section/div/div/div[8]/div/div/div/div/div[2]/span
/html/body/div/div/div/div[2]/main/div/div/div/div/div/div[3]/div/section/div/div/div[9]/div/div/div/div/div[3]/span

/html/body/div/div/div/div[2]/main/div/div/div/div/div/div[3]/div/section/div/div/div[21]/div/div/div/div/div[2]/span
/html/body/div/div/div/div[2]/main/div/div/div/div/div/div[3]/div/section/div/div/div[21]/div/div/div/div/div[2]/span

div[i]->/div/div/div/div/div[1]/div[1]/span
      ->/div/div/div/div/div[1]/div[3]/span
        /div/div/div/div/div[2]/span
        /div/div/div/div/div[3]/span
for hotpot in hotpots:
                        hottds = hotpot.find_elements(By.TAG_NAME, "td")
                        if len(hottds) >= 2:
                            tmpRow = []
                            tmpRow.append('') # tmpRow.append(nowStamp)
                            tmpRow.append(hottds[0].text) # 1
                            hottext = hottds[1].find_element(By.TAG_NAME, "a")
                            tmpRow.append(hottext.text) # 2
                            try:
                                hotness = hottds[1].find_element(By.TAG_NAME, "span")
                                tmpRow.append(hotness.text) # 3
                            except NoSuchElementException:
                                tmpRow.append(' ')
                            finally:
                                pass
                            
                            if hottds[0].text.isdigit():
                                myTrend = Trend(int(hottds[0].text), hottext.text, hotness.text)
                                self.trends.append(myTrend)
                            #self.csvRows.append(tmpRow)

/html/body/div[1]/div/div/div[2]/main/div/div/div/div/div/div[3]/div/section/div/div

/html/body/div[1]/div/div/div[2]/main/div/div/div/div/div/div[3]/div/section/div/div

WE HAVE SPAN NUM - 6
WE HAVE SPAN NUM - 5
WE HAVE SPAN NUM - 5
WE HAVE SPAN NUM - 5
WE HAVE SPAN NUM - 5
WE HAVE SPAN NUM - 4
WE HAVE SPAN NUM - 5
WE HAVE SPAN NUM - 5
WE HAVE SPAN NUM - 5
WE HAVE SPAN NUM - 5
WE HAVE SPAN NUM - 5
WE HAVE SPAN NUM - 5
WE HAVE SPAN NUM - 5
WE HAVE SPAN NUM - 5
WE HAVE SPAN NUM - 4
WE HAVE SPAN NUM - 5
WE HAVE SPAN NUM - 5
WE HAVE SPAN NUM - 5
WE HAVE SPAN NUM - 5
WE HAVE SPAN NUM - 5
WE HAVE SPAN NUM - 0
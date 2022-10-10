import { Link } from "react-router-dom";

function Welcomeboard(props) {
    return (<div>
        <Link to="/">Home </Link><br /><br />
        Kindly press the button 请点击下方按钮 <br />        
        <Link to="year">
            <button className="btn btn-primary">
                Start 开始
            </button>
        </Link>
        <div style={{marginTop: 30 + "px"}}>
                                            
                ReadMe:
                <ul style={{width: "82%"}}>
                    <li key="1">This project aims to record the Hot Topics List on Weibo (Chinese version of 'Twitter Trendings'), in memory of what happened, and in avoidance of clearance.</li>
                    <li key="2">Web crawler is based on Selenium+Webdriver, deployed on the server and run automatically every 15 minutes to crawl the Hot Topic List on Weibo, and store the data in MySQL DB.</li>
                    <li key="3">Seperated F n B Development. Front-end is supported by ReactJs and Echarts, and Back-end by Spring Boot and Mybatis.</li>
                    <li key="4">There may still be bugs existing in the project, thank you for your visit and support.</li>
                    <li key="5">Welcome to contact the author Towya: kaigendo at 126 dot com</li>
                </ul>
                <br />
                开发说明：
                <ul style={{width: "80%"}}>
                    <li key="1">基于Selenium+Webdriver爬虫，部署后每15分钟自动爬取一次热搜列表，并存入MySQL数据库中</li>
                    <li key="2">前后端分离，后端基于Spring Boot, Mybatis，前端基于React, Echarts</li>
                    <li key="3">目前仍有部分bug，感谢您的访问与支持</li>
                    <li key="4">联系作者Towya：kaigendo at 126 dot com</li>                   
                </ul>
            
        </div>
    </div>);
}

export default Welcomeboard;
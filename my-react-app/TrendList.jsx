//import React from "react";

import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Trend from "./trend";
import { useNavigate } from "react-router";
import CommonConfig from "./CommonConfig";

function TrendList(props) {

    function getPostData() {
        let postData = new FormData();
        postData.append("year", props.year);
        postData.append("date", Trend().dateCompose(props.month, props.day));
        postData.append("time", props.time);
        console.log(props.time, props.day);
        return postData;
    }

    const [trends, setTrends] = useState([]);
    const [year, setYear] = useState(props.year);    
    const navigate = useNavigate();

    useEffect(() => {
        const url = CommonConfig().host + CommonConfig().port + "/trends/trends";        
        const pData = getPostData();
        axios.post(url, pData).then((res) => {
            setTrends((trends) => {return (res && res.data) ? res.data : [];});
        }).catch((err) => {
            console.log(err);
        });
    }, [year]);

    const clickTrend = function(event) {
        event.preventDefault();
        event.stopPropagation();
        let clickedTrend = event.target.getAttribute("value");
        // console.log(clickedTrend);
        props.onChangeTrend(clickedTrend);
        navigate("/topic");
    }.bind(this);

    return (
        <div>
            <Link to="/">Home </Link> / <Link to="/year"> Year </Link> / <Link to="/date"> Date </Link> / <Link to="/time"> Time </Link> / List<br />
            <br />
            <table>
                <tbody>
                <tr>
                    <th style={{width: 50 + "px"}}>Index</th>
                    <th>Topic</th>
                    <th>Hotness</th>
                </tr>                
                {trends.map((item, index) => {
                    return (
                            <tr key={index}>
                                <td>
                                    {item.position}
                                </td>
                                <td>
                                    <a href="" onClick={clickTrend} value={item.title}>{item.title}</a>
                                </td>
                                <td>
                                    {item.views}
                                </td>                                                                
                            </tr>)
                })}
                </tbody>
            </table>
        </div>
    );
}

export default TrendList;
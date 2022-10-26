import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Trend from "./trend";
import { useNavigate } from "react-router";
import CommonConfig from "./CommonConfig";


function TimeList(props) {

    const [year, setYear] = useState(props.year);
    const [month, setMonth] = useState(() => props.month);
    const [day, setDay] = useState(() => props.day);
    const [times, setTimes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(month, day);
        // let [nyear, nmonth, nday, ntime] = props.getYMDT();
        // setYear(year => nyear);
        // setMonth(month => nmonth);
        // setDay(day => nday);
        let url = CommonConfig().host + CommonConfig().port + "/trends/times";
        let postData = new FormData();
        postData.append("year", year);
        postData.append("date", Trend().dateCompose(month, day));
        axios.post(url, postData).then((res) => {
            setTimes(times => res ? res.data : []);
        }).catch((err) => {
            console.log(err);
        });
        return () => {setTimes(times => []);};
    }, [year, month, day]);

    function onTimeClick(event) {
        event.preventDefault();
        const timeSelected = event.target.getAttribute("value");
        console.log(timeSelected);
        props.onChangeTime(timeSelected); 
        navigate("/list");
    }

    const getHour = (time) => {
        return Math.floor(time / 100);
    };
    
    const getMinute = (time) => {
        return Math.floor(time % 100);
    };

    const getFormatStr = (value) => {
        if (value < 10){
            return '0' + value;
        }
        return '' + value;
    }

    return (
        <div>
            <Link to="/">Home </Link> / <Link to="/year"> Year </Link> / <Link to="/date"> Date </Link> / Time<br /><br />
            <table>
                <tbody>
                <tr>
                    <th>
                        Time (hh:mm)
                    </th>
                </tr>
                {Array.from(times).map((item, index) => {
                    return (<tr key={index}>
                                <td>
                                    <button className="btn btn-default" value={item} onClick={onTimeClick}>
                                        {getFormatStr(getHour(item))} : {getFormatStr(getMinute(item))}
                                    </button>
                                </td>
                            </tr>);
                })}
                </tbody>
            </table>

        </div>
    );
};

export default TimeList;

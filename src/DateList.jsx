import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import CommonConfig from "./CommonConfig";

function DateList(props) {
    const [yearValue, setYear] = useState(props.year);
    const [dates, setDates] = useState([]);
    //const [month, setMonth] = useState(props.month);
    //const [day, setDay] = useState(() => props.day);
    const [onoff, setOnoff] = useState(false);
    const [changed, setChanged] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setChanged(true);
        console.log(changed);
    }, [yearValue]);

    useEffect(() => {                
        let url = CommonConfig().host + CommonConfig().port + "/trends/dates";
        let postData = new FormData();
        postData.append("year", yearValue);
        axios.post(url, postData).then((res) => {
            setDates(dates => res ? res.data : []);
        }).catch((err) => {
            console.error(err);
        });
        return () => {setDates(dates => []);};
    }, [yearValue]);

    function getMonth(date) {
        return Math.floor(date / 100);
    }

    function getDay(date) {
        return date % 100;
    }

    function changeMonth(monthSelected) {
        props.onChangeMonth(monthSelected);
    }

    function changeDay(daySelected) {
        props.onChangeDay(daySelected);
    }    

    function myDateClick(event) {
        event.preventDefault();
        const clickedValue = event.target.getAttribute("value");
        //setMonth(month => getMonth(clickedValue));
        //setDay(day => getDay(clickedValue));
        props.onChangeMonth(getMonth(clickedValue));
        props.onChangeDay(getDay(clickedValue));
        setOnoff(onoff => ~onoff);          
    }    

    useEffect(() => {        
        if (changed) {
            navigate("/time");
        }
    }, [onoff]);

    return (
        <div>
            <Link to="/">Home</Link> / <Link to="/year">Year</Link> / Date<br /><br />
            {/* <br></br>Year is : {yearValue}; */}
            <table >
                <tbody>
                <tr>
                    <th>
                        Date (MM-dd)
                    </th>
                </tr>
                {dates.map((item, index) => {
                    return (<tr key={index}>
                                <td>
                                    <button className="btn btn-default" href="" onClick={myDateClick} value={item}>
                                        {getMonth(item)} - {getDay(item)}
                                    </button>
                                </td>
                            </tr>);
                })}  
                </tbody>
            </table>
        
        </div>
    );
}

export default DateList;

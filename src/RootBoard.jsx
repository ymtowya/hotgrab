import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Navigate } from "react-router";
import DateList from "./DateList";
import TimeList from "./TimeList";
import TrendList from "./TrendList";
import Welcomeboard from "./Welcomeboard";
import YearList from "./YearList";
import TrendDisplay from "./TrendDisplay";

function RootBoard(props) {

    const [year, setYear] = useState(() => 2021);
    const [month, setMonth] = useState(() => 12);
    const [day, setDay] = useState(() => 4);
    const [time, setTime] = useState(() => 500);
    const [trend, setTrend] = useState(() => "青春环游记");

    //let navigate = useNavigate();

    const myChangeYear = function (yearSelected) {
        setYear(year => yearSelected);
        console.log("Set year to: " + year);
        //navigate("/dateList");
    }.bind(this);

    const myChangeMonth = function (monthSelected) {
        setMonth(month => monthSelected);
        console.log("Set month to: ", month);
    }.bind(this);

    const myChangeDay = function (daySelected) {
        setDay(day => daySelected);
        console.log("Set day to: ", day);
    }.bind(this);

    const myChangeTime = function (timeSelected) {
        setTime(time => timeSelected);
        console.log("Set time to ", time);
    }.bind(this);

    const myChangeTrend = function (trendSelected) {
        setTrend(trend => trendSelected);
        console.log("Set topic to ", trend);
    }.bind(this);

    const getYMDT = function() {        
        return [year, month, day, time];
    }.bind(this);

    return (                               
        <Router>
            <div id="wholeboard">
                <div id="upbgboard">
                    <p> Weibo Hot Topics Record 在这里，记录中国</p>
                </div>
                <div id="routes">
                    <Routes>                        
                        <Route exact path="/" element={<Welcomeboard />}></Route>
                        <Route exact path="/year" element={<YearList year={year} onChangeYear={myChangeYear}/>}></Route>
                        <Route exact path="/date" element={<DateList  year={year} month={month} day={day} 
                                                                onChangeMonth={myChangeMonth}
                                                                onChangeDay={myChangeDay}/>}></Route>
                        <Route exact path="/time" element={<TimeList  year={year} month={month} day={day} time={time}
                                                                getYMDT={getYMDT}
                                                                onChangeTime={myChangeTime}/>}></Route>
                        <Route exact path="/list" element={<TrendList year={year} month={month} day={day} time={time}
                                                                onChangeTrend={myChangeTrend} />}></Route>
                        <Route exact path="/topic" element={<TrendDisplay year={year} month={month} day={day} trendtitle={trend} />} ></Route>
                        <Route path="/*" element={<Navigate to="/" />}></Route>
                    </Routes>                
                </div>
                <div id="dnbgboard">
                    The current y / m / d / t is : <br />
                    {year} / {month} / {day} / {time}
                </div>
            </div>
        </Router>        
    );
}

export default RootBoard;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import CommonConfig from "./CommonConfig";

function YearList(props) {

    const [years, setYears] = useState([]);

    const [yearValue, setYear] = useState(() => props.year);    
    const navigate = useNavigate();

    const myChangeYear = function(e) {
        console.log(yearValue);
        //setYear(yearValue);
        props.onChangeYear(yearValue);
        navigate("/date");        
    };

    const onInputChange = function(e) {
        setYear(yearValue => e.target.value);
        e.stopPropagation();
    };

    const myYearClick = function(event) {
        event.preventDefault();
        let yearSelected = event.target.getAttribute("value");
        props.onChangeYear(yearSelected);
        navigate("/date")
    }

    useEffect(() => {                
        let url = CommonConfig().host + CommonConfig().port + "/trends/years";
        //let postData = new FormData();
        //postData.append("year", yearValue);
        axios.get(url).then((res) => {
            setYears(years => res ? res.data : []);
        }).catch((err) => {
            console.error(err);
        });
        return () => {setYears(years => []);};
    }, [yearValue]);

    return (
        <div>            
            {/* <input value={yearValue} onChange={onInputChange.bind(this)} />
            <button className="col-md-3" onClick={myChangeYear.bind(this)}>Click to The Year!</button>   */}
            <Link to="/">Home</Link> / Year<br/><br />
            <div>
                <table>
                    <tbody>
                    <tr>
                        <th>Year</th>
                    </tr>
                    {years.map((item, index) => {
                            return (    
                                    <tr key={index}>
                                        <td>
                                            <button type="button" className="btn btn-default" onClick={myYearClick} value={item}>
                                                {item}年
                                            </button>
                                        </td>
                                    </tr>                                        
                                    );
                        })}
                    </tbody>
                </table>
            </div>  
        </div>
    );
}

export default YearList;
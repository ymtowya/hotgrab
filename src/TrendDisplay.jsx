import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommonConfig from "./CommonConfig";
import Trend from "./trend";
var echarts = require('echarts');

function TrendDisplay(props) {

    const CHART_ID = "main_chart";
    const [trendTitle, setTitle] = useState(props.trendtitle);
    const [year, setYear] = useState(props.year);
    const [month, setMonth] = useState(props.month);
    const [day, setDay] = useState(props.day);
    const [x_data, setXData] = useState([0,1]);
    const [y_data, setYData] = useState([0,1]);
    const [option, setMyOption] = useState({});

    useEffect(() => {
        setMyOption(option => getOption());
    }, [x_data, y_data]);

    useEffect(() => {
        let mychart = echarts.init(document.getElementById(CHART_ID));
        // let option = getOption();
        // step 5:设置图表配置项。使用刚指定的配置项和数据显示图表
	    mychart.setOption(option);
        return () => {mychart.clear();}
    }, [option]);

    useEffect(() => {
        let postData = new FormData();
        postData.append("year", year);
        postData.append("date", Trend().dateCompose(month, day));
        postData.append("trendName", trendTitle);
        console.log(year);
        const url = CommonConfig().host + CommonConfig().port + "/trends/positions";
        axios.post(url, postData).then((res) => {
            setXData(x_data => {
                return res.data.map(item => item.time);
            });
            setYData(y_data => {
                return res.data.map(item => item.position);
            });
            console.log("X_DATA and Y_DATA updated!");
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [year, month, day, trendTitle]);

    const getOption = () => {
        return {
            title: {
                text: '热搜榜位图',
                subtext: '#' + trendTitle + '#',
            },
            tooltip : {
                show: true,
                trigger: 'axis'
            },
            legend: {
                data:['Index'],
                left: "center"
            },
            toolbox: {
                show : true,
                orient: 'horizontal',
                left: 'right',
                top: 'top',
                color: ['#1e90ff','#22bb22','#4b0082','#d2691e'],
                backgroundColor: 'rgba(0,0,0,0)',  // 工具箱背景颜色
                borderColor: '#ccc',  // 工具箱边框颜色
                borderWidth: 0,  // 工具箱边框线宽
                padding: 5,  // 工具箱内边距
                showTitle: true,
                feature : {
                    //mark: {show: true,title: {mark:'辅助线-开关',markUndo:'辅助线-删除',markClear:'辅助线-清空'},lineStyle:{width:1,color:'#1e90ff',type:'dashed'}},
                    dataZoom:{
                        show:true,title:'数据视图',readOnly:true,
                        lang:['数据视图','美团','刷新'],
                        optionToContent: function(opt){
                            console.log(opt);
                            var axisData = opt.xAxis[0].data;
                            var series = opt.series;
                            var table = '<table style="width:100%;text-align:center"><tbody><tr>'+'<td>时间</td>'+'<td>'+series[0].name+'</td>'+'</tr>';
                            for(var i=0,l=axisData.length;i<l;i++){
                                table += '<tr>'
                                    + '<td>' + axisData[i] + '</td>'
                                    + '<td>' + series[0].data[i] + '</td>'                                    
                                    + '</tr>';
                            }
                            table += '</tbody></table>';
                            return table;
                        }
                    },
                    dataView : {show: true, readOnly: false},
                    // magicType : {show: true, title:{line:'动态类型切换-折线图',bar:'动态类型切换-柱形图', stack:'动态类型切换-堆积',tiled:'动态类型切换-平铺'}, type: ['line', 'bar','stack','tiled']},
                    // restore : {show: true,title:'还原',color:'black'},
                    saveAsImage : {show: true,title:'保存为图片',type:'jpeg',lang:['点击本地保存']}
                }
            },
            //calculable : true,
            // dataZoom:{
            //     show: false,
            //     realtime: true,
            //     start: 20,
            //     end: 80
            // },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap: true, // 类目起始和结束两端空白策略,默认true留空,false则顶头
                    data : function(){                       
                        return x_data.map((item, index) => (Math.floor(item / 100) + ':' + Math.floor(item % 100)));
                    }()
                }
            ],
            yAxis : [
                {
                    max: 50,
                    inverse: true,
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'Index',
                    type:'line',
                    data:function(){                        
                        return y_data;
                    }()
                }            
            ]
        };        
    }
    
    return (<div>
        <Link to="/">Home </Link> / <Link to="/year"> Year </Link> / <Link to="/date"> Date </Link> / <Link to="/time"> Time </Link> / <Link to="/list"> List </Link> / Topic<br />
        <div><h4 className="text-muted">Line Chart of Topic's Number on the hot topic list</h4> </div>
        <div id={CHART_ID} style={{width: 94+"%", height: 500+"px"}}></div>
    </div>);
};

export default TrendDisplay;

/**
 * [
    {
        "id": 21,
        "position": 21,
        "time": 1028,
        "title": null,
        "views": 367814
    },
    {
        "id": 101,
        "position": 7,
        "time": 2235,
        "title": null,
        "views": 648486
    }
]
 */
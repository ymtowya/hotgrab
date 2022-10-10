import { useEffect, useState } from 'react';
var echarts = require('echarts');

/* <HotnessChart xdata={x_data} ydata={y_data} trendtitle={trendTitle}></HotnessChart> */

function HotnessChart(props) {

    const CHART_ID = "main_chart";

    const [trendTitle, setTrendTitle] = useState(props.trendtitle);
    const [x_data, setXData] = useState(props.xdata);
    const [y_data, setYData] = useState(props.ydata);
    const [option, setMyOption] = useState({});

    useEffect(() => {
        setMyOption(option => getOption());
    }, []);

    useEffect(() => {
        let mychart = echarts.init(document.getElementById(CHART_ID));
        // let option = getOption();
        // step 5:设置图表配置项。使用刚指定的配置项和数据显示图表
	    mychart.setOption(option);
        return () => {mychart.clear();}
    }, [option]);

    
		// 图表使用
		// step 4:指定图表的配置项和数据
    const getOption = () => {
        return {
            title: {
                text: trendTitle,
                subtext: '',
            },
            tooltip : {
                show: true,
                trigger: 'axis'
            },
            legend: {
                data:['Hotness'],
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
                    mark: {show: true,title: {mark:'辅助线-开关',markUndo:'辅助线-删除',markClear:'辅助线-清空'},lineStyle:{width:1,color:'#1e90ff',type:'dashed'}},
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
                    magicType : {show: true, title:{line:'动态类型切换-折线图',bar:'动态类型切换-柱形图', stack:'动态类型切换-堆积',tiled:'动态类型切换-平铺'}, type: ['line', 'bar','stack','tiled']},
                    restore : {show: true,title:'还原',color:'black'},
                    saveAsImage : {show: true,title:'保存为图片',type:'jpeg',lang:['点击本地保存']}
                }
            },
            //calculable : true,
            dataZoom:{
                show: false,
                realtime: true,
                start: 20,
                end: 80
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap: true, // 类目起始和结束两端空白策略,默认true留空,false则顶头
                    data : function(){                       
                        return x_data;
                    }()
                }
            ],
            yAxis : [
                {
                    inverse: true,
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'Hotness',
                    type:'line',
                    data:function(){                        
                        return y_data;
                    }()
                }            
            ]
        };        
    }

    return (
        <div>
            <div id={CHART_ID} style={{width: 800+"px", height: 400+"px"}}>
            </div>
        </div>
    );
};

export default HotnessChart;
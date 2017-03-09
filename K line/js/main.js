$().ready(function(){
	$.getJSON("aaa.json",function(json){
	    var a= splitData(json,"A");
	    options(a);
   });
    function splitData(rawData,ticker) {
        var categoryData = [];
        var values = [];
        var volumns = [];
        
        for (var i = 0; i < rawData.length; i++) {
        	if(rawData[i].Ticker===ticker){
        		//将json中yyyymmdd格式的时间转换为yyyy-mm-dd格式
            var dateString = rawData[i].Date;
            var pattern = /(\d{4})(\d{2})(\d{2})/;
            var dateNewType = dateString.replace(pattern, '$1-$2-$3');
            categoryData.push(dateNewType);
            //股价数据，按开盘价，收盘价，最低价和最高价的顺序传入，以一个数组进行包裹
            values.push([rawData[i].Open,rawData[i].Close,rawData[i].Low,rawData[i].High]);
            //销量数据
            volumns.push(rawData[i].Volume);
        	}
            
        }
        return {
            categoryData: categoryData,
            values: values,
            volumns: volumns
        };
    };
    //获取values里面的对应的数据
    function calculate(arr,num){
    	var result = [];
    	for(var i= 0,len=arr.values.length;i<len;i++){
    		result.push(arr.values[i][num]);
    	}
    	return result;
    }
    var main = document.getElementById("main");
    //初始化
    var myChart = echarts.init(main);
    //导入数据
    
    var option = {
    	title:{
    		text:'股票数据'
    	},
    	tooltip:{},
    	legend:{
    		data:['开盘价','收盘价','最低价','最高价'],
    		
    	},
    	xAxis:{
    		data:[]
    	},
    	yAxis:{
    		scale: true,
        splitArea: {
            show: true
        }
    	},
    	dataZoom:[
    	    {
    	    	type:'inside',
    	    	start: 50,
    	    	end:100
    	    },{
    	    	show:true,
    	    	type:'slider',
    	    	y:'90%',
    	    	start: 50,
    	    	end:100
    	    }
    	],
    	series:[{
    		name:'开盘价',
    		type:'line',
    		data:[]
    	},{
    		name:'收盘价',
    		type:'line',
    		data:[]
    	},{
    		name:'最低价',
    		type:'line',
    		data:[]
    	},{
    		name:'最高价',
    		type:'line',
    		data:[]
    	}]
    };
    myChart.setOption(option);
    function options(arg){
    	myChart.setOption({
    		xAxis:{
    			type: 'category',
    		    data:arg.categoryData,
    		    scale: true,
        boundaryGap : false,
        axisLine: {onZero: false},
        splitLine: {show: false},
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax'
    	    },
    	    series:[{
    		    name:'开盘价',
    		    data:calculate(arg,0),
    		    smooth:true,
    		    LinkStyle:{
    		    	normal:{opacity:0.5}
    		    }
    	    },{
    		    name:'收盘价',
    		    data:calculate(arg,1),
    		    smooth:true,
    		    LinkStyle:{
    		    	normal:{opacity:0.5}
    		    }
    	    },{
    		    name:'最低价',
    		    data:calculate(arg,2),
    		    smooth:true,
    		    LinkStyle:{
    		    	normal:{opacity:0.5}
    		    }
    	    },{
    		    name:'最高价',
    		    data:calculate(arg,3),
    		    smooth:true,
    		    LinkStyle:{
    		    	normal:{opacity:0.5}
    		    }
    	    }]
    	})
    }
    
});


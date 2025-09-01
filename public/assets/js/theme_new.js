
var closedVsGoalInit_new = function closedVsGoalInit_new() {
  var ECHART_LINE_TOTAL_SALES_new = '.echart-closed-vs-goal_new';
  var $echartsLineTotalSales_new = document.querySelector(ECHART_LINE_TOTAL_SALES_new);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if ($echartsLineTotalSales_new) {
    // Get options from data attribute
    var userOptions = utils.getData($echartsLineTotalSales_new, 'options');
    var chart = window.echarts.init($echartsLineTotalSales_new);
    var getDefaultOptions = function getDefaultOptions() {
      return {
        color: [utils.getColors().primary, utils.getColors().warning],
        tooltip: {
          trigger: 'axis',
          padding: [7, 10],
          backgroundColor: utils.getGrays()['100'],
          borderColor: utils.getGrays()['300'],
          textStyle: {
            color: utils.getGrays()['1100']
          },
          borderWidth: 1,
          formatter: tooltipFormatter,
          transitionDuration: 0,
          position: function position(pos, params, dom, rect, size) {
            return getPosition(pos, params, dom, rect, size);
          }
        },
        legend: {
          left: 'left',
          data: ['Closed Amount', 'Revenue Date'],
          itemWidth: 10,
          itemHeight: 10,
          borderRadius: 0,
          icon: 'circle',
          inactiveColor: utils.getGrays()['400'],
          textStyle: {
            color: utils.getGrays()['700']
          },
          itemGap: 20
        },
        xAxis: {
          type: 'category',
          name: 'Closed Date',
          nameGap: 50,
          nameLocation: 'center',
          offset: 0,
          nameTextStyle: {
            color: utils.getGrays()['700']
          },
          data: ['2019-06-15', '2019-06-22', '2019-06-29', '2019-07-06', '2019-07-13', '2019-07-20', '2019-07-27', '2019-07-12', '2019-07-03'],
          boundaryGap: false,
          axisPointer: {
            lineStyle: {
              color: utils.getGrays()['300'],
              type: 'dashed'
            }
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: utils.rgbaColor('#000', 0.01),
              type: 'dashed'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: utils.getGrays()['400'],
            formatter: function formatter(value) {
              var date = new Date(value);
              return "".concat(date.getDate(), " ").concat(months[date.getMonth()], " , 21");
            },
            margin: 20
          }
        },
        yAxis: {
          type: 'value',
          name: 'Closed Amount',
          nameGap: 85,
          nameLocation: 'middle',
          nameTextStyle: {
            color: utils.getGrays()['700']
          },
          splitNumber: 3,
          axisPointer: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: utils.getGrays()['200']
            }
          },
          boundaryGap: false,
          axisLabel: {
            show: true,
            color: utils.getGrays()['400'],
            formatter: function formatter(value) {
              return "$".concat(value);
            },
            margin: 15
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [{
          type: 'line',
          name: 'Closed Amount',
          data: [0, 5000, 18000, 40000, 58000, 65000, 90000, 110000, 140000],
          symbolSize: 5,
          symbol: 'circle',
          smooth: false,
          hoverAnimation: true,
          lineStyle: {
            color: utils.rgbaColor(utils.getColor('primary'))
          },
          itemStyle: {
            borderColor: utils.rgbaColor(utils.getColor('primary'), 0.6),
            borderWidth: 2
          }
        }, {
          type: 'line',
          name: 'Revenue Date',
          data: [0, 10000, 24000, 35000, 45000, 53000, 57000, 68000, 79000],
          symbolSize: 5,
          symbol: 'circle',
          smooth: false,
          hoverAnimation: true,
          lineStyle: {
            color: utils.rgbaColor(utils.getColor('warning'))
          },
          itemStyle: {
            borderColor: utils.rgbaColor(utils.getColor('warning'), 0.6),
            borderWidth: 2
          }
        }],
        grid: {
          right: '25px',
          left: '100px',
          bottom: '60px',
          top: '35px'
        }
      };
    };
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

docReady(closedVsGoalInit_new);

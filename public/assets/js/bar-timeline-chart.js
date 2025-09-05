// import utils from '../../../utils';
// import { echartSetOption, tooltipFormatter } from '../echarts-utils';

/* -------------------------------------------------------------------------- */
/*                         Echarts Bar Timeline Chart                         */
/* -------------------------------------------------------------------------- */

// bar-timeline-chart.js
const echartsBarTimelineChartInit = () => {
  const chartEl = document.querySelector('.echart-bar-timeline-chart-example');
  if (!chartEl) return;

  const chart = window.echarts.init(chartEl);
  
  // HTML data-options 읽기
  let htmlOptions = {};
  try {
    const dataset = chartEl.getAttribute('data-options');
    if (dataset) htmlOptions = JSON.parse(dataset);
  } catch (e) {
    console.error('data-options 파싱 오류:', e);
  }
 // 기존 기본 옵션
  const defaultOptions = {
    baseOption: {
      timeline: { axisType: 'category', autoPlay: false, playInterval: 1000, data: [], label: { formatter: s => s } },
      tooltip: {},
      xAxis: [{ type: 'category', data: ['20대','30대','40대','50대','60대'] }],
      yAxis: [{ type: 'value' }],
      series: [
        { name: 'Series 1', type: 'bar', data: [] },
        { name: 'Series 2', type: 'bar', data: [] },
        { name: 'Series 3', type: 'bar', data: [] }
      ]
    },
    options: []
  };

  // ✅ HTML xAxis가 있으면 덮어쓰기
  if (htmlOptions.xAxis && Array.isArray(htmlOptions.xAxis)) {
    defaultOptions.baseOption.xAxis[0].data = htmlOptions.xAxis;
  }

  // HTML options 적용
  if (htmlOptions.options && Array.isArray(htmlOptions.options)) {
    defaultOptions.baseOption.timeline.data = htmlOptions.options.map(opt => opt.title.text);
    defaultOptions.options = htmlOptions.options.map(opt => ({
      ...opt,
      series: opt.series.map((s, i) => ({
        type: 'bar',
        name: defaultOptions.baseOption.series[i].name,
        data: s.data || [],
        barWidth: 15,                  // 막대 두께
        itemStyle: { borderRadius: [8,8,0,0] }  // 둥글게
      }))
    }));
  }

  chart.setOption(defaultOptions);
};

export default echartsBarTimelineChartInit;

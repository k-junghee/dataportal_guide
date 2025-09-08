// import utils from '../../utils';
// import { echartSetOption } from './echarts-utils';


const echartsNumberOfTicketsInit = () => {
  const $numberOfTickets = document.querySelector('.echart-number-of-tickets');

  if ($numberOfTickets) {
    const userOptions = utils.getData($numberOfTickets, 'options');
    const chart = window.echarts.init($numberOfTickets);
    const numberOfTicketsLegend = document.querySelectorAll("[data-number-of-tickets]")

    let xAxisData = ["2020", "2021", "2022", "2023", "2024", "2025"];
    let data1 = [45, 35, 55, 55, 55, 45];
    let data2 = [58, 42, 65, 65, 65, 30];
    let data3 = [38, 25, 42, 42, 42, 45];
    let data4 = [62, 45, 75, 75, 75, 55];
    let data5 = [30, 28, 48, 40, 35, 50]; // 지출액

    const emphasisStyle = {
      itemStyle: {
        shadowColor: utils.rgbaColor(utils.getColor('dark'), 0.3),
        borderRadius: [5, 5, 5, 5]
      }
    };

    const chartColors = [
      utils.getColor('primary'),
      localStorage.getItem('theme') === 'dark' ? '#1E4C88' : '#94BCF1',
      localStorage.getItem('theme') === 'dark' ? '#1A3A64' : '#C0D8F7',
      localStorage.getItem('theme') === 'dark' ? '#225FAE' : '#6AA3ED',
      localStorage.getItem('theme') === 'dark' ? '#357ABD' : '#4FC3F7',
    ];

    const getDefaultOptions = () => ({
      color: chartColors,
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          let year = params.name;
          let label = '';
          switch (params.seriesName) {
            case 'On Hold Tickets': label = '편성액'; break;
            case 'Open Tickets': label = '시도비'; break;
            case 'Due Tickets': label = '국비'; break;
            case 'Unassigned Tickets': label = '예산현액'; break;
            case 'Expense Tickets': label = '지출액'; break;
          }
          return `<strong>${year}년</strong><br/>
                  ${label}: <b>${params.value}억</b>`;
        }
      },
      legend: {
        data: ['편성액', '시도비', '국비', '예산현액', '지출액'],
        show: false
      },
      xAxis: {
        data: xAxisData,
        splitLine: { show: false },
        axisLabel: { color: utils.getGrays()['600'] },
        axisLine: { lineStyle: { color: utils.getGrays()['300'], type: "dashed" } },
        axisTick: { show: false }
      },
      yAxis: {
        splitLine: { lineStyle: { color: utils.getGrays()['300'], type: "dashed" } },
        axisLabel: { color: utils.getGrays()['600'] },
      },
      series: [
        { name: 'On Hold Tickets', type: 'bar', stack: 'one', emphasis: emphasisStyle, data: data1 },
        { name: 'Open Tickets', type: 'bar', stack: 'two', emphasis: emphasisStyle, data: data2 },
        { name: 'Due Tickets', type: 'bar', stack: 'three', emphasis: emphasisStyle, data: data3 },
        { name: 'Unassigned Tickets', type: 'bar', stack: 'four', emphasis: emphasisStyle, data: data4 },
        { name: 'Expense Tickets', type: 'bar', stack: 'five', emphasis: emphasisStyle, data: data5 },
      ],
      itemStyle: {
        borderRadius: [3, 3, 0, 0]
      },
      barWidth: "12px",
      grid: { top: '10%', bottom: 0, left: 0, right: 0, containLabel: true }
    });

    echartSetOption(chart, userOptions, getDefaultOptions);

    // 체크박스 ↔ 차트 색상 동기화
    document.querySelectorAll('.form-check-input.dot').forEach((el, i) => {
      if (chartColors[i]) {
        el.style.backgroundColor = chartColors[i];
        el.style.borderColor = chartColors[i];
      }
    });

    // 체크박스 토글 기능
    numberOfTicketsLegend.forEach(el => {
      el.addEventListener('change', () => {
        chart.dispatchAction({
          type: 'legendToggleSelect',
          name: utils.getData(el, 'number-of-tickets')
        });
      });
    });
  }
};

export default echartsNumberOfTicketsInit;
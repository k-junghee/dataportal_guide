// import utils from '../../utils';
// import { getPosition, echartSetOption } from './echarts-utils';

/* -------------------------------------------------------------------------- */
/*                             Echarts Active Users                           */
/* -------------------------------------------------------------------------- */

const activeUsersChartReportInit = () => {
  const $echartsActiveUsersChart = document.querySelector(
    '.echart-active-users-report'
  );

  if ($echartsActiveUsersChart) {
    const userOptions = utils.getData($echartsActiveUsersChart, 'options');
    const chart = window.echarts.init($echartsActiveUsersChart);

    const tooltipFormatter = params => {
      return `
      <div>
        <p class='mb-2 text-600'>${window
          .dayjs(params[0].axisValue)
          .format('MMM DD, YYYY')}</p>
        <div class='ms-1'>
          <h6 class="fs--1 text-700"><span class="fas fa-circle text-primary me-2"></span>${
            params[0].value
          }</h6>
          <h6 class="fs--1 text-700"><span class="fas fa-circle text-success me-2"></span>${
            params[1].value
          }</h6>
          <h6 class="fs--1 text-700"><span class="fas fa-circle text-info me-2"></span>${
            params[2].value
          }</h6>
        </div>
      </div>
      `;
    };
    const getDefaultOptions = () => {
    const years = ['2020', '2021', '2022', '2023', '2024', '2025'];

    // 유동적인 데이터 생성 (예시)
    const randomData = (min, max) =>
      years.map(() => Math.floor(Math.random() * (max - min + 1)) + min);

    return {
      color: [
        utils.getColor('primary'),
        utils.getColor('success'),
        utils.getColor('info')
      ],
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: { color: utils.getGrays()['1100'] },
        borderWidth: 1,
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        },
        formatter: params => {
          return `
          <div>
            <p class='mb-2 text-600'>${params[0].axisValue}</p>
            <div class='ms-1'>
              <h6 class="fs--1 text-700"><span class="fas fa-circle text-primary me-2"></span>${params[0].value}</h6>
              <h6 class="fs--1 text-700"><span class="fas fa-circle text-success me-2"></span>${params[1].value}</h6>
              <h6 class="fs--1 text-700"><span class="fas fa-circle text-info me-2"></span>${params[2].value}</h6>
            </div>
          </div>
          `;
        }
      },
      xAxis: {
        type: 'category',
        data: years,
        boundaryGap: false,
        silent: true,
        axisPointer: {
          lineStyle: {
            color: utils.getGrays()['300']
          }
        },
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: utils.getGrays()['300']
          }
        },
        axisTick: {
          show: true,
          length: 20,
          lineStyle: {
            color: utils.getGrays()['200']
          },
          interval: 0
        },
        axisLabel: {
          color: utils.getGrays()['600'],
          formatter: value => value,
          align: 'center',
          fontSize: 11,
          interval: 0
        }
      },
      yAxis: {
        type: 'value',
        position: 'right',
        axisPointer: { show: false },
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['200']
          }
        },
        axisLabel: {
          show: true,
          color: utils.getGrays()['600'],
          formatter: value => `${Math.round((value / 1000) * 10) / 10}k`
        },
        axisTick: { show: false },
        axisLine: { show: false }
      },
      series: [
        {
          type: 'line',
          data: randomData(4000, 9500),
          showSymbol: false,
          symbol: 'circle',
          itemStyle: {
            borderColor: utils.getColors().primary,
            borderWidth: 2
          },
          lineStyle: {
            color: utils.getColor('primary')
          },
          symbolSize: 4
        },
        {
          type: 'line',
          data: randomData(2000, 6000),
          showSymbol: false,
          symbol: 'circle',
          itemStyle: {
            borderColor: utils.getColors().success,
            borderWidth: 2
          },
          lineStyle: {
            color: utils.getColor('success')
          },
          symbolSize: 4
        },
        {
          type: 'line',
          data: randomData(1000, 3000),
          showSymbol: false,
          symbol: 'circle',
          itemStyle: {
            borderColor: utils.getColors().info,
            borderWidth: 2
          },
          lineStyle: {
            color: utils.getColor('info')
          },
          symbolSize: 4
        }
      ],
      grid: { right: '30px', left: '5px', bottom: '20px', top: '20px' }
    };
  };


    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default activeUsersChartReportInit;

// import utils from '../../utils';
// import { getPosition, echartSetOption } from './echarts-utils';

/* -------------------------------------------------------------------------- */
/*                                Top Products                                */
/* -------------------------------------------------------------------------- */

const topProductsInit = () => {
  const ECHART_BAR_TOP_PRODUCTS = '.echart-bar-top-products';
  const $echartBarTopProducts = document.querySelector(ECHART_BAR_TOP_PRODUCTS);

  if ($echartBarTopProducts) {
    const userOptions = utils.getData($echartBarTopProducts, 'options');
    const chart = window.echarts.init($echartBarTopProducts);

    // dataset 헤더에서 범례 추출
    const headers = userOptions?.dataset?.source?.[0] || [];
    const legendNames = headers.slice(1); // 첫 번째 컬럼(product)은 제외

    const getDefaultOptions = () => ({
      color: [utils.getColors().primary, utils.getGrays()['300']],
      dataset: userOptions?.dataset, // dataset 그대로 반영
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: utils.getGrays()['100'],
        borderColor: utils.getGrays()['300'],
        textStyle: { color: utils.getGrays()['1100'] },
        borderWidth: 1,
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return getPosition(pos, params, dom, rect, size);
        },
        formatter: function (params) {
          return `<div class="font-weight-semi-bold">${params.seriesName}</div>
                  <div class="fs--1 text-600"><strong>${params.name}:</strong> 
                  ${params.value[params.componentIndex + 1]}</div>`;
        }
      },
      legend: {
        data: legendNames,   // <- dataset 헤더에서 자동 추출
        left: 'left',
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 0,
        icon: 'circle',
        inactiveColor: utils.getGrays()['400'],
        textStyle: { color: utils.getGrays()['700'] }
      },
      xAxis: {
        type: 'category',
        axisLabel: { color: utils.getGrays()['400'] },
        axisLine: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: 'dashed'
          }
        },
        axisTick: false,
        boundaryGap: true
      },
      yAxis: {
        axisPointer: { type: 'none' },
        axisTick: 'none',
        splitLine: {
          lineStyle: {
            color: utils.getGrays()['300'],
            type: 'dashed'
          }
        },
        axisLine: { show: false },
        axisLabel: { color: utils.getGrays()['400'] }
      },
      series: [
        {
          type: 'bar',
          barWidth: '10px',
          barGap: '30%',
          z: 10,
          itemStyle: {
            barBorderRadius: [10, 10, 0, 0],
            color: utils.getColors().primary
          }
        },
        {
          type: 'bar',
          barWidth: '10px',
          barGap: '30%',
          itemStyle: {
            barBorderRadius: [4, 4, 0, 0],
            color: utils.getGrays()[300]
          }
        }
      ],
      grid: { right: '0', left: '30px', bottom: '10%', top: '20%' },
    });

    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default topProductsInit;

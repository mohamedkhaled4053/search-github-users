import React from 'react';

import ReactFC from 'react-fusioncharts';

import FusionCharts from 'fusioncharts';

import Chart from 'fusioncharts/fusioncharts.charts';

import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

function Pie2D({ data }) {
  const chartConfigs = {
    type: 'column3D',
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'most popular',
        theme: 'fusion',
        xAxisName: 'Repos',
        xAxisNameFontSize: '20',
        yAxisName: 'Stars',
        yAxisNameFontSize: '20',
        showValues: '1',
        valueFontColor: '#999',
        valueFontSize: '20',
      },

      data,
    },
  };

  return <ReactFC {...chartConfigs} />;
}

export default Pie2D;

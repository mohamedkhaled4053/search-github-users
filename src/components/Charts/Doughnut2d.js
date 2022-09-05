import React from 'react';

import ReactFC from 'react-fusioncharts';

import FusionCharts from 'fusioncharts';

import Chart from 'fusioncharts/fusioncharts.charts';

import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

function Pie2D({ data }) {
  const chartConfigs = {
    type: 'doughnut2d',
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'star per language',
        theme: 'fusion',
        decimals: '0',
        pieRadius: '45%',
        showPercentValues: '0',
        plottooltext: '$label, $percentValue',
      },

      data,
    },
  };

  return <ReactFC {...chartConfigs} />;
}

export default Pie2D;

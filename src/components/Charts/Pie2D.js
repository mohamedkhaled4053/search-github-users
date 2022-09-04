import React from 'react';
import ReactDOM from 'react-dom';

import ReactFC from 'react-fusioncharts';

import FusionCharts from 'fusioncharts';

import Chart from 'fusioncharts/fusioncharts.charts';

import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';


ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

function Pie2D({data}) {


  const chartConfigs = {
    type: 'pie2D',
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'languages',
        theme: 'fusion',
        decimals: '0',
        pieRadius: '45%',
      },

      data,
    },
  };

  return <ReactFC {...chartConfigs} />;
}

export default Pie2D;

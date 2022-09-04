import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import ReactFC from 'react-fusioncharts';

import FusionCharts from 'fusioncharts';

import Chart from 'fusioncharts/fusioncharts.charts';

import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { GithubContext } from '../../context/context';

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

function Pie3D() {
  let { repos } = useContext(GithubContext);

  // get languages
  let languages = repos.reduce((total, repo) => {
    if (repo.language) {
      if (total[repo.language]) {
        total[repo.language].value ++;
      } else {
        total[repo.language] = {label: repo.language, value : 1};
      }
    }
    return total;
  }, {});

  let data = Object.values(languages)
  data = data.sort((a,b)=> b.value - a.value)

  const chartData = [
    {
      label: 'Venezuela',
      value: '290',
    },
    {
      label: 'Saudi',
      value: '260',
    },
    {
      label: 'Canada',
      value: '180',
    },
  ];

  const chartConfigs = {
    type: 'pie3D',
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

export default Pie3D;

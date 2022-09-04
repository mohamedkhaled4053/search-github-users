import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import ReactFC from 'react-fusioncharts';

import FusionCharts from 'fusioncharts';

import Chart from 'fusioncharts/fusioncharts.charts';

import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { GithubContext } from '../../context/context';

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

function Pie2D() {
  let { repos } = useContext(GithubContext);

  // get languages
  let languages = repos.reduce((total, repo) => {
    let {language} = repo
      if(!language) return total

      if (total[language]) {
        total[language].value ++;
      } else {
        total[language] = {label: language, value : 1};
      }

    return total;
  }, {});

  let data = Object.values(languages)
  data = data.sort((a,b)=> b.value - a.value)

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

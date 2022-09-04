import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { Pie2D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  let { repos } = React.useContext(GithubContext);

  // compute repos number and stars for each language
  let reposData = repos.reduce((total, repo) => {
    let { language, stargazers_count: stars } = repo;
    if (!language) return total;

    if (total[language]) {
      total[language].value++;
      total[language].stars+= stars;
    } else {
      total[language] = { label: language, value: 1, stars };
    }

    return total;
  }, {});

  let languages = Object.values(reposData);
  // get array of data for charts
  let mostUsedLanguages = languages.sort((a, b) => b.value - a.value);
  let stars = languages.map(({ label, stars }) => {
    return { label, value: stars };
  });


  // compute most popular repo

  let popularRepos = repos.map(({name ,stargazers_count: stars}) => {
    return {label: name, value: stars}
  })

  let mostPopularRepos = popularRepos.sort((a,b)=> b.value- a.value).slice(0,5)


  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie2D data={mostUsedLanguages} />
        <Column3D data={mostPopularRepos}/>
        <Doughnut2D data={stars}/>
        <Bar3D />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;

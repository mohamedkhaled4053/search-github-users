import React from 'react';
import { Info, Repos, User, Search } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
const Dashboard = () => {
  let { loading } = React.useContext(GithubContext);

  if (loading) {
    return (
      <main>
        <Search />
        <img src={loadingImage} alt='loading' className='loading-img'/>
      </main>
    );
  }

  return (
    <main>
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;

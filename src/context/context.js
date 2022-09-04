import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

let GithubContext = React.createContext();

function GithubProvider({ children }) {
  return (
    <GithubContext.Provider value={'hello'}>{children}</GithubContext.Provider>
  );
}

export { GithubContext, GithubProvider };

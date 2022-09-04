import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

let GithubContext = React.createContext();

function GithubProvider({ children }) {
  let [user, setUser] = useState(mockUser);
  let [repos, setRepos] = useState(mockRepos);
  let [followers, setFollowers] = useState(mockFollowers);

  return (
    <GithubContext.Provider value={{ user, repos, followers }}>
      {children}
    </GithubContext.Provider>
  );
}

export { GithubContext, GithubProvider };

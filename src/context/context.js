import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

let GithubContext = React.createContext();

function GithubProvider({ children }) {
  let [user, setUser] = useState({});
  let [repos, setRepos] = useState([]);
  let [followers, setFollowers] = useState([]);
  let [userName, setUserName] = useState('john-smilga');
  let [loading, setLoading] = useState(true);

  function fetchData() {
    setLoading(true)

    // prepare urls
    let userUrl = `${rootUrl}/users/${userName}`;
    let followersUrl = userUrl + '/followers';
    let reposUrl = userUrl + '/repos?per_page=100';

    // setup fetch
    let fetchUser = fetch(userUrl).then((res) => res.json());
    let fetchFollowers = fetch(followersUrl).then((res) => res.json());
    let fetchRepos = fetch(reposUrl).then((res) => res.json());

    // display data only when all settled
    Promise.allSettled([fetchUser, fetchFollowers, fetchRepos]).then(
      (res) => {
        setUser(res[0].value)
        setFollowers(res[1].value)
        setRepos(res[2].value)
        setLoading(false)
      }
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GithubContext.Provider
      value={{ user, repos, followers, userName, setUserName, loading }}
    >
      {children}
    </GithubContext.Provider>
  );
}

export { GithubContext, GithubProvider };

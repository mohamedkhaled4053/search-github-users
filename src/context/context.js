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
  let [limit, setLimit] = useState({limit : 60, remaining: 0});

  function fetchData() {
    setLoading(true)

    // prepare urls
    let userUrl = `${rootUrl}/users/${userName}`;
    let followersUrl = userUrl + '/followers';
    let reposUrl = userUrl + '/repos?per_page=100';
    let limitUrl = `${rootUrl}/rate_limit`

    // setup fetch
    let fetchUser = fetch(userUrl).then((res) => res.json());
    let fetchFollowers = fetch(followersUrl).then((res) => res.json());
    let fetchRepos = fetch(reposUrl).then((res) => res.json());
    let fetchLimit = fetch(limitUrl).then((res) => res.json());

    setUserName('')
    // display data only when all settled
    Promise.allSettled([fetchUser, fetchFollowers, fetchRepos, fetchLimit]).then(
      (res) => {
        let [{value:user}, {value:followers}, {value:repos}, {value:{rate:{limit, remaining}}}] = res
        setUser(user)
        setFollowers(followers)
        setRepos(repos)
        setLimit({limit, remaining})

        setLoading(false)
      }
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GithubContext.Provider
      value={{ user, repos, followers, userName, setUserName, loading, fetchData ,limit}}
    >
      {children}
    </GithubContext.Provider>
  );
}

export { GithubContext, GithubProvider };

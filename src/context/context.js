import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

let GithubContext = React.createContext();

function GithubProvider({ children }) {
  // states
  let [user, setUser] = useState(mockUser);
  let [repos, setRepos] = useState(mockRepos);
  let [followers, setFollowers] = useState(mockFollowers);
  let [userName, setUserName] = useState('john-smilga');
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState('');
  let [limit, setLimit] = useState({limit : 60, remaining: 0});

  // helper functions
  function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  // fetch function
  function fetchData() {
    if(!userName) return

    setLoading(true)
    setError('')
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
        // get data with destructuring
        let [{value:user}, {value:followers}, {value:repos}, {value:{rate:{limit, remaining, reset}}}] = res

        // consel loading and update limit state
        setLoading(false)
        setLimit({limit, remaining})

        // check for request limit
        let timer
        if (remaining === 0) {
          let timeToReset = reset* 1000 - Date.now()
          setError(`Sorry, You Have Exceeded Your Hourly Rate Limit! reset in ${millisToMinutesAndSeconds(timeToReset)}`)

          timer = setInterval(() => {
            timeToReset = reset*1000 - Date.now()
            if(timeToReset <= 0){
              fetchData()
              clearInterval(timer)
            }else{
              setError(`Sorry, You Have Exceeded Your Hourly Rate Limit! reset in ${millisToMinutesAndSeconds(timeToReset)}`)
            }
          }, 1000);
          return
        } else {
          clearInterval(timer)
        }

        // check if userName is valid
        if (user.message) {
          setError('There Is No User With That Username')
          return
        }
        
        // update states
        setUser(user)
        setFollowers(followers)
        setRepos(repos)

      }
    );
  }

  // effects
  useEffect(() => {
    fetchData();
  }, [userName]);

  return (
    <GithubContext.Provider
      value={{ user, repos, followers, userName, setUserName, loading, fetchData ,limit, error}}
    >
      {children}
    </GithubContext.Provider>
  );
}

export { GithubContext, GithubProvider };

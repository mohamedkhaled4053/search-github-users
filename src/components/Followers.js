import React, { useContext } from 'react';
import { GithubContext } from '../context/context';
import styled from 'styled-components';

const Followers = () => {
  let { followers,setUserName, fetchData } = useContext(GithubContext);

  function handleClick(e) {
    if (e.target.nodeName === 'IMG') {
      setUserName(e.target.alt)
    } else if (e.target.nodeName === 'SPAN'){
      setUserName(e.target.textContent)
    }
  }

  return (
    <Wrapper>
      <div className="followers">
        {followers.map(({ id, login, avatar_url, html_url }) => (
          <article key={id} onClick={handleClick}>
            <img src={avatar_url} alt={login} />
            <div>
              <h4><span>{login}</span></h4>
              <a href={html_url} target="_blank">
                {html_url}
              </a>
            </div>
          </article>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background: var(--clr-white);
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;

  &::before {
    content: ' followers';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background: var(--clr-white);
    color: var(--clr-grey-5);
    border-top-right-radius: var(--radius);
    border-top-left-radius: var(--radius);
    text-transform: capitalize;
    padding: 0.5rem 1rem 0 1rem;
    letter-spacing: var(--spacing);
    font-size: 1rem;
  }
  .followers {
    overflow: auto;
    height: 260px;
    display: grid;
    grid-template-rows: repeat(auto-fill, minmax(45px, 1fr));
    gap: 1.25rem 1rem;
    padding: 1rem 2rem;
  }
  article {
    transition: var(--transition);
    padding: 0.15rem 0.5rem;
    border-radius: var(--radius);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 1rem;
    img {
      height: 100%;
      width: 45px;
      border-radius: 50%;
      object-fit: cover;
      cursor: pointer
    }
    h4 {
      margin-bottom: 0;
      span{
        cursor: pointer
      }
    }
    a {
      color: var(--clr-grey-5);
    }
  }
`;
export default Followers;

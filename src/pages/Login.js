import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import loginImg from '../images/login-img.svg';
const Login = () => {
  return (
    <Wrapper>
      <div class="container">
        <img src="/static/media/login-img.20a90984.svg" alt="github user" />
        <h1>github user</h1>
        <button class="btn">Log In / Sign Up</button>
      </div>
    </Wrapper>
  );
};


const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
export default Login;

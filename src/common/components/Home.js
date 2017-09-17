import React from 'react'
import ArticlePromotion from './ArticlePromotion'
import styled from 'styled-components'
const Wrapper = styled.div`
  background: #141414;
  border: 1px solid rgb(30,30,30);
  box-sizing: border-box;
  padding: 10px;
  display: block !important;

  &.title {
    color: rgb(255, 44, 49);
    font-size: 34px;
    text-align: center;
  }

  &.content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;
  }

  &.caption {
    color: rgb(150, 44, 49);
    font-size: 18px;
    -webkit-font-smoothing: antialiased;
    margin-top: 10px;
    text-shadow: 1px 1px 1px #2A0C0C;
  }

  &.nico {
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: pink;
    text-decoration: none;
    -webkit-font-smoothing: antialiased;
  }
  &.nico:hover {
    text-decoration: underline;
  }
`
const Home = () =>
  <Wrapper>
    <h1 className='title'>HOME</h1>

    <div className='content'>
      <img
        src='https://cdn.reactlandia.com/rudy-logo.png'
        alt='logo'
        style={{ height: 300 }}
      />
      <span className='caption'>RFR will become Rudy</span>

      <ArticlePromotion
        title='Wanna master SSR? Read:'
        text='Server-Render Like a Pro in 10 Steps /w Redux-First Router 🚀'
        url='https://medium.com/faceyspacey/server-render-like-a-pro-w-redux-first-router-in-10-steps-b27dd93859de'
      />
    </div>

    <a
      className='nico'
      href='https://twitter.com/nico__delfino'
      target='_blank'
      rel='noopener noreferrer'
    >
      *One of our first users, Nicolas Delfino, designed the logo, check him
      out: @nico__delfino
    </a>
  </Wrapper>

export default Home

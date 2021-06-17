import React, {useState, useEffect} from 'react';
import styled, { css } from 'styled-components';

const Issues = styled.div`
  border: 1px solid rgb(246,248,250);
  width: 85%;
  margin: auto;
  font-family: Arial, Helvetica, sans-serif;
`;

const Issue = styled.li`
  font-size: 0.9rem;
  display: flex;
  align-items: baseline;
  border: 1px solid rgb(246,248,250);
  background-color: #fff;
  align-items: center;
  height: '2rem';
  &:hover {
    background-color: rgb(246,248,250);
  }
`;


const TitleTags = styled.div`
  display:flex;
  justify-content: space-around;
  align-items: baseline;
`;

const Tag = styled.button`
  border-radius: 2rem;
  border: 2px solid ${props => '#'+props.color};
  margin-left: 10px; 
  background-color: ${props => '#'+props.color};
  padding: 0.3rem;
  color: #fff;
  font-size: 0.6rem;
  font-weight: bold;
  &:hover{
    cursor: pointer
  }
`;

const LoadingList = ({fakeIssues = 30}) => {


    return (
        <Issues>
        {Array.from(Array(fakeIssues)).map((issue) => 
                <Issue>
                    <i style={{marginRight: '2rem', marginLeft: '2rem'}}  class="fas fa-exclamation-circle"/>
                    <div>
                    <TitleTags>
                        <div style={{color:'#fff', paddingLeft: '5px', width: '450px', backgroundColor: '#ccc', borderRadius: '2rem'}}>Loading</div>
                        <Tag color='ccc'>Loading</Tag>
                    </TitleTags>
                    <div style={{color:'#fff', paddingLeft: '5px', fontSize: '0.8rem', width: '100px', backgroundColor: '#ccc', borderRadius: '2rem'}}>Loading</div>
                    </div>
                </Issue>
        )}
   </Issues>
    )

}

export default LoadingList;
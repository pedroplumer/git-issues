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

const IssuesList = ({issues, selectedTags, setSelectedTags}) => {

    const selectTag = (event) => {
        var value = event.target.innerText;
        if(!selectedTags.includes(value)){
       setSelectedTags([...selectedTags, value]);
        }
      }


      const calculateDifference = (issueDate) => {
        var today = new Date(); 
        var newissueDATE = new Date(issueDate);
        var delta = Math.abs(newissueDATE - today) / 1000;
    
        // calculate (and subtract) whole days
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;
        if(days > 0) {
          if(days === 1) {
            return days +' day '+  'ago'
          }
          return days +' days '+  'ago'
        }
    
        // calculate (and subtract) whole hours
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        return hours +' '+ 'hours ago';
      }

    return (
        <Issues>
            {issues.map((issue) => 
                    <Issue>
                        <i style={{marginRight: '2rem', marginLeft: '2rem'}}  class="fas fa-exclamation-circle"/>
                        <div>
                        <TitleTags>
                            <p style={{fontWeight: 'bold'}}>{issue.title}</p>
                            {issue.labels.map((tag) => 
                            <Tag onClick={(event) => selectTag(event)} color={tag.color}>{tag.name}</Tag>)}
                        </TitleTags>
                        <p style={{fontSize: '0.8rem'}}>#{issue.id} opened {calculateDifference(issue.created_at)} by {issue.user.login}</p>
                        </div>
                    </Issue>
            )}
       </Issues>
    )
}

export default IssuesList;
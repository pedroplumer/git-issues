import styled, { css } from 'styled-components';
import React, { useState, useEffect } from 'react';
import Request from '../service/Request';
import axios from 'axios';

/* Filters */
const IssueHeadFiltersDiv = styled.div`
display:flex;
flex: 4 1 0;
justify-content: flex-end;
`;

const FilterButton = styled.button`
cursor: pointer;
outline: none;
border: none;
background-color: rgb(246,248,250);
color: #586069;
font-size: 0.8rem;
padding-left: 0.8rem;
`;

const DropDownContent = styled.div`
display: ${props => props.active ? 'block' : 'none'};
border-radius: 0.5rem; 
position: absolute;
background-color: #fff;
min-width: 200px;
box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
z-index: 1;
a {
  display: block;
}
max-height: 300px;
overflow-x: hidden;
}

`;

const FilterOption = styled.li`
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  border: 1px solid rgb(246,248,250);
  background-color: #fff;
  justify-content: space-around;
  height: '2rem';
  &:hover {
    background-color: rgb(246,248,250);
    cursor: pointer;
  }
  img {
  }
  author: props.author
`;

const FilterInput = styled.input`
width: 90%;
height: 25px;
border-radius: 6px;
outline: none;
border: 1px solid black;
margin-left: 8px;
border: 1px solid grey;
margin-bottom: 5px;
&:focus{
  border: 1px solid rgb(3,153,232);
  border-radius: 6px;
  box-shadow: 0 0 2pt 1pt #54B4F1;
}

`;

const AvatarImg = styled.img`
/* make a square container */
    width: 30px;
    height: 30px;

    /* fill the container, preserving aspect ratio, and cropping to fit */
    background-size: cover;

    /* center the image vertically and horizontally */

    /* round the edges to a circle with border radius 1/2 container size */
    border-radius: 50%;
    

`;

const LabelColor = styled.span`
height: 15px;
width: 15px;
background-color: ${props => '#'+props.color};
border-radius: 50%;
display: inline-block;
`;


const IssueHeadFilters = ({ setAuthorFilter, setSelectedTags, selectedTags, setMilestoneFilter }) => {

    const [authors, setAuthors] = useState([]);
    const [active, setActive] = useState(false);
    const [activeLabelFilter, setActiveLabelFilter] = useState(false);
    const [activeMilestoneFilter, setActiveMilestoneFilter] = useState(false);

    const [labels, setLabels] = useState([]);
    const [milestones, setMilestones] = useState([]);

    useEffect(() =>{
        fetchAuthors();
        fetchLabels();
        fetchMilestones();
      }, []);

      const fetchMilestones = async () => {
        let request = await Request.get('/milestones')
        setMilestones(request.data);
      }

      const fetchAuthors = async () =>{
        let request = await Request.get('/assignees',{
          params: {
            per_page:'100'
          }
        });
        setAuthors(request.data);
      }

      const fetchLabels = async () =>{
        let request = await Request.get('/labels',{
          params: {
            per_page:'100'
          }
        });
        setLabels(request.data);
      }

      const findUser = async(event) => {
        var userName = event.target.value;
        if(userName.length > 0){
        var user = await fetchUser(userName);
        setAuthors([ user, ...authors]);
        }else fetchAuthors();
      };  
    
      const fetchUser = async (input) => {
        var user = await axios.get('https://api.github.com/users/'+ input)
        .then(function(response) {
          return response.data;
        })
        return user;
      }

      const selectLabel = (label) => {
        setActiveLabelFilter(false);
        setSelectedTags([...selectedTags, label.name])
      }

    return (
        <IssueHeadFiltersDiv>
            <div>
                <FilterButton onClick={() => setActive(!active)}>Author <i class="fa fa-caret-down"></i></FilterButton>
                <DropDownContent active={active}>
                    <p style={{marginLeft: '0.8rem',borderBottom: '1px solid rgb(246,248,250)', fontSize: '11px', fontWeight: 'bold'}}>Filter by Author</p>
                    <FilterInput  onChange={(event) => findUser(event)}/>
                    {authors.map((author) => 
                      <FilterOption value={author} onClick={() => setAuthorFilter(author.login)}>
                        <AvatarImg src={author.avatar_url}/>
                        <p style={{ fontWeight: '500'}} >{author.login}</p>
                      </FilterOption>
                    )}
                </DropDownContent>
            </div>

            <div>
            <FilterButton onClick={() => setActiveLabelFilter(!activeLabelFilter)}>Label <i class="fa fa-caret-down"></i></FilterButton>
              <DropDownContent active={activeLabelFilter}>
                <p style={{marginLeft: '0.8rem', fontSize: '11px', fontWeight: 'bold'}}>Filter by Label</p>
                  {labels.map((label) => 
                    <FilterOption onClick={() => selectLabel(label)} >
                      <LabelColor color={label.color}></LabelColor>
                      <p style={{ fontWeight: '500', fontSize: '12px'}} >{label.name}</p>
                    </FilterOption>
                  )}
              </DropDownContent>
            </div>

  
            <div>
            <FilterButton onClick={() => setActiveMilestoneFilter(!activeMilestoneFilter)}>Milestones <i class="fa fa-caret-down"></i></FilterButton>
              <DropDownContent active={activeMilestoneFilter}>
                <p style={{marginLeft: '0.8rem', fontSize: '11px', fontWeight: 'bold'}}>Filter by Milestone</p>
                  {milestones.map((milestone) => 
                    <FilterOption onClick={() => setMilestoneFilter(milestone.number)}>
                      <p style={{ fontWeight: '500', fontSize: '12px'}} >{milestone.title}</p>
                    </FilterOption>
                  )}
              </DropDownContent>
            </div>

            <div>
            <FilterButton>Sort <i class="fa fa-caret-down"></i></FilterButton>
            </div>

        </IssueHeadFiltersDiv>
    )

}


export default IssueHeadFilters;
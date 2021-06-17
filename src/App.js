import styled, { css } from 'styled-components';
import React, { useState, useEffect } from 'react';
import Request from './service/Request';
import IssueHeadFilters from './components/IssueHeadFilters';
import IssuesList from './components/IssuesList';
import Pagination from './components/Pagination';
import LoadingList from './components/LoadingList'

const IssueListHeader = styled.div`
display: flex;
align-items: baseline;
width: 85%;
margin: auto;
border: 1px solid rgb(246,248,250);
background-color: rgb(246,248,250);
`;

const IssueListHeadNumbers = styled.div`
display: flex;
align-items: baseline;
flex: 1 1 0;
`;

const ClearFilterButton = styled.a`
text-decoration: none;
color: #586069;
margin: 70px;
padding-bottom: 70px
display: block

`;

const App = () => {

  const [gitIssues, setgitIssues] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);
  const [authorFilter, setAuthorFilter] = useState(null);
  const [milestoneFilter, setMilestoneFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchIssues();

  },[page,selectedTags, authorFilter, milestoneFilter ]);

  const fetchIssues = async () =>{
    setIsLoading(true);
    var labels = selectedTags.toString()
    let request = await Request.get('/issues', {
      params: {
        page: page,
        labels: labels,
        creator: authorFilter,
        milestone: milestoneFilter
      }
    });
    setgitIssues(request.data);
    setIsLoading(false);
  }

  const onClearFilters = () => {
    setSelectedTags([])
    setAuthorFilter(null)
    setMilestoneFilter(null)
  }

  return (
    <div className="App">
      <ClearFilterButton onClick={onClearFilters} href='#'><i style={{marginRight: '1rem', marginLeft: '2rem'}}  class="fas fa-window-close"/>Clear current filters</ClearFilterButton>
      {/* <p>Current filters : {selectedTags}, {authorFilter}, {milestoneFilter}</p> */}
      <IssueListHeader>
        <IssueListHeadNumbers>
          <i style={{marginRight: '1rem', marginLeft: '2rem'}}  class="fas fa-exclamation-circle"/>
          <p>896 Open</p>
        </IssueListHeadNumbers>
        <IssueListHeadNumbers>
          <i style={{marginRight: '1rem', marginLeft: '2rem'}}  class="far fa-check-circle"/>
          <p>6,096 Closed</p>
        </IssueListHeadNumbers>

      <IssueHeadFilters setAuthorFilter={setAuthorFilter} selectedTags={selectedTags} setSelectedTags={setSelectedTags} setMilestoneFilter={setMilestoneFilter}/>

      </IssueListHeader> 
      {isLoading? <LoadingList/> : <IssuesList issues={gitIssues} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/> }
      

      <Pagination page={page} setPage={setPage}/>
    </div>
  );
}

export default App;

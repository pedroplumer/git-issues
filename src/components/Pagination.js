import styled, { css } from 'styled-components';
import React, { useState, useEffect } from 'react';


const PaginationDiv = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  
`;

const PaginationButton = styled.button`
  border: ${props => props.selected ? '1px solid #0366D6' : 'none'};
  background-color:  ${props => props.selected ? '#0366D6' : '#fff'};
  color: ${props => props.selected ? '#fff' : 'black'};
  border-radius: 0.3rem;
  margin: 0.5rem;
  font-size: 1rem;
  width: auto;
  min-width: 2.8rem;
  &:hover {
    border: ${(props) => props.disabled ? 'none' : '0.5px solid grey'};
    cursor: ${(props) => props.disabled ? '' : 'pointer'};
  }
`;


const Pagination = ({page, setPage}) => {

    const totalPages = 38;
    const hasNext =  page < totalPages;
    const hasPrevious = page != 1;
  
    const handlePageClick = (page) => {
      setPage(page);
    }

    return (
        <PaginationDiv>
            <PaginationButton disabled={!hasPrevious} onClick={() => handlePageClick(page-1)}> Previous</PaginationButton>

            {(page > 3) && (
            <>
                <PaginationButton onClick={() => handlePageClick(1)}>1</PaginationButton>
                <PaginationButton onClick={() => handlePageClick(2)}>2</PaginationButton>
                <p>...</p>
            </>
            )}

            {(page === 3) && (<PaginationButton>{page-2}</PaginationButton>)}


            {(page != 1) && (<PaginationButton onClick={() => handlePageClick(page-1)}>{page-1}</PaginationButton>)}
            <PaginationButton selected="true">{page}</PaginationButton>
            {(page!= totalPages) && (<PaginationButton onClick={() => handlePageClick(page+1)}>{page+1}</PaginationButton>)}


            {(page < totalPages -2) && (   
            <>     
                <p style={{paddingBottom: '8px'}}>...</p>
                <PaginationButton onClick={() => handlePageClick(totalPages-1)}>{totalPages-1}</PaginationButton>
                <PaginationButton onClick={() => handlePageClick(totalPages)}>{totalPages}</PaginationButton>
            </>)}

            {(page === totalPages-2) && (
            <PaginationButton onClick={() => handlePageClick(page+2)}>{page+2}</PaginationButton>
            )}

            <PaginationButton disabled={!hasNext} onClick={() => handlePageClick(page+1)}>Next</PaginationButton>
        </PaginationDiv>
    )
}

export default Pagination;
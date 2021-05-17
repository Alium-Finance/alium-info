import React from 'react'
import styled from 'styled-components'
import { Text } from 'rebass'
import { ChevronIcon } from '../../svg'

const PageButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2em;
`

const StyledChevronIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  border: 1px solid #e9e9eb;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 200ms ease-in-out;

  > svg {
    margin: auto;
  }
  :hover {
    ${({ faded }) => (!faded ? 'background-color: #E9E9EB' : '')}
  }
  ${({ reversed }) => (reversed ? 'transform: rotate(180deg);' : '')}
  ${({ faded }) => (faded ? 'opacity: 0.4; cursor: default;' : '')}
`

const PagePicker = ({ onBackClick, onNextClick, page, maxPage }) => {
  return (
    <PageButtons>
      <div onClick={onBackClick}>
        {/*<Arrow faded={page === 1}>←</Arrow>*/}
        <StyledChevronIcon faded={page === 1}>
          <ChevronIcon width="24px" height="24px" />
        </StyledChevronIcon>
      </div>
      <Text color="#8990A5" fontSize={14} padding={'0 16px'}>
        {'Page ' + page + ' of ' + maxPage}
      </Text>
      <div onClick={onNextClick}>
        {/*<Arrow faded={page === maxPage}>→</Arrow>*/}
        <StyledChevronIcon reversed faded={page === maxPage}>
          <ChevronIcon width="24px" height="24px" />
        </StyledChevronIcon>
      </div>
    </PageButtons>
  )
}

export { PagePicker }

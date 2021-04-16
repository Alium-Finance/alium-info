import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Flex } from 'rebass'
import { RowFixed } from '../Row'
import { AliumIcon, AliumIconWithoutText } from '../../svg'

const TitleWrapper = styled.div`
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }

  z-index: 10;
`

export default function Title({ isPushed }) {
  const history = useHistory()

  return (
    <TitleWrapper onClick={() => history.push('/')}>
      <Flex alignItems="center">
        <RowFixed>
          {/*<UniIcon id="link" onClick={() => history.push('/')}>*/}
          {/*  <img width={'150px'} src={Logo} alt="logo" />*/}
          {/*</UniIcon>*/}
          {!isPushed ? (
            <AliumIcon width="124px" height="40px" onClick={() => history.push('/')} />
          ) : (
            <AliumIconWithoutText />
          )}
        </RowFixed>
      </Flex>
    </TitleWrapper>
  )
}

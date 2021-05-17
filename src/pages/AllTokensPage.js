import React, { useEffect } from 'react'
import 'feather-icons'

import TopTokenList from '../components/TokenList'
import { TYPE } from '../Theme'
import Panel from '../components/Panel'
import { useAllTokenData } from '../contexts/TokenData'
import { PageWrapper, FullWrapper } from '../components'
import { RowBetween } from '../components/Row'
import Search from '../components/Search'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { SavedInfo } from '../components/SavedInfo'
import { Flex } from 'rebass'

const StyledPageWrapper = styled(PageWrapper)`
  padding-top: 38px;
`

function AllTokensPage() {
  const allTokens = useAllTokenData()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const below600 = useMedia('(max-width: 800px)')

  return (
    <StyledPageWrapper>
      <FullWrapper>
        <RowBetween>
          <TYPE.largeHeader>Top Tokens</TYPE.largeHeader>
          {!below600 &&
            <Flex flexBasis="45%" alignItems="center">
              <Search small={true} big disableMargin />  <SavedInfo ml={32}/>
            </Flex>
          }
        </RowBetween>
        <Panel style={{ marginTop: '16px', padding: '0' }}>
          <TopTokenList tokens={allTokens} itemMax={50} />
        </Panel>
      </FullWrapper>
    </StyledPageWrapper>
  )
}

export default AllTokensPage

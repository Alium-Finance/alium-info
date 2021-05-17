import React, { useEffect } from 'react'
import 'feather-icons'

import { TYPE } from '../Theme'
import Panel from '../components/Panel'
import { useAllPairData } from '../contexts/PairData'
import PairList from '../components/PairList'
import { PageWrapper, FullWrapper } from '../components'
import { RowBetween } from '../components/Row'
import Search from '../components/Search'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { Flex } from 'rebass'
import { SavedInfo } from '../components/SavedInfo'

const StyledPageWrapper = styled(PageWrapper)`
  padding-top: 38px;
`

function AllPairsPage() {
  const allPairs = useAllPairData()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const below800 = useMedia('(max-width: 800px)')

  return (
    <StyledPageWrapper>
      <FullWrapper>
        <RowBetween>
          <TYPE.largeHeader>Top Pairs</TYPE.largeHeader>
          {!below800 &&
            <Flex flexBasis="45%" alignItems="center">
              <Search small={true} big disableMargin />  <SavedInfo ml={32}/>
            </Flex>
          }
        </RowBetween>
        <Panel style={{ marginTop: '16px', padding: '0' }}>
          <PairList pairs={allPairs} disbaleLinks={true} maxItems={50} />
        </Panel>
      </FullWrapper>
    </StyledPageWrapper>
  )
}

export default AllPairsPage

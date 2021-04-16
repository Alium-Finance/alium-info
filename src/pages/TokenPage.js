import React, { useState } from 'react'
import 'feather-icons'
import { withRouter } from 'react-router-dom'
import { Flex, Text } from 'rebass'
import styled from 'styled-components'
import Link, { ButtonLink } from '../components/Link'
import Panel from '../components/Panel'
import TokenLogo from '../components/TokenLogo'
import PairList from '../components/PairList'
import Loader from '../components/LocalLoader'
import { AutoRow, RowBetween, RowFixed } from '../components/Row'
// import Column, { AutoColumn } from '../components/Column'
import { ButtonLight, ButtonDark } from '../components/ButtonStyled'
import TxnList from '../components/TxnList'
import TokenChart from '../components/TokenChart'
import { BasicLink } from '../components/Link'
import Search from '../components/Search'
import { formattedNum, formattedPercent, getPoolLink, getSwapLink, localNumber } from '../utils'
import { useTokenData, useTokenTransactions, useTokenPairs } from '../contexts/TokenData'
import { TYPE, ThemedBackground } from '../Theme'
import { transparentize } from 'polished'
import { useColor } from '../hooks'
import CopyHelper from '../components/Copy'
import { useMedia } from 'react-use'
import { useDataForList } from '../contexts/PairData'
import { useEffect } from 'react'
import Warning from '../components/Warning'
import { usePathDismissed } from '../contexts/LocalStorage'
import {
  PageWrapper,
  ContentWrapper,
  StyledPairInformationBlock,
  StyledPlusIcon,
  StyledBookmarkIcon
} from '../components'
// import { PlusCircle, Bookmark } from 'react-feather'
import FormattedName from '../components/FormattedName'
import { useListedTokens } from '../contexts/Application'
import { BookmarkIcon, BorderedPlusIcon, ChevronMenuIcon, PlusIcon } from '../svg'
import { SavedInfo } from '../components/SavedInfo'

const DashboardWrapper = styled.div`
  width: 100%;
`

const PanelWrapper = styled.div`
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: max-content;
  gap: 16px;
  grid-column-gap: 30px;
  display: inline-grid;
  width: 100%;
  align-items: start;
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    align-items: stretch;
    > * {
      grid-column: 1 / 4;
    }

    > * {
      &:first-child {
        width: 100%;
      }
    }
  }
`

const TokenDetailsLayout = styled.div`
  display: flex;
  flex-direction: column;
`

const WarningGrouping = styled.div`
  opacity: ${({ disabled }) => disabled && '0.4'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
`

const StyledPageWrapper = styled(PageWrapper)`
  padding-top: 24px;
  // padding-top: 0;
`

const StyledLinkAdressContainer = styled.div`
  display: flex;
  align-items: center;
  background: rgba(108, 93, 211, 0.1);
  border-radius: 6px;
  padding: 4px 8px;
  height: auto;
  color: #8990A5;
  font-size: 12px;
`

const StyledCard = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 6px 12px rgba(185, 189, 208, 0.4);
  border-radius: 6px;
  padding: 24px;
  box-sizing: border-box;
  height: 122px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StyledButtonLight = styled(ButtonLight)`
  display: flex;
  align-items: center;
  
  > svg {
    margin-right: 16px;
  }
`

function TokenPage({ address, history }) {
  const {
    id,
    name,
    symbol,
    priceUSD,
    oneDayVolumeUSD,
    totalLiquidityUSD,
    volumeChangeUSD,
    oneDayVolumeUT,
    volumeChangeUT,
    priceChangeUSD,
    liquidityChangeUSD,
    oneDayTxns,
    txnChange,
    token0,
    token1,
  } = useTokenData(address)

  useEffect(() => {
    document.querySelector('body').scrollTo(0, 0)
  }, [])

  // detect color from token
  const backgroundColor = useColor(id, symbol)

  const allPairs = useTokenPairs(address)

  // pairs to show in pair list
  const fetchedPairsList = useDataForList(allPairs)

  // all transactions with this token
  const transactions = useTokenTransactions(address)

  // price
  const price = priceUSD ? formattedNum(priceUSD, true) : ''
  const priceChange = priceChangeUSD ? formattedPercent(priceChangeUSD) : ''

  // volume
  const volume =
    oneDayVolumeUSD || oneDayVolumeUSD === 0
      ? formattedNum(oneDayVolumeUSD === 0 ? oneDayVolumeUT : oneDayVolumeUSD, true)
      : oneDayVolumeUSD === 0
      ? '$0'
      : '-'

  // mark if using untracked volume
  const [usingUtVolume, setUsingUtVolume] = useState(false)
  useEffect(() => {
    setUsingUtVolume(oneDayVolumeUSD === 0)
  }, [oneDayVolumeUSD])

  const volumeChange = formattedPercent(!usingUtVolume ? volumeChangeUSD : volumeChangeUT)

  // liquidity
  const liquidity = totalLiquidityUSD ? formattedNum(totalLiquidityUSD, true) : totalLiquidityUSD === 0 ? '$0' : '-'
  const liquidityChange = formattedPercent(liquidityChangeUSD)

  // transactions
  const txnChangeFormatted = formattedPercent(txnChange)

  const below1080 = useMedia('(max-width: 1080px)')
  // const below800 = useMedia('(max-width: 800px)')
  const below600 = useMedia('(max-width: 600px)')
  const below500 = useMedia('(max-width: 500px)')

  // format for long symbol
  const LENGTH = below1080 ? 10 : 16
  const formattedSymbol = symbol?.length > LENGTH ? symbol.slice(0, LENGTH) + '...' : symbol

  const [dismissed, markAsDismissed] = usePathDismissed(history.location.pathname)

  const [isSaved, setIsSaved] = useState(window.localStorage.getItem('pinnedInfo') ? JSON.parse(window.localStorage.getItem('pinnedInfo')).tokens.find((token)=>token.address === address) : false)

  // const [savedTokens, addToken] = useSavedTokens()
  const listedTokens = useListedTokens()

  const onClickHandler = () => {
    if(window.localStorage.getItem('pinnedInfo')) {
      let result = JSON.parse(window.localStorage.getItem('pinnedInfo'))
      if(!result.tokens.find((token)=>token.address === address))
        result.tokens.push({ address: address, symbol: symbol })
      window.localStorage.setItem('pinnedInfo', JSON.stringify(Object.assign(JSON.parse(window.localStorage.getItem('pinnedInfo')), result)))
    }
    else
      window.localStorage.setItem('pinnedInfo', JSON.stringify({tokens: [{ address: address, symbol: symbol }], pairs: []}))
    setIsSaved(true);
  }

  const onBookmarkClickHandler = () => {
    let result = JSON.parse(window.localStorage.getItem('pinnedInfo'))
    result.tokens.splice(result.tokens.findIndex((token)=>token.address === address), 1)
    window.localStorage.setItem('pinnedInfo', JSON.stringify(Object.assign(JSON.parse(window.localStorage.getItem('pinnedInfo')), result)))
    setIsSaved(false);
  }

  useEffect(() => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    })
  }, [])

  return (
    <StyledPageWrapper>
      <ThemedBackground backgroundColor={transparentize(0.6, backgroundColor)} />

      <Warning
        type={'token'}
        show={!dismissed && listedTokens && !listedTokens.includes(address)}
        setShow={markAsDismissed}
        address={address}
      />
      <ContentWrapper style={{gridGap: '6px'}}>
        <RowBetween style={{ flexWrap: 'wrap', alingItems: 'start' }}>
          <AutoRow align="flex-end" style={{ width: 'fit-content' }}>
            <TYPE.body style={{display: 'flex', alignItems: 'center'}}>
              <BasicLink to="/tokens" style={{background: 'rgba(108, 93, 211, 0.1)', borderRadius: '6px', padding: '4px 8px', height: 'auto', color: '#8990A5', fontSize: '12px'}}>{'Tokens '}</BasicLink><ChevronMenuIcon style={{transform: 'rotate(180deg)', padding: '0 4px'}}/>
              {'  '}
            </TYPE.body>
            <StyledLinkAdressContainer>
              {symbol}
              <Link
                style={{ width: 'fit-content' }}
                color={backgroundColor}
                external
                href={'https://bscscan.com/address/' + address}
              >
                <Text style={{ marginLeft: '.15rem' }} fontSize={'12px'} fontWeight={400} color={'#6C5DD3'}>
                  ({address.slice(0, 8) + '...' + address.slice(36, 42)})
                </Text>
              </Link>
            </StyledLinkAdressContainer>
          </AutoRow>
          {!below600 &&
            <Flex flexBasis="45%" alignItems="center">
              <Search small={true} big disableMargin />  <SavedInfo ml={32} selectedAddress={address} setIsSaved={setIsSaved}/>
            </Flex>
          }
        </RowBetween>

        <WarningGrouping disabled={!dismissed && listedTokens && !listedTokens.includes(address)}>
          <DashboardWrapper style={{ marginTop: below1080 ? '0' : '1rem' }}>
            <RowBetween
              style={{
                flexWrap: 'wrap',
                marginBottom: '2rem',
                alignItems: 'flex-start',
              }}
            >
              <RowFixed style={{ flexWrap: 'wrap' }}>
                <RowFixed style={{ alignItems: 'baseline' }}>
                  <TokenLogo address={address} size="40px" style={{ alignSelf: 'center' }} bordered={true} />
                  <TYPE.main fontSize={'48px'} fontWeight={700} style={{ margin: '0 1rem', color: '#0B1359'  }}>
                    <RowFixed gap="6px">
                      <FormattedName text={name ? name + ' ' : ''} maxCharacters={16} style={{ marginRight: '6px'}} />{' '}
                      {formattedSymbol ? `(${formattedSymbol})` : ''}
                    </RowFixed>
                  </TYPE.main>{' '}
                  {!below1080 && (
                    <>
                      <TYPE.main fontSize={'1.5rem'} fontWeight={500} style={{ marginRight: '1rem', color: '#0B1359'  }}>
                        {price}
                      </TYPE.main>
                      {priceChange}
                    </>
                  )}
                </RowFixed>
              </RowFixed>
              <span>
                <RowFixed ml={below500 ? '0' : '2.5rem'} mt={below500 ? '1rem' : '0'}>
                  {/*{!!!savedTokens[address] && !below800 ? (*/}
                  {/*  <Hover onClick={() => addToken(address, symbol)}>*/}
                  {/*    <StyledIcon>*/}
                  {/*      <PlusCircle style={{ marginRight: '0.5rem' }} />*/}
                  {/*    </StyledIcon>*/}
                  {/*  </Hover>*/}
                  {/*) : !below1080 ? (*/}
                  {/*  <StyledIcon>*/}
                  {/*    <Bookmark style={{ marginRight: '0.5rem', opacity: 0.4 }} />*/}
                  {/*  </StyledIcon>*/}
                  {/*) : (*/}
                  {/*  <></>*/}
                  {/*)}*/}
                  {!isSaved ? <StyledPlusIcon onClick={onClickHandler}><PlusIcon /></StyledPlusIcon>
                    : <StyledBookmarkIcon onClick={onBookmarkClickHandler}><BookmarkIcon /></StyledBookmarkIcon>
                  }
                  <StyledButtonLight color={'#6C5DD3'} style={{height: '48px'}}>
                    <Link external href={getPoolLink(token0?.id, token1?.id)} style={{display: 'flex', alignItems: 'center'}}>
                     <BorderedPlusIcon style={{marginRight: '8px'}}/> <span>Add Liquidity</span>
                    </Link>
                  </StyledButtonLight>
                  <Link href={getSwapLink(address)} target="_blank">
                    <ButtonDark ml={'.5rem'} mr={below1080 && '.5rem'} color={backgroundColor} style={{height: '48px'}}>
                      Trade
                    </ButtonDark>
                  </Link>
                </RowFixed>
              </span>
            </RowBetween>

            <>
              <PanelWrapper style={{ marginTop: '6px' }}>
                {below1080 && price && (
                  <StyledCard>
                      <RowBetween>
                        <TYPE.def>Price</TYPE.def>
                        <div />
                      </RowBetween>
                      <RowBetween align="flex-end">
                        {' '}
                        <TYPE.def fontSize={24} lineHeight={1} fontWeight={500}>
                          {price}
                        </TYPE.def>
                        <TYPE.def fontSize={16}>{priceChange}</TYPE.def>
                      </RowBetween>
                  </StyledCard>
                )}
                <StyledCard>
                    <RowBetween>
                      <TYPE.defHeader>Total Liquidity</TYPE.defHeader>
                      <div />
                    </RowBetween>
                    <RowBetween align="flex-end">
                      <TYPE.def fontSize={24} lineHeight={1} fontWeight={500}>
                        {liquidity}
                      </TYPE.def>
                      <TYPE.def fontSize={16}>{liquidityChange}</TYPE.def>
                    </RowBetween>
                </StyledCard>
                <StyledCard>
                    <RowBetween>
                      <TYPE.defHeader>Volume (24hrs) {usingUtVolume && '(Untracked)'}</TYPE.defHeader>
                      <div />
                    </RowBetween>
                    <RowBetween align="flex-end">
                      <TYPE.def fontSize={24} lineHeight={1} fontWeight={500}>
                        {volume}
                      </TYPE.def>
                      <TYPE.def fontSize={16}>{volumeChange}</TYPE.def>
                    </RowBetween>
                </StyledCard>

                <StyledCard>
                    <RowBetween>
                      <TYPE.defHeader>Transactions (24hrs)</TYPE.defHeader>
                      <div />
                    </RowBetween>
                    <RowBetween align="flex-end">
                      <TYPE.def fontSize={24} lineHeight={1} fontWeight={500}>
                        {oneDayTxns ? localNumber(oneDayTxns) : oneDayTxns === 0 ? 0 : '-'}
                      </TYPE.def>
                      <TYPE.def fontSize={16}>{txnChangeFormatted}</TYPE.def>
                    </RowBetween>
                </StyledCard>
                <Panel
                  style={{
                    gridColumn: below1080 ? '1' : '2/4',
                    gridRow: below1080 ? '' : '1/4',
                  }}
                >
                  <TokenChart address={address} color={backgroundColor} base={priceUSD} />
                </Panel>
              </PanelWrapper>
            </>

            <RowBetween  style={{ marginTop: '41px'}}>
              <TYPE.main fontSize={'24px'} color="#0B1359" >Top Pairs</TYPE.main>
              <ButtonLink to={'/pairs'}>See All</ButtonLink>
            </RowBetween>
            <Panel
              rounded
              style={{
                marginTop: '1.5rem',
                padding: '0 ',
              }}
            >
              {address && fetchedPairsList ? (
                <PairList color={backgroundColor} address={address} pairs={fetchedPairsList} />
              ) : (
                <Loader />
              )}
            </Panel>
            <RowBetween mt={40} mb={23}>
              <TYPE.main fontSize={'24px'} color="#0B1359">Transactions</TYPE.main> <div />
            </RowBetween>
            <Panel rounded style={{padding: 0}}>
              {transactions ? <TxnList color={backgroundColor} transactions={transactions} /> : <Loader />}
            </Panel>
            <>
              <RowBetween style={{ marginTop: '40px' }}>
                <TYPE.main fontSize={'24px'} color="#0B1359">Token Information</TYPE.main>{' '}
              </RowBetween>
              <Panel
                rounded
                style={{
                  marginTop: '1.5rem',
                }}
                p={20}
              >
                <TokenDetailsLayout>
                  <StyledPairInformationBlock isHeader>
                    <TYPE.def
                      fontSize={12}
                      style={{textTransform: 'uppercase'}}
                      fontWeight={700}>
                      Symbol
                    </TYPE.def>
                    <TYPE.def
                      fontSize={12}
                      style={{textTransform: 'uppercase'}}
                      fontWeight={700}>
                      Name
                    </TYPE.def>
                    <TYPE.def
                      fontSize={12}
                      style={{textTransform: 'uppercase'}}
                      fontWeight={700}>
                      Address
                    </TYPE.def>
                    <TYPE.def
                      fontSize={12}
                      style={{opacity: 0}}
                      fontWeight={700}>
                      Address
                    </TYPE.def>
                  </StyledPairInformationBlock>
                  <StyledPairInformationBlock style={{paddingLeft: '16px', marginTop: '16px', alignItems: 'center'}}>
                    <Text style={{ fontSize: '14px' }} fontSize={24} fontWeight="500">
                      <FormattedName text={symbol} maxCharacters={12} style={{color: '#6C5DD3'}}/>
                    </Text>
                    <TYPE.main style={{ fontSize: '14px' }} fontSize={24} fontWeight="400">
                      <FormattedName text={name} maxCharacters={16} />
                    </TYPE.main>
                    <AutoRow style={{alignItems: 'center'}}>
                      <TYPE.main style={{ fontSize: '14px', color: '#0B1359' }} fontSize={24} fontWeight="500">
                        {address.slice(0, 8) + '...' + address.slice(36, 42)}
                      </TYPE.main>
                      <CopyHelper toCopy={address} />
                    </AutoRow>
                    <ButtonLight color={'#6C5DD3'} style={{marginLeft: '21%'}}>
                      <Link external href={'https://bscscan.com/address/' + address}>
                        View on BscScan
                      </Link>
                    </ButtonLight>
                  </StyledPairInformationBlock>
                </TokenDetailsLayout>
              </Panel>
            </>
          </DashboardWrapper>
        </WarningGrouping>
      </ContentWrapper>
    </StyledPageWrapper>
  )
}

export default withRouter(TokenPage)

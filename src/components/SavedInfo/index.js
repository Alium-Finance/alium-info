import React, { useEffect, useState } from 'react'
import { ArrowRightIcon, BookmarkIcon, CloseIcon } from '../../svg/'
import styled from 'styled-components'
import { Text, Flex } from 'rebass'
import TokenLogo from '../TokenLogo'
import { useHistory } from 'react-router-dom'
import DoubleTokenLogo from '../DoubleLogo'

const StyledBookmarkIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  border-radius: 6px;
  transition: background-color 200ms ease-in-out;
  cursor: pointer;
  ${({ml})=>ml ? `margin-left: ${ml}px;` : ''}
  
  > svg {
    margin: auto;
  }
  
  > svg * {
    transition: stroke 200ms ease-in-out;
  }
  
  :hover {
    background-color: #6C5DD3;
    > svg * {
      stroke: white;
    }
  }
`

const StyledSaveContainer = styled.div`
  height: 100vh;
  width: 195px;
  position: fixed;
  right: ${({isOpened}) => isOpened ? '0' : '-100%'};
  top: 0;
  z-index: 100;
  background: #FFFFFF;
  box-shadow: -4px 0px 12px rgba(185, 189, 208, 0.4);
  transition: right 200ms ease-in-out;
`

const StyledInnerBlock = styled.div`
  padding: 40px 16px; 
`

const StyledFlex = styled(Flex)`
   > svg * {
      stroke: #6C5DD3;
   }
`

const StyledTokenInstance = styled.div`
  display: flex;
  align-items: center;
  background: #E6E6F6;
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
  justify-content: space-between;
  transition: background-color 200ms ease-in-out;
  :hover {
    background-color: #CBC8EE;
  }
  ${({mb})=>mb ? 'margin-bottom: 16px;' : ''}
  ${({isHidden})=>isHidden ? 'display: none;' : ''}
`

const StyledArrowRightIcon = styled(ArrowRightIcon)`
  > * {
    transition: stroke 200ms ease-in-out;
  }
  :hover {
    > * {
      stroke: #6C5DD3;
    }
  }
`

const TokenInstance = ({setIsRefreshed, selectedAddress, setIsSaved, address, symbol, mb}) => {
  const history = useHistory()

  const onDeleteAddressClickHandler = () => {
    let result = JSON.parse(window.localStorage.getItem('pinnedInfo'))
    result.tokens.splice(result.tokens.findIndex((token)=>token.address === address), 1)
    window.localStorage.setItem('pinnedInfo', JSON.stringify(Object.assign(JSON.parse(window.localStorage.getItem('pinnedInfo')), result)))
    setIsRefreshed(true);
    if(selectedAddress === address){
      setIsSaved(false);
    }
  }
  return (
    <StyledTokenInstance mb={mb}>
      <Flex alignItems="center" onClick={()=>history.push('/token/'+address)}>
        <TokenLogo address={address} />
        <Text color="#6C5DD3" fontSize={10} fontWeight={700} marginLeft="8px">{symbol}</Text>
      </Flex>
      <CloseIcon onClick={onDeleteAddressClickHandler}/>
    </StyledTokenInstance>
  )
}

const PairInstance = ({setIsRefreshed, selectedAddress, setIsSaved, address, address1, address2, symbol1, symbol2, mb}) => {
  const history = useHistory()

  const onDeleteAddressClickHandler = () => {
    let result = JSON.parse(window.localStorage.getItem('pinnedInfo'))
    result.pairs.splice(result.pairs.findIndex((pair)=>pair.address === address), 1)
    window.localStorage.setItem('pinnedInfo', JSON.stringify(Object.assign(JSON.parse(window.localStorage.getItem('pinnedInfo')), result)))
    setIsRefreshed(true);
    if(selectedAddress === address){
      setIsSaved(false);
    }
  }
  return (
    <StyledTokenInstance mb={mb}>
      <Flex alignItems="center" onClick={()=>history.push('/pair/'+address)}>
        <DoubleTokenLogo a0={address1} a1={address2} size={24} margin={true} />
        <Text color="#6C5DD3" fontSize={10} fontWeight={700} marginLeft="8px">{symbol1}/{symbol2}</Text>
      </Flex>
      <CloseIcon onClick={onDeleteAddressClickHandler}/>
    </StyledTokenInstance>
  )
}

const PinnedInfo = ({selectedAddress, setIsSaved, list, type, setIsRefreshed}) => {
  switch (type){
    case 'accounts':
      return <Text color="#8990A5" fontSize={14} fontWeight={400}>No pinned wallets</Text>
    case 'pairs':
      if(list?.length > 0)
        return (list.map((pair,index)=> <PairInstance setIsRefreshed={setIsRefreshed} selectedAddress={selectedAddress} setIsSaved={setIsSaved} address={pair.address} address1={pair.address1} address2={pair.address2} symbol1={pair.symbol1} symbol2={pair.symbol2} mb={index<list.length-1}/> ))
      return <Text color="#8990A5" fontSize={14} fontWeight={400}>Pinned pairs will appear here.</Text>
    case 'tokens':
      if(list?.length > 0)
        return (list.map((token,index)=> <TokenInstance setIsRefreshed={setIsRefreshed} selectedAddress={selectedAddress} setIsSaved={setIsSaved} address={token.address} symbol={token.symbol} mb={index<list.length-1}/> ))
      else
        return (<Text color="#8990A5" fontSize={14} fontWeight={400}>Pinned tokens will appear here.</Text>)
    default:
      return (<></>)
  }
}

const SavedInfo = ({ml, setIsSaved, selectedAddress}) => {

  const [isOpened, setIsOpened] = useState(false);
  const [pinnedTokensList, setPinnedTokensList] = useState();
  const [pinnedPairsList, setPinnedPairsList] = useState();
  const [isRefreshed, setIsRefreshed] = useState(false);

  const onClickHandler = (event) => {
    if(!event.target.closest(StyledSaveContainer) && !event.target.closest(StyledBookmarkIcon))
      setIsOpened(false)
  }

  useEffect(()=>{
    if(isOpened && window.localStorage.getItem('pinnedInfo')) {
      setPinnedTokensList(JSON.parse(window.localStorage.getItem('pinnedInfo')).tokens)
      setPinnedPairsList(JSON.parse(window.localStorage.getItem('pinnedInfo')).pairs)
      setIsRefreshed(false)
    }
  }, [isOpened, isRefreshed])

  useEffect(()=>{
    document.addEventListener('click', onClickHandler)
    return () => {
      document.removeEventListener('click', onClickHandler)
    }
  })

  // window.localStorage.setItem(UNISWAP, JSON.stringify({ ...state, [LAST_SAVED]: Math.floor(Date.now() / 1000) }))
  return (
    <>
    <StyledBookmarkIcon onClick={()=>setIsOpened(!isOpened)} ml={ml}>
      <BookmarkIcon />
    </StyledBookmarkIcon>
     <StyledSaveContainer isOpened={isOpened}>
        <StyledInnerBlock>
          <Flex alignItems="center" justifyContent="space-between">
            <StyledFlex alignItems="center">
              <BookmarkIcon />
              <Text
                color="#0B1359"
                fontSize={14}
                fontWeight={500}
                ml="8px">
                Saved
              </Text>
            </StyledFlex>
            <StyledArrowRightIcon style={{cursor: 'pointer'}} onClick={()=>setIsOpened(false)}/>
          </Flex>
          {/*<Text*/}
          {/*  color="#0B1359"*/}
          {/*  fontSize={18}*/}
          {/*  fontWeight={500}*/}
          {/*  mt={42}*/}
          {/*  mb={16}>*/}
          {/*    Accounts*/}
          {/*</Text>*/}
          {/*<PinnedInfo type={'accounts'} />*/}
          <Text
            color="#0B1359"
            fontSize={18}
            fontWeight={500}
            mt={42}
            mb={16}>
              Pinned Pairs
          </Text>
          <PinnedInfo type={'pairs'} list={pinnedPairsList} selectedAddress={selectedAddress} setIsSaved={setIsSaved} setIsRefreshed={setIsRefreshed}/>
          <Text
            color="#0B1359"
            fontSize={18}
            fontWeight={500}
            mt={32}
            mb={16}>
              Pinned Tokens
          </Text>
          <PinnedInfo type={'tokens'} list={pinnedTokensList} selectedAddress={selectedAddress} setIsSaved={setIsSaved} setIsRefreshed={setIsRefreshed}/>
        </StyledInnerBlock>
      </StyledSaveContainer>
    </>
  )
}

export { SavedInfo }

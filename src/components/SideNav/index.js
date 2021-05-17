import React, { useState } from 'react'
import styled from 'styled-components'
import { AutoColumn } from '../Column'
import Title from '../Title'
import { BasicLink } from '../Link'
import { useMedia } from 'react-use'
import { transparentize } from 'polished'
// import { TYPE } from '../../Theme'
import { withRouter } from 'react-router-dom'
import Link from '../Link'
// import { useSessionStart } from '../../contexts/Application'
import { ChevronMenuIcon, HomeIcon, PairsIcon, TokensIcon, TrendingIcon } from '../../svg'
import { LinksContainer } from '../LinksContainer'
// import { useDarkModeManager } from '../../contexts/LocalStorage'
// import Toggle from '../Toggle'

const Wrapper = styled.div`
  height: ${({ isMobile }) => (isMobile ? 'initial' : '100vh')};
  position: relative;
  // background-color: ${({ theme }) => transparentize(0.4, theme.bg1)};
  color: ${({ theme }) => theme.text1};
  padding: 28px 16px;
  position: sticky;
  top: 0px;
  z-index: 9999;
  box-sizing: border-box;
  background: #fff;
  // color: ${({ theme }) => theme.bg2};
  transition: width 200ms ease-in-out;
  width: ${({ isPushed }) => (isPushed ? '88px' : '256px')};

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    position: relative;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;
  }
`

const Option = styled.div`
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0px;
  opacity: 1;
  color: ${({ theme }) => theme.text1};
  display: flex;
  ${({ activeText }) =>
    activeText
      ? `color: #24BA7B;box-shadow: 0px 6px 12px rgba(185, 189, 208, 0.4);
  border-radius: 6px;`
      : ''}
  transition: color 200ms ease-in-out;
  height: 52px;

  svg * {
    ${({ activeText }) => (activeText ? 'stroke: #24BA7B' : '')}
    transition: stroke 200ms ease-in-out;
  }

  :hover {
    color: #24ba7b;
    svg * {
      stroke: #24ba7b;
    }
  }
`

const DesktopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  position: relative;
`

const MobileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

// const HeaderText = styled.div`
//   margin-right: 0.75rem;
//   font-size: 0.825rem;
//   font-weight: 500;
//   display: inline-box;
//   display: -webkit-inline-box;
//   opacity: 0.8;
//   :hover {
//     opacity: 1;
//   }
//   a {
//     color: ${({ theme }) => theme.white};
//   }
// `

// const Polling = styled.div`
//   position: fixed;
//   display: flex;
//   left: 0;
//   bottom: 0;
//   padding: 1rem;
//   color: white;
//   opacity: 0.4;
//   transition: opacity 0.25s ease;
//   :hover {
//     opacity: 1;
//   }
// `
// const PollingDot = styled.div`
//   width: 8px;
//   height: 8px;
//   min-height: 8px;
//   min-width: 8px;
//   margin-right: 0.5rem;
//   margin-top: 3px;
//   border-radius: 50%;
//   background-color: ${({ theme }) => theme.green1};
// `

const TogglePushButton = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  position: absolute;
  right: -28px;
  top: 8px;
  background: linear-gradient(0deg, #ffffff, #ffffff);
  box-shadow: 0px 6px 8px rgb(220 224 244 / 56%);
  border-radius: 40px;
  cursor: pointer;
  transition: background 200ms ease-in-out;

  :hover {
    background: linear-gradient(0deg, rgb(240, 240, 240), rgb(240, 240, 240));
  }

  > svg {
    margin: auto;
    ${({ isPushed }) => (isPushed ? 'transform: rotate(180deg)' : '')};
  }
`

function SideNav({ history, setIsPushedState }) {
  const below1080 = useMedia('(max-width: 1080px)')

  const [isPushed, setIsPushed] = useState(false)

  // const [isDark, toggleDarkMode] = useDarkModeManager()

  const onClickHandler = () => {
    setIsPushed(!isPushed)
    setIsPushedState(!isPushed)
  }

  return (
    <Wrapper isMobile={below1080} isPushed={isPushed}>
      {!below1080 ? (
        <DesktopWrapper>
          <TogglePushButton isPushed={isPushed}>
            <ChevronMenuIcon onClick={onClickHandler} />
          </TogglePushButton>
          <AutoColumn gap="1rem">
            <Title isPushed={isPushed} />
            {!below1080 && (
              <AutoColumn gap="4px" style={isPushed ? { marginTop: '45px', width: '55px' } : { marginTop: '45px' }}>
                <BasicLink to="/home">
                  <Option activeText={history.location.pathname === '/home' ?? undefined}>
                    {/*<TrendingUp size={20} style={{ marginRight: '.75rem' }} />*/}
                    <TrendingIcon style={{ marginRight: '16px' }} width="24px" />
                    {!isPushed ? 'Overview' : ''}
                  </Option>
                </BasicLink>
                <BasicLink to="/tokens">
                  <Option
                    activeText={
                      (history.location.pathname.split('/')[1] === 'tokens' ||
                        history.location.pathname.split('/')[1] === 'token') ??
                      undefined
                    }
                  >
                    <TokensIcon style={{ marginRight: '16px' }} width="24px" />
                    {!isPushed ? 'Tokens' : ''}
                  </Option>
                </BasicLink>
                <BasicLink to="/pairs">
                  <Option
                    activeText={
                      (history.location.pathname.split('/')[1] === 'pairs' ||
                        history.location.pathname.split('/')[1] === 'pair') ??
                      undefined
                    }
                  >
                    <PairsIcon style={{ marginRight: '16px' }} width="24px" />
                    {!isPushed ? 'Pairs' : ''}
                  </Option>
                </BasicLink>

                {/*<BasicLink to="/accounts">*/}
                {/*  <Option*/}
                {/*    activeText={*/}
                {/*      (history.location.pathname.split('/')[1] === 'accounts' ||*/}
                {/*        history.location.pathname.split('/')[1] === 'account') ??*/}
                {/*      undefined*/}
                {/*    }*/}
                {/*  >*/}
                {/*    <AccountIcon style={{ marginRight: '16px' }} width="24px"/>*/}
                {/*    {!isPushed ? 'Account' : ''}*/}
                {/*  </Option>*/}
                {/*</BasicLink>*/}

                <Link external href="https://exchange.alium.finance" style={{ marginLeft: '16px' }}>
                  <Option
                    activeText={
                      (history.location.pathname.split('/')[1] === '' ||
                        history.location.pathname.split('/')[1] === '') ??
                      undefined
                    }
                  >
                    <HomeIcon style={{ marginRight: '16px' }} width="24px" />
                    {!isPushed ? 'Alium Swap' : ''}
                  </Option>
                </Link>
              </AutoColumn>
            )}
            <LinksContainer />
          </AutoColumn>
          {/* <AutoColumn gap="0.5rem" style={{ marginLeft: '.75rem', marginBottom: '4rem' }}>
            <HeaderText>
              <Link href="http://aliumswap.com/" target="_blank">
                AliumSwap
              </Link>
            </HeaderText>
            <HeaderText>
              <Link href="https://docs.aliumswap.finance/" target="_blank">
                Docs
              </Link>
            </HeaderText>
            <HeaderText>
              <Link href="https://twitter.com/AliumSwap" target="_blank">
                Twitter
              </Link>
            </HeaderText>
            <Toggle isActive={isDark} toggle={toggleDarkMode} />
          </AutoColumn> */}
          {/*{!below1180 && (*/}
          {/*  <Polling style={{ marginLeft: '.5rem' }}>*/}
          {/*    <PollingDot />*/}
          {/*    <a href="/" style={{ color: 'white' }}>*/}
          {/*      <TYPE.small color={'black'}>*/}
          {/*        Updated {!!seconds ? seconds + 's' : '-'} ago <br />*/}
          {/*      </TYPE.small>*/}
          {/*    </a>*/}
          {/*  </Polling>*/}
          {/*)}*/}
        </DesktopWrapper>
      ) : (
        <MobileWrapper>
          <Title />
        </MobileWrapper>
      )}
    </Wrapper>
  )
}

export default withRouter(SideNav)

import React from 'react'
import styled from 'styled-components'
import { GitHubIcon, TelegramIcon, TwitterIcon, MediumIcon, CoinGeckoIcon } from '../../svg'

const StyledContainer = styled.div`
  position: absolute;
  bottom: 41px;
  width: 100%;
`

const StyledLinks = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  flex-flow: wrap;
`

const StyledLink = styled.a`
  cursor: pointer;
  svg * {
    transition: fill 200ms ease-in-out;
  }
  :hover {
    svg * {
      fill: #6c5dd3;
    }
  }
  margin-bottom: 20px;
`

const LinksContainer = () => {
  return (
    <StyledContainer>
      <StyledLinks>
        <StyledLink href="https://github.com/Aliumswap" target={'_blank'}>
          <GitHubIcon />
        </StyledLink>
        <StyledLink href="https://t.me/aliumswap_official" target={'_blank'}>
          <TelegramIcon />
        </StyledLink>
        <StyledLink href="https://twitter.com/AliumSwap" target={'_blank'}>
          <TwitterIcon />
        </StyledLink>
        <StyledLink href="https://aliumswap.medium.com/" target={'_blank'}>
          <MediumIcon />
        </StyledLink>
        <StyledLink href="https://www.coingecko.com/en/coins/alium-swap" target={'_blank'}>
          <CoinGeckoIcon />
        </StyledLink>
      </StyledLinks>
    </StyledContainer>
  )
}

export { LinksContainer }

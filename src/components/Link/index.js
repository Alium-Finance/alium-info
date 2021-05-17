import React from 'react'
import { Link as RebassLink } from 'rebass'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { lighten, darken } from 'polished'

const WrappedLink = ({ external, children, ...rest }) => (
  <RebassLink
    target={external ? '_blank' : null}
    rel={external ? 'noopener noreferrer' : null}
    color="#2f80ed"
    {...rest}
  >
    {children}
  </RebassLink>
)

WrappedLink.propTypes = {
  external: PropTypes.bool,
}

const Link = styled(WrappedLink)`
  color: ${({ color, theme }) => (color ? color : theme.link)};
  div {
    display: flex;
    align-items: center;
  }
`

export default Link

export const CustomLink = styled(RouterLink)`
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  color: ${({ color, theme }) => (color ? color : theme.link)};

  &:visited {
    color: ${({ color, theme }) => (color ? lighten(0.1, color) : lighten(0.1, theme.link))};
  }

  &:hover {
    cursor: pointer;
    text-decoration: none;
    underline: none;
    color: ${({ color, theme }) => (color ? darken(0.1, color) : darken(0.1, theme.link))};
  }
`

export const ButtonLink = styled(RouterLink)`
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  border-radius: 6px;
  padding: 6px 16px;
  color: #6c5dd3; // ${({ color, theme }) => (color ? color : theme.link)};
  border: 1px solid #6c5dd3;
  transition: background-color, color 200ms ease-in-out;

  // &:visited {
  //   color: ${({ color, theme }) => (color ? lighten(0.1, color) : lighten(0.1, theme.link))};
  // }

  &:hover {
    cursor: pointer;
    text-decoration: none;
    underline: none;
    background-color: #8677f0;
    color: #fff;
  }

  &:active {
    background-color: #6c5dd3;
    box-shadow: inset 0px 3px 0px #5b4dbc;
  }
`

export const BasicLink = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
  > div {
    display: flex;
    align-items: center;
    padding-left: 16px;
  }
  &:hover {
    cursor: pointer;
    text-decoration: none;
    underline: none;
  }
  height: 52px;
`

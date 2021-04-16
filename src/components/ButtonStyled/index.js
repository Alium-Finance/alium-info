import React from 'react'
import { Button as RebassButton } from 'rebass/styled-components'
import styled from 'styled-components'
import { Plus, ChevronDown, ChevronUp } from 'react-feather'
import { darken, transparentize } from 'polished'
import { RowBetween } from '../Row'
import { StyledIcon } from '..'

const Base = styled(RebassButton)`
  padding: 8px 12px;
  font-size: 0.825rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  outline: none;
  border: 1px solid transparent;
  outline: none;
  border-bottom-right-radius: ${({ open }) => open && '0'};
  border-bottom-left-radius: ${({ open }) => open && '0'};
`

const BaseCustom = styled(RebassButton)`
  padding: 16px 12px;
  font-size: 0.825rem;
  font-weight: 400;
  border-radius: 12px;
  cursor: pointer;
  outline: none;
`

const Dull = styled(Base)`
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: black;
  height: 100%;
  font-weight: 400;
  &:hover,
  :focus {
    background-color: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.25);
  }
  &:focus {
    box-shadow: 0 0 0 1pt rgba(255, 255, 255, 0.25);
  }
  &:active {
    background-color: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.25);
  }
`

export default function ButtonStyled({ children, ...rest }) {
  return <Base {...rest}>{children}</Base>
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const ButtonLight = styled(Base)`
  // background-color: ${({ color, theme }) =>
    color ? transparentize(0.9, color) : transparentize(0.9, theme.primary1)};
  // color: ${({ color, theme }) => (color ? darken(0.1, color) : theme.primary1)};
  color: #6c5dd3;
  border: 1px solid #6c5dd3;
  background-color: transparent;
  padding: 12px 24px;

  min-width: fit-content;
  border-radius: 6px;
  white-space: nowrap;
  transition: all 200ms ease-in-out;

  a {
    color: ${({ color }) => (color ? color : '#6C5DD3')};
    transition: all 200ms ease-in-out;
  }

  svg * {
    transition: all 200ms ease-in-out;
  }

  :hover {
    background-color: #8677f0;
    a {
      color: white;
    }
    svg * {
      stroke: white;
    }
  }
`

export function ButtonDropdown({ disabled = false, children, open, ...rest }) {
  return (
    <ButtonFaded {...rest} disabled={disabled} ope={open}>
      <RowBetween>
        <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
        {open ? (
          <StyledIcon>
            <ChevronUp size={24} />
          </StyledIcon>
        ) : (
          <StyledIcon>
            <ChevronDown size={24} />
          </StyledIcon>
        )}
      </RowBetween>
    </ButtonFaded>
  )
}

export const ButtonDark = styled(Base)`
  background-color: #6c5dd3;
  padding: 12px 24px;
  color: white;
  width: fit-content;
  border-radius: 6px;
  white-space: nowrap;
  user-select: none;

  :hover {
    :hover {
      background-color: #8677f0;
      color: white;
    }
  }
`

export const ButtonFaded = styled(Base)`
  background-color: ${({ theme }) => theme.bg2};
  color: (255, 255, 255, 0.5);
  white-space: nowrap;

  :hover {
    opacity: 0.5;
  }
`

export function ButtonPlusDull({ disabled, children, ...rest }) {
  return (
    <Dull {...rest}>
      <ContentWrapper>
        <Plus size={16} />
        <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
      </ContentWrapper>
    </Dull>
  )
}

export function ButtonCustom({ children, bgColor, color, ...rest }) {
  return (
    <BaseCustom bg={bgColor} color={color} {...rest}>
      {children}
    </BaseCustom>
  )
}

export const OptionButton = styled.div`
  font-weight: 500;
  width: fit-content;
  white-space: nowrap;
  padding: 6px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.bg4};
  background-color: ${({ active, theme }) => active && theme.bg3};
  color: ${({ theme }) => theme.text1};

  :hover {
    cursor: ${({ disabled }) => !disabled && 'pointer'};
  }
`

export const SelectorOptionButton = styled.div`
  font-weight: 500;
  width: fit-content;
  white-space: nowrap;
  padding: 6px 10px;
  ${({ active }) => (active ? 'background: #6C5DD3;' : '')}

  border-radius: 6px;
  color: ${({ active }) => (active ? '#fff' : '#8990A5')};

  :hover {
    cursor: ${({ disabled }) => !disabled && 'pointer'};
  }
`

export const ChartOptionButton = styled.div`
  font-weight: 500;
  width: fit-content;
  white-space: nowrap;
  padding: 8px;
  background: #ebedf9;
  border: 1px solid ${({ active }) => (active ? '#6C5DD3;' : '#8990A5')};
  box-sizing: border-box;
  border-radius: 6px;
  background-color: ${({ active }) => (active ? '#EBEDF9' : '#FFFFFF')};
  cursor: pointer;
  transition: background-color 200ms ease-in-out;
  color: ${({ active }) => (!active ? '#8990A5' : '#6C5DD3')};
  user-select: none;
  
  :hover {
    background-color: #ebedf9;
  }

  :hover {
    cursor: ${({ disabled }) => !disabled && 'pointer'};
  }
`

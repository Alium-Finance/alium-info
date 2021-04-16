import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 25" fill="none" {...props}>
      <circle
        cx="12"
        cy="12.9976"
        r="9.75"
        stroke="#8990A5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        opacity="0.5"
        cx="12"
        cy="12.9976"
        r="7"
        stroke="#8990A5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.5"
        d="M16 12.9976C16 10.7884 14.2091 8.99756 12 8.99756"
        stroke="#8990A5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Icon

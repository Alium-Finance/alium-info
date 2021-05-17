import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 25" fill="none" {...props}>
      <path
        d="M19.3969 6.64157L13.2173 12.8212L10.591 10.195L4.00012 16.7504"
        stroke="#8990A5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.2351 10.0398V5.91956L16.0684 5.91956"
        stroke="#8990A5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.5"
        d="M19.2692 16.8243L15.8273 20.2605L13.0796 17.5128L8.57908 21.9976L5.49829 21.9574M20.1531 20.1215V16.0012H15.9863"
        stroke="#8990A5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Icon

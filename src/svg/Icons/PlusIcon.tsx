import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 6V18" stroke="#6C5DD3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 11.9999H6" stroke="#6C5DD3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}

export default Icon

import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 24 25" fill="none" {...props}>
      <path
        opacity="0.5"
        d="M14.9338 21.9974C14.9338 22.4116 15.2696 22.7474 15.6838 22.7474H8.31543C8.72964 22.7474 9.06544 22.4116 9.06544 21.9974V15.7861H14.9338V21.9974Z"
        stroke="#8990A5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5965 5.44947C13.1455 4.05721 10.8547 4.05721 9.40369 5.44947L4.77725 9.88881C4.43668 10.2156 4.2076 10.6413 4.12247 11.1056C3.53794 14.2932 3.49479 17.5566 3.99484 20.7585L4.1756 21.916C4.25035 22.3947 4.66264 22.7476 5.14712 22.7476H9.31585H14.6843H18.853C19.3375 22.7476 19.7498 22.3947 19.8246 21.916L20.0053 20.7585C20.5054 17.5566 20.4622 14.2932 19.8777 11.1056C19.7926 10.6413 19.5635 10.2156 19.2229 9.88881L14.5965 5.44947Z"
        stroke="#8990A5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Icon

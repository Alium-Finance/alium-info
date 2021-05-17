import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M14 8L18 12L14 16" stroke="#8990A5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 12L7.6709 12" stroke="#8990A5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
};

export default Icon;

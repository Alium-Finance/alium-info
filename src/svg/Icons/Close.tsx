import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <path d="M5.81836 12.182L12.1823 5.81806M5.81836 5.81805L12.1823 12.182" stroke="#8990A5" strokeWidth="1.5" strokeLinecap="round"/>
    </Svg>
  );
};

export default Icon;

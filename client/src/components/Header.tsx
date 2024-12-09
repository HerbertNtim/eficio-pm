/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type Props = {
  name: string;
  buttonComponent?: any;
  isSmallText?: boolean;
};

function Header({ name, buttonComponent, isSmallText }: Props) {
  return(
    <div className="flex items-center justify-between">
    <h1 className={`${isSmallText ? 'text-lg' : 'text-2xl'} dark:text-white font-bold`}>
      {name}
    </h1>
    {buttonComponent}
  </div>
  )
}

export default Header;

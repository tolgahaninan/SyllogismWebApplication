import { useState } from "react";

const UseDropdown = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return [isShowing, toggle];
};
export default UseDropdown;

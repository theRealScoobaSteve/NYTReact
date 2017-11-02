import React from "react";

export const ROW = ({ fluid, children }) =>
  <div className={`row${fluid ? "-fluid" : ""}`}>
    {children}
  </div>;

import React, { useEffect } from "react";

const Letter = props => {
  return (
    <div className="col">
      <div className="p-3 border border-dark">{props.value}</div>
    </div>
  )
}

export default Letter
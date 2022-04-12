import React from "react";

const Letter = props => {
  return (
    <div className="col">
      <div className={"p-3 border border-dark " + props.colour}>{props.value}</div>
    </div>
  )
}

export default Letter
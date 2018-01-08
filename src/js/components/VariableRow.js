import React from "react";

const getRowCallback = (variable, namespace, callback) => {
  let location = [...namespace];
  location.shift();
  return (e) => {
    e.stopPropagation();
    callback({
      ...variable,
      namespace: location
    });
  };
}

export default ({
  onMouseEnter,
  onMouseLeave,
  onSelect,
  namespace,
  children,
  variable,
  ...props
}) => {
  console.log(namespace);

  return <div
    style={props.style}
    class={props.class}
    key={props.key}
    onClick={ !onSelect || props.collapseOnNameClick ? null : getRowCallback(variable, namespace, onSelect) }
    onMouseEnter={ !onMouseEnter ? null : getRowCallback(variable, namespace, onMouseEnter) }
    onMouseLeave={ !onMouseLeave ? null : getRowCallback(variable, namespace, onMouseLeave) }
  >
    {children}
  </div>

}
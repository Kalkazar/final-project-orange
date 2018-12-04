import React from 'react'

/**
 *
 * @param {Any} props Contains a props.wrapper to style the div containing the icon,
 * a props.iconClass which takes a font awesome icon class, and a props.onClick which takes
 * an onClick function that tells the icon how to behave when clicked.
 */
const Icon = props => (
  <div className={props.wrapper}>
    <i className={props.iconClass} onClick={props.onClick} />
  </div>
)

export default Icon

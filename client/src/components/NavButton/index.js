import React from 'react'
import styles from './navButton.module.scss'
import { NavLink } from 'react-router-dom'

export const NavButton = ({ text, route, onClick }) => (
  <NavLink
    to={route}
    activeClassName={styles.activeNav}
    className={styles.navButton}
    onClick={onClick}
  >
    <div className={styles.navButtonText}>{text}</div>
  </NavLink>
)

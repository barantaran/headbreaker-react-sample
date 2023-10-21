import React from 'react';
import PropTypes from 'prop-types';
import styles from './RootMenu.module.css';
import { NavLink } from 'react-router-dom';

const RootMenu = () => (
  <div className={styles.RootMenu}>
    RootMenu Component
    <br />
    <NavLink to="/DemoPuzzle">DemoPuzzle</NavLink>
  </div>
);

RootMenu.propTypes = {};

RootMenu.defaultProps = {};

export default RootMenu;

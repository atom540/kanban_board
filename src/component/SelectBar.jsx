import React, { useState } from 'react';
import './SelectBar.css';
import TuneIconSVG from '../assets/Display.svg'; // Import your SVG file for Tune Icon
import ArrowDropDownSVG from '../assets/down.svg'; // Import your SVG file for Arrow Dropdown

const Navbar = ({ setGrouping, setOrdering }) => {
  const groupingOptions = [ 'Status', 'User', 'Priority'];
  const orderingOptions = [ 'Title', 'Priority'];

  const [optionsVisible, setOptionsVisible] = useState(false);

  const toggleOptions = () => setOptionsVisible(!optionsVisible);

  return (
    <nav className="navbar">
      <button className="dropdown-btn" onClick={toggleOptions}>
        <img src={TuneIconSVG} alt="Tune Icon" className="icon" />
        <span className="dropdown-text">Display</span>
        <img src={ArrowDropDownSVG} alt="Arrow Down Icon" className="icon" />
      </button>
      {optionsVisible && (
    

        <div className="dropdown-menu">
          <div className="dropdown-item">
            <label htmlFor="grouping">Grouping</label>
            <select
              id="grouping"
              onChange={(e) => {
                const value = e.target.value;
                localStorage.setItem('grouping', value);
                setGrouping(value);
              }}
              defaultValue={localStorage.getItem('grouping') || 'None'}
            >
              {groupingOptions.map((group, idx) => (
                <option key={idx} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          <div className="dropdown-item">
            <label htmlFor="ordering">Ordering</label>
            <select
              id="ordering"
              onChange={(e) => {
                const value = e.target.value;
                localStorage.setItem('ordering', value);
                setOrdering(value);
              }}
              defaultValue={localStorage.getItem('ordering') || 'None'}
            >
              {orderingOptions.map((order, idx) => (
                <option key={idx} value={order}>
                  {order}
                </option>
              ))}
            </select>
          </div>
        </div>
       
      )}
    </nav>
  );
};

export default Navbar;

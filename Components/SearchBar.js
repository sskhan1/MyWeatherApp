import React, { useState } from "react";
import SearchIcon from '../images/svg/SearchIcon';
import { getWeather, addToSearchHistory, clearSearchHistory } from '../redux/reducers/weatherSlice';
import { useDispatch, useSelector } from "react-redux";
import Divider from '@mui/material/Divider';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const SearchBar = () => {
  const [city, setCity] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const searchHistory = useSelector((state) => state.weather.searchHistory.slice(-5));
  const { data, loading, error } = useSelector((state) => state.weather);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (value) => {
    setCity(value);
    handleClose();
  };




  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleClearHistory = () => {
    dispatch(clearSearchHistory());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getWeather(city)).then((response) => {
      if (response.type == "weather/getWeather/fulfilled") {
        if (!searchHistory.includes(city))
          dispatch(addToSearchHistory(city));
      }
    });
  };

  return (
    <div className="relative mt-4 flex flex-row">
      <form className="flex flex-auto" onSubmit={handleSubmit} >
        <div onClick={handleClick} className="flex flex-auto">
          <input
            type="text"
            placeholder="Search the City"
            value={city}
            onChange={handleInputChange}
            className="pl-10 h-8 pr-4 py-2 w-full border border-black-300 rounded-l-lg focus:outline-none"
          />

          <div className="absolute left-2 flex mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        <Menu
          id="demo-positioned-menu"
          anchorEl={anchorEl}
          open={searchHistory.length > 0 ? open : false}
          className="mt-8"
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {searchHistory ? (
            searchHistory.map((val) => (
              <MenuItem
                key={val}
                onClick={() => handleMenuItemClick(val)}
              >
                {val}
              </MenuItem>
            ))
          ) : (
            <MenuItem>No Search History</MenuItem>
          )}

          <Divider />

          <MenuItem onClick={handleClearHistory}> Clear History</MenuItem>


        </Menu>

        <div className="relative h-8">
          <button className=" px-3 font-bold h-8 text-white bg-blue-500 rounded-sm hover:bg-blue-600 rounded-r-lg"
            type="submit"
            disabled={loading || !city}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

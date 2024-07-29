import React, { useRef, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import useOutsideClick from "../hooks/useOutsideClick";
function Header() {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="headerSearchInput"
            placeholder="Where to go?"
            type="text"
            name="destination"
            id="destination"
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown">2024/07/27</div>
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div onClick={() => setOpenOptions(!openOptions)} id="optionDropDown">
            {options.adult} adult &bull; {options.children} children &bull;
            {options.room} room
          </div>
          {openOptions && (
            <div className="guestOptions">
              <GuestOptionsList
                handleOption={handleOption}
                options={options}
                setOpenOptions={setOpenOptions}
              />
            </div>
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionsList({ options, handleOption, setOpenOptions }) {
  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false));
  return (
    <div className="guestOption" ref={optionsRef}>
      <OptionItem
        handleOption={handleOption}
        type="adult"
        options={options}
        minlimit={1}
      />
      <OptionItem
        handleOption={handleOption}
        type="children"
        options={options}
        minlimit={1}
      />
      <OptionItem
        handleOption={handleOption}
        type="room"
        options={options}
        minlimit={1}
      />
    </div>
  );
}

function OptionItem({ options, type, minlimit, handleOption }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          onClick={() => handleOption(type, "dec")}
          className="optionCounterBtn"
          disabled={options[type] <= minlimit}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          onClick={() => handleOption(type, "inc")}
          className="optionCounterBtn"
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}

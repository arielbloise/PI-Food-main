import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
// import navimg from './navimg.png'

const NavBar = ({ onSearch }) => {
  return (
    <div className={style.NavBar}>
     
     <div className={style.NavLinks}>
 
      <NavLink to="/home">
        <button>HOME</button>
      </NavLink>

      </div>

     {/* <img src={navimg} alt="Logo" className={style.NavLogo} /> */}

      <SearchBar onSearch={onSearch} />

    </div>
  );
};

export default NavBar;

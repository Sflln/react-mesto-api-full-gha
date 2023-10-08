import logo from '../images/logo-header.svg';
import { Link } from "react-router-dom";
import React, {useState} from 'react';

//--- Компонент шапки сайта ---
function Header({text, link, login, onClick}) {
  const [isOpen, setIsOpen] = useState(false);
  function openMenu() {
    setIsOpen(!isOpen);
  }
  return (
    <header className={`header ${isOpen && "header__menu_active"}`}>
      <div className={`header__nav ${isOpen && "header__nav_active"}`}>
        <h3 className={`header__login ${isOpen && "header__login_active"}`}>{login}</h3>
        <Link onClick={onClick} to={link} className={`header__link header__link_nav ${isOpen && "header__link_active"}`}>{text}</Link>
      </div>
        <img src={logo} alt="логотип" className="header__logo"/>
        <div className='header__union'>
        <h3 className='header__login'>{login}</h3>
        <Link onClick={onClick} to={link} className='header__link'>{text}</Link>
        </div>
        <button type='button' className={`header__burger ${isOpen && "header__burger_active"}`} onClick={openMenu}/>
    </header>
  )
}

export default Header;
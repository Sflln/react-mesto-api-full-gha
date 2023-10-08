import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const Login = ({handleLogin}) =>{
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    function handleSubmit(evt) {
        evt.preventDefault();
        handleLogin(data);
      }

    const handleChange = (e) =>{
    const {name, value} = e.target;
    setData((data)=>({
        ...data, 
        [name]: value,
    }));
    }

    return (
        <>
          <Header text={'Регистрация'} link="/sign-up" />
          <div className="authorization">
          <h3 className="autorization__title">Вход</h3>
            <form onSubmit={handleSubmit}
                  className="autorization__form">
              <input type="email"
                     required
                     minLength="2"
                     maxLength="200"
                     name="email"
                     className="authorization__data"
                     value={data.email}
                     onChange={handleChange}
                     placeholder="E-mail"
              />
              <input type="password"
                     required
                     minLength="2"
                     maxLength="200"
                     name="password"
                     className="authorization__data"
                     value={data.password}
                     onChange={handleChange}
                     placeholder="Password"
              />
              <button className="authorization__button" type="submit">Войти</button>
              <Link to="/sign-up" className="authorization__login-text">Нет учетной записи? Зарегистрироваться</Link>
            </form>
          </div>
        </>
      );
}

export default Login;
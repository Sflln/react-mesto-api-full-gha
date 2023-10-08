import React, {useState} from "react";
import { Link } from "react-router-dom";
import Header from "./Header";


function Register({handleRegister}){
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setData((data)=>({
            ...data, 
            [name]: value,
        }));
    }

    const handleSubmit =(e) =>{
        e.preventDefault();
        handleRegister(data);
    }

    return(
        <>
        <Header text={'Войти'} link="/sign-in"/>
        <div className="authorization">
            <h1 className="autorization__title">Регистрация</h1>
            <form className="autorization__form" onSubmit={handleSubmit}>
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
          <button className="authorization__button" type="submit">Зарегистрироваться</button>
          <Link to="/sign-in" className="authorization__login-text" >Уже зарегистрированы? Войти</Link>
            </form>
        </div>
        </>
    );
}

export default Register;
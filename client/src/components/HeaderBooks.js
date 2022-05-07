import React from 'react'
import 'bootstrap'
import '../styles/Header.css'
import {Link} from "react-router-dom"
export  const HeaderBooks = () =>{
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-green">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand mb-0 h1">Читалочка Минор</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-3 mb-lg-0 menu">

                        <li className="nav-item " id="myBook"><Link to='/' className="nav-link activeLink">Мои книги</Link></li>
                        <li className="nav-item " id="addbook"><Link to='/addbook' className="nav-link ">Добавить</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
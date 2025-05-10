// src/components/Header.jsx
import React from 'react';
import './Header.css'; // стили для шапки

function Header() {
    return (
        <header className="header">
            <div className={"container header-container"}>
                <nav className="nav">
                    <div className="logo">AFACI</div>
                    <ul className="nav-links">
                        <li><a href="/">Главная</a></li>
                        <li><a href="/products">Продукты по регионам</a></li>
                        <li><a href="/national">Национальные блюда</a></li>
                        <li><a href="#about">О нас</a></li>
                        {/*<li><a href="/productDetail">Product Detail Test</a></li>*/}
                    </ul>
                    <div className="auth">
                        <a href="/auth" className="login">Войти</a>
                    </div>
                </nav>
            </div>
        </header>
    );
}
export default Header;
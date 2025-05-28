// src/components/Hero.jsx
import React from 'react';
import './Hero.css';


function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>
                    <span className="small-text">База данных</span> <br/>
                    <span className="big-text">Продуктов питания</span><br />
                    <span className="big-text">Кыргызской Республики</span>
                </h1>
                <button className="hero-button">Подробнее</button>
            </div>
        </section>
    );
}

export default Hero;
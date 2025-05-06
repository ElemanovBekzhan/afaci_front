import React from 'react';
import './Stats.css';

function Stats() {
    return (
        <section className="stats">
            <div className="stat-box">
                <h2>253</h2>
                <p>Продуктов в базе</p>
            </div>
            <div className="stat-box">
                <h2>6</h2>
                <p>Категорий</p>
            </div>
        </section>
    );
}

export default Stats;
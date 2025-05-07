// src/components/Categories.jsx
import React from 'react';
import './Categories.css';

const categoriesData = [
    { name: 'Овощи', image: '/images/Pomidor.png' },
    { name: 'Мясо', image: '/images/Meat.png' },
    { name: 'Молочные продукты', image: '/images/Milk.png' },
    { name: 'Зерновые', image: '/images/Zerno.png' },
    { name: 'Сыпучий продукт', image: '/images/Ris.png' },
    { name: 'Грибы', image: '/images/Grib.png' },
];

function Categories() {
    return (
        <section className="categories">
            <h2>Категории продуктов</h2>
            <div className="categories-grid">
                {categoriesData.map((cat) => (
                    <div className="category-card" key={cat.name}>
                        <img src={cat.image} alt={cat.name} />
                        <p>{cat.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Categories;

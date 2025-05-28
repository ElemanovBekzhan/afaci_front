// src/components/Categories.jsx
import React from 'react';
import './Categories.css';

const categoriesData = [
    { name: 'Овощи', image: '/images/Pomidor.png' },
    { name: 'Мясные продукты', image: '/images/Meat.png' },
    { name: 'Рыбные продукты', image: '/images/Fish2.png' },
    { name: 'Молочные продукты', image: '/images/Milk.png' },
    { name: 'Жировые продукты', image: '/images/Jir.png' },
    { name: 'Зерно и продукты его переработки', image: '/images/Zerno.png' },
    { name: 'Бобовые', image: '/images/bob.png' },
    { name: 'Фрукты', image: '/images/Fruitss.png' },
    { name: 'Кондитерские изделия', image: '/images/Bakery.png' },
    { name: 'Напитки', image: '/images/Drinks.png' },
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

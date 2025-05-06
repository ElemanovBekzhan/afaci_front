// src/pages/NationalPage.jsx
import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './NationalPage.css';

import defaultImg from './OIP.jpeg';


export default function NationalPage() {
    const navigate = useNavigate();
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // Маппинг id -> фото
    const imageMap = {
        // '9b72eed9-8838-4c2f-916f-6ee4dcf1ebeb': img1,
        // '9f2e390e-eb82-40a5-b504-a7a87206118d': img2,
        // '011b001a-acea-4d88-9a33-e1f93de89776': img3,
        // '70af4804-861d-4c52-8071-40a7241b4aec': img4,
        // '94a41920-c95f-44fa-9f0e-5d176768aab8': img5,
        // '175cc445-e554-483c-adfe-1a76657cdd8e': img6,
        // '265a99af-43c7-4a58-b7f3-44b65f27c6fa': img7,
        // '769dffb3-140a-42cb-ae96-3b7a61117f07': img8,
        // '3017ebeb-7fcb-4849-a1d4-d3e59f490301': img9,
        // '9433f5b7-dd64-44a6-9514-40991f724163': img10,
        // '99623b65-3777-4f88-a6ec-e7510018941b': img11,
        // '679754ce-8400-4001-a55a-de54ce5471a8': img12,
        // 'a987f8c8-ef7c-42db-90f1-2bd9ea451678': img13,
        // 'b3dbe602-0074-405c-8519-2e2500c36d4b': img14,
        // /*'c6617ad5-fbc4-45f7-a77d-1fc85bce353d': img15,
        // 'cb4f19cc-0619-494f-8e21-8585ca915e53': img16,
        // 'e822ed57-59bc-4c26-9697-86d440636368': img17,
        // 'e15512fc-9c23-4df1-9bc8-ac101f2d6b16': img18,
        // 'edbec78d-20e9-4cbc-8f59-07f946fe9530': img19,
        // 'f79f9ed9-89b6-4f6f-91ac-7c684aa49f5c': img20,*/
    };

    useEffect(() => {
        fetch('http://localhost:9876/api/product/national', { mode: 'cors' })
            .then(res => {
                if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
                return res.json();
            })
            .then(data => setDishes(data))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, []);

    const formatDate = iso => {
        if (!iso) return '-';
        const d = new Date(iso);
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        return `${day}-${month.toString().padStart(2, '0')}-${year}`;
    };

    if (loading) return <div className="np-loading">Загрузка...</div>;
    if (error)   return <div className="np-error">Ошибка: {error.message}</div>;
    return (
        <div className="national-page">
            <h1 className="page-title">Национальные блюда Кыргызстана</h1>
            <div className="dishes-grid">
                {dishes.map(item => {
                    // для каждого блюда выбираем картинку по id
                    const imgSrc = imageMap[item.id] || defaultImg;
                    return (
                        <div
                            key={item.id}
                            className="dish-card"
                            onClick={() => navigate(`/products/${item.id}`)}
                        >
                            <div className="card-image">
                                                              {/*<img src="../pages/OIP.jpeg"/>*/}
                                                              <img
                                                                  src={imgSrc}
                                                                  alt={item.name}
                                                                  className="dish-photo"
                                                              />
                            </div>
                            <div className="card-content">
                                <h2 className="dish-name">{item.name}</h2>
                                <p className="dish-info">Категория: {item.categories}</p>
                                <p className="dish-info">Регион: {item.region}</p>
                                <p className="dish-date">{formatDate(item.date)}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

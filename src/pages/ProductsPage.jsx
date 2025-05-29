// src/pages/ProductsPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductsPage.css';


export default function ProductsPage() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    const [categoriesList, setCategoriesList] = useState([]);
    const [regionsList, setRegionsList] = useState([]);

    const ITEMS_PER_PAGE = 10;
    const API = process.env.REACT_APP_API_URL
    // Загрузка списков категорий и регионов

    useEffect( () => {
        fetch(`${API}/product/getCategoryList`, { mode: 'cors' })
            .then(res => res.ok ? res.json() : [])
            .then(setCategoriesList)
            .catch(() => setCategoriesList([]));
        fetch(`${API}/product/getRegionsList`, { mode: 'cors' })
            .then(res => res.ok ? res.json() : [])
            .then(setRegionsList)
            .catch(() => setRegionsList([]));
    }, []);

    // Базовый запрос страницы
    const loadPage = useCallback(() => {
        setLoading(true);
        setError(null);
        fetch(`${API}/product?page=${page}&size=${ITEMS_PER_PAGE}`, { mode: 'cors' })
            .then(res => {
                if (!res.ok) throw new Error(res.status);
                return res.json();
            })
            .then(({ content, totalPages }) => {
                setProducts(prev => page === 1 ? content : [...prev, ...content]);
                setTotalPages(totalPages);
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [page]);

    // Поиск без пагинации
    const doSearch = useCallback(() => {
        if (!searchTerm) return;
        setLoading(true);
        fetch(`${API}/product/search?name=${encodeURIComponent(searchTerm)}`, { mode: 'cors' })
            .then(res => res.json())
            .then(list => setProducts(list))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [searchTerm]);

    // Фильтрация по категории без пагинации
    const doFilterCategory = useCallback(() => {
        if (!selectedCategory) return;
        setLoading(true);
        fetch(`${API}/product/searchcategory?id=${encodeURIComponent(selectedCategory)}`, { mode: 'cors' })
            .then(res => res.json())
            // .then(list => setProducts(list))
            .then(data => {
                const list = Array.isArray(data) ? data : (data.content || []);
                setProducts(list);
                setTotalPages(data.totalPages || 1);
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [selectedCategory]);

    /*// Фильтрация по региону без пагинации
    const doFilterRegion = useCallback(() => {
        if (!selectedRegion) return;
        setLoading(true);
        fetch(`http://localhost:9876/api/product/searchregion?id=${encodeURIComponent(selectedRegion)}`, { mode: 'cors' })
            .then(res => res.json())
            .then(list => setProducts(list))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [selectedRegion]);*/
    // Фильтрация по региону без пагинации
    // Фильтрация по региону без пагинации
    const doFilterRegion = useCallback(() => {
        if (!selectedRegion) return;
        setLoading(true);
        setError(null);
        fetch(
            `${API}/product/searchregion?id=${encodeURIComponent(
                selectedRegion
            )}`,
            { mode: 'cors' }
        )
            .then(res => {
                if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
                return res.json();
            })
            .then(data => {
                // Ожидаем массив результатов
                const list = Array.isArray(data) ? data : (data.content || []);
                setProducts(list);
                setTotalPages(data.totalPages || 1);
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [selectedRegion]);

    // При изменении page/search/category/region
    useEffect(() => {
        if (searchTerm) {
            doSearch();
        } else if (selectedCategory) {
            doFilterCategory();
        } else if (selectedRegion) {
            doFilterRegion();
        } else {
            loadPage();
        }
    }, [page, searchTerm, selectedCategory, selectedRegion, loadPage, doSearch, doFilterCategory, doFilterRegion]);

    // Infinite scroll только без поиска и фильтров
    useEffect(() => {
        if (searchTerm || selectedCategory || selectedRegion) return;
        const onScroll = () => {
            if (loading || page >= totalPages) return;
            if (window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100) {
                setPage(prev => prev + 1);
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [loading, page, totalPages, searchTerm, selectedCategory, selectedRegion]);

    if (error) return <div className="error">Ошибка: {error.message}</div>;

    return (
        <div className="products-page">
            {/* Поиск и фильтры */}
            <div className="filter-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Поиск по названию..."
                    value={searchTerm}
                    onChange={e => {
                        setSearchTerm(e.target.value);
                        setSelectedCategory('');
                        setSelectedRegion('');
                        setPage(1);
                    }}
                />
                <div className="select-group">
                    {/* Фильтр по категории */}
                    <select
                        value={selectedCategory}
                        onChange={e => {
                            setSelectedCategory(e.target.value);
                            setSearchTerm('');
                            setSelectedRegion('');
                            setPage(1);
                        }}
                    >
                        <option value="">Все категории</option>
                        {categoriesList.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    {/* Фильтр по региону */}
                    <select
                        value={selectedRegion}
                        onChange={e => {
                            setSelectedRegion(e.target.value);
                            setSearchTerm('');
                            setSelectedCategory('');
                            setPage(1);
                        }}
                    >
                        <option value="">Все регионы</option>
                        {regionsList.map(r => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Список продуктов */}
            <div className="products-list">
                <table>
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Категория</th>
                        <th>Регион</th>
                        <th>Дата добавления</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(p => (
                        <tr
                            key={p.id}
                            onClick={() => navigate(`/products/${p.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{p.name}</td>
                            <td>{p.categories || '-'}</td>
                            <td>{p.region || '-'}</td>
                            <td>{p.date
                                ? (() => {
                                    const d = new Date(p.date);
                                    const day = d.getDate();
                                    const month = d.getMonth() + 1;
                                    const year = d.getFullYear();
                                    return `${day}-${month.toString().padStart(2, '0')}-${year}`;
                                })()
                                : '-'
                            }</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {!loading && products.length === 0 && <p>Продукты не найдены.</p>}
            </div>

            {/* Индикатор загрузки */}
            <div className="infinite-footer">
                {loading && <p>Загрузка ещё...</p>}
                {!loading && page >= totalPages && <p>Больше нет данных</p>}
            </div>
        </div>
    );
}

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './ProductDetail.css';
// import { useTranslation } from 'react-i18next';
//
// export default function ProductDetail() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const API = process.env.REACT_APP_API_URL
//
//     const { t, i18n } = useTranslation();
//
//
//
//
//     useEffect(() => {
//         const lang = i18n.language || 'ru';
//         fetch(`${API}/product/details/${id}?lng=${lang}`, { mode: 'cors' })
//             .then(res => {
//                 if (!res.ok) throw new Error(`Ошибка ${res.status}`);
//                 return res.json();
//             })
//             .then(json => setData(json))
//             .catch(err => setError(err.message))
//             .finally(() => setLoading(false));
//     }, [id]);
//
//     if (loading) return <p className="pd-loading">Загрузка...</p>;
//     if (error) return <p className="pd-error">Ошибка: {error}</p>;
//
//     return (
//         <div className="product-detail">
//             <button className="back-btn" onClick={() => navigate(-1)}>← Назад</button>
//             <h1 className="title">{data.name}</h1>
//             <p className="subtitle">{data.regionName} · {data.categoryName}</p>
//
//             <section>
//                 <h2 className="section-title">Химический состав</h2>
//                 <table className="comp-table">
//                     <thead>
//                     <tr>
//                         <th>Вещество</th>
//                         {/*<th>Категория</th>*/}
//                         <th>Количество</th>
//                         <th>На 100грамм съедобной части</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {data.chemicalComposition.map(c => (
//                         <tr key={c.id}>
//                             <td>{c.compoundName}</td>
//                             {/*<td>{c.compoundCategory || '–'}</td> */}
//                             <td>{c.quantity}</td>
//                             <td>{c.unit}</td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </section>
//
//             <section>
//                 <h2 className="section-title">Минеральный состав</h2>
//                 <table className="comp-table">
//                     <thead>
//                     <tr>
//                         <th>Минерал</th>
//                         <th>Количество</th>
//                         <th>На 100грамм съедобной части</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {data.mineralComposition.map(m => (
//                         <tr key={m.id}>
//                             <td>{m.mineral}</td>
//                             <td>{m.quantity}</td>
//                             <td>{m.unit}</td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </section>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import { useTranslation } from 'react-i18next';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API = process.env.REACT_APP_API_URL;

    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lang = i18n.language || 'ru';
        fetch(`${API}/product/details/${id}?lng=${lang}`, { mode: 'cors' })
            .then(res => {
                if (!res.ok) throw new Error(`${t('error')} ${res.status}`);
                return res.json();
            })
            .then(json => setData(json))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id, i18n.language, t]);

    if (loading) return <p className="pd-loading">{t('loading')}</p>;
    if (error) return <p className="pd-error">{t('error_message', { error })}</p>;
    const lang = i18n.language || 'ru';
    return (
        <div className="product-detail">
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← {t('back')}
            </button>

            <h1 className="title">{data.name}</h1>
            <p className="subtitle">{data.regionName} · {data.categoryName}</p>

            <section>
                <h2 className="section-title">{t('chemical_composition')}</h2>
                <table className="comp-table">
                    <thead>
                    <tr>
                        <th>{t('substance')}</th>
                        {/* <th>{t('category')}</th> */}
                        <th>{t('quantity')}</th>
                        <th>{t('per_100g')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.chemicalComposition.map(c => (
                        <tr key={c.id}>
                            {/*<td>{c.compoundName}</td>*/}
                            <td>{t(`compounds.${c.compoundName}`, c.compoundName)}</td>
                            {/* <td>{c.compoundCategory || '–'}</td> */}
                            <td>{c.quantity}</td>
                            <td>{c.unit}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

            <section>
                <h2 className="section-title">{t('mineral_composition')}</h2>
                <table className="comp-table">
                    <thead>
                    <tr>
                        <th>{t('mineral')}</th>
                        <th>{t('quantity')}</th>
                        <th>{t('per_100g')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.mineralComposition.map(m => (
                        <tr key={m.id}>
                            {/*<td>{m.mineral}</td>*/}
                            <td>{t(`minerals.${m.mineral}`, m.mineral)}</td>
                            <td>{m.quantity}</td>
                            <td>{m.unit}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

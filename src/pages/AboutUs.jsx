import React from 'react';
import './AboutUs.css';
import { motion } from 'framer-motion';
import { Users, Beaker, Calendar } from 'lucide-react';

export default function AboutUs() {
    return (
        <section className="about-us">
            <motion.div
                className="about-container"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <motion.h1
                    className="about-heading"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                >
                    Проект AFACI
                </motion.h1>

                <motion.p
                    className="about-intro"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                >
                    Азиатская инициатива по сотрудничеству в области продовольствия и сельского
                    хозяйства (AFACI) совместно с КГТУ имени И. Раззакова и Департаментом
                    перерабатывающей промышленности и органического сельского хозяйства
                    Министерства сельского хозяйства и водных ресурсов КР проводит исследования
                    по созданию базы данных по составу пищевых продуктов в Кыргызской Республике с декабря 2021 года по настоящее время.
                </motion.p>

                <div className="timeline">
                    <motion.div
                        className="timeline-item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                    >
                        <div className="icon-wrapper">
                            <Users size={32} />
                        </div>
                        <div className="content">
                            <h2>Наша команда</h2>
                            <ul>
                                <li>Председатель: Джамакеева А. Д., к. т. н., профессор.</li>
                                <li>Главный исследователь: Чыналиев М. Т., директор департамента.</li>
                                <li>Члены Комитета:
                                    <ul>
                                        <li>Эсенаманова М. К., д. м. н., профессор.</li>
                                        <li>Кожобекова К. К., к. т. н., профессор.</li>
                                        <li>Ажибекова А., главный технолог ОсОО Риха.</li>
                                        <li>Аксупова А. М., научный секретарь.</li>
                                        <li>Ашимова А. Ж., IT-программист.</li>

                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    <motion.div
                        className="timeline-item reverse"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 0.4 }}
                    >
                        <div className="icon-wrapper">
                            <Beaker size={32} />
                        </div>
                        <div className="content">
                            <h2>Методы исследования</h2>
                            <p>
                                ГОСТы: высушивание в шкафу СЭШ-3М, аппарат Сокслета, рефрактометр RL-2,
                                АЭС-ИСП (ICAP). Энергетическая ценность — расчётный метод. Аминокислотный
                                состав — ВЖХ по МН 1363-2000, жирнокислотный — ГХ по МН 1364-2000.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="timeline-item"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.4 }}
                    >
                        <div className="icon-wrapper">
                            <Calendar size={32} />
                        </div>
                        <div className="content">
                            <h2>Итоги по годам</h2>
                            <div className="year-block">
                                <h3>2022</h3>
                                <ul>
                                    <li>Мясо, молоко, зерно, орехи, овощи, фрукты.</li>
                                    <li>Химический, минеральный, аминокислотный и жирнокислотный состав.</li>
                                    <li>Публикации в профильных журналах.</li>
                                </ul>
                            </div>
                            <div className="year-block">
                                <h3>2023</h3>
                                <ul>
                                    <li>11 статей; тестирование продуктов из 6 областей КР.</li>
                                </ul>
                            </div>
                            <div className="year-block">
                                <h3>2024</h3>
                                <ul>
                                    <li>30 продуктов; семинар AFCD в Бангкоке (13 стран).</li>
                                    <li>Публикации в отечественных и международных журналах.</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

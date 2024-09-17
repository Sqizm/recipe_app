import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/categories/');
            setCategories(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    if (loading) {
        return <nav className="main-category-container">
            <nav className="category-container">Загрузка категорий...</nav>
        </nav>;
    }

    if (error) {
        return <nav className="main-category-container">
            <nav className="category-container">Ошибка: {error.message}</nav>
        </nav>;
    }

    return (
        <nav className="main-category-container">
            {categories.map(category => (
                <nav key={category.id} className="category-container">
                    <h2>{category.name}</h2>
                    <p>{category.description}</p>
                    <Link to={`/recipe-category/${category.id}`}>Посмотреть рецепты...</Link>
                    <br></br>
                    <Link to='/'>Вернутся на главную страницу</Link>
                </nav>
            ))}
        </nav>
    );
};

export default CategoryList;
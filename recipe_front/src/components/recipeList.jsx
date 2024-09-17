import React, { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const RecipeList = () => {
    const { id } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRecipes = useCallback(async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/recipes`);
            setRecipes(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRecipes();
    }, [fetchRecipes]);

    if (loading) {
        return <nav className="main-recipe-container">
            <nav className="recipe-container">Загрузка рецептов...</nav>
        </nav>;
    }

    if (error) {
        return <nav className="main-recipe-container">
            <nav className="recipe-container">Ошибка: {error.message}</nav>
        </nav>;
    }

    const filteredRecipes = recipes.filter(recipe => recipe.category === Number(id));

    if (filteredRecipes.length === 0) {
        return (
            <nav className="main-recipe-container">
                <nav className="recipe-container">
                    <p>Рецептов в этой категории нету!</p>
                    <Link to='/recipe-category'>Вернутся к категориям</Link>
                </nav>
            </nav>
        );
    }

    const truncate = (str, maxLength) => {
        return (str.length > maxLength) ? str.slice(0, maxLength - 1) + '…' : str;
    }

    return (
        <nav className="main-recipe-container">
            {filteredRecipes.map(recipe => (
                <nav key={recipe.id} className="recipe-container">
                    <h4>{recipe.title}</h4>
                    <p>{truncate(recipe.description, 35)}</p>
                    <Link to={`/recipe/${recipe.id}`}>Посмотреть детально рецепт...</Link>
                    <br></br>
                    <Link to='/recipe-category'>Вернутся к категориям</Link>
                </nav>
            ))}
        </nav>
    );
};

export default RecipeList;
import React, { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchRecipe = useCallback(async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/recipes/${id}`);
            setRecipe(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchRecipe();
    }, [fetchRecipe]);

    if (loading) {
        return <nav className="main-home-container">
            <nav className="home-container">Загрузка рецепта...</nav>
        </nav>;
    }

    if (error) {
        return <nav className="main-home-container">
            <nav className="home-container">Ошибка: {error.message}</nav>
        </nav>;
    }

    const goBack = () => {
        navigate(-1);
    }

    return (
        <nav className="main-home-container">
            <nav key={recipe.id} className="home-container">
                <h4>{recipe.title}</h4>
                <p>{recipe.description}</p>
                <br></br>
                <Link to='#' onClick={goBack}>Вернутся к категориям</Link>
            </nav>
        </nav>
    );
};

export default RecipeDetail;
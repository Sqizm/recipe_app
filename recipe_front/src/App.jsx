import React from 'react';
import {Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Category from './components/categoryList';
import Recipe from './components/recipeList';
import RecipeDet from './components/recipeDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/recipe/:id' element={<RecipeDet />} />
        <Route path='/recipe-category/:id' element={<Recipe />} />
        <Route path='/recipe-category' element={<Category />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

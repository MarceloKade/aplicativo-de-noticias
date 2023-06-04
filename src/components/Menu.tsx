'use client'
import React, { useState } from 'react';
import Category from './Category';

export default function Menu() {
    const categories = [
        { name: 'Geral', originalName: 'General' },
        { name: 'Mundo', originalName: 'World' },
        { name: 'Nação', originalName: 'Nation' },
        { name: 'Negócios', originalName: 'Business' },
        { name: 'Tecnologia', originalName: 'Technology' },
        { name: 'Entretenimento', originalName: 'Entertainment' },
        { name: 'Esportes', originalName: 'Sports' },
        { name: 'Ciência', originalName: 'Science' },
        { name: 'Saúde', originalName: 'Health' },
    ];

    const [selectedCategory, setSelectedCategory] = useState('Geral');

    const handleCategoryClick = (category: { name?: string; originalName: any; }) => {
        setSelectedCategory(category.originalName.toLowerCase());
    };

    const getCategoryName = (originalName: string) => {
        const category = categories.find((item) => item.originalName === originalName);
        return category ? category.name : '';
    };

    return (
        <div className="flex flex-col items-center pt-16">
            <h1 className="flex flex-col items-center mb-10 text-5xl font-bold">KadeNews</h1>
            <header>
                <ul className="flex gap-2 justify-center flex-wrap">
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            className={`py-2 px-4 rounded-md bg-gray-700 hover:bg-gray-800 cursor-pointer ${selectedCategory.toLowerCase() === category.originalName.toLowerCase()
                                ? 'text-white'
                                : 'text-gray-200'
                                }`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {getCategoryName(category.originalName)}
                        </li>
                    ))}
                </ul>
            </header>
            <main className="w-full h-full pt-16 bg-blue-800 bg-opacity-30">
                <ul>
                    <Category category={selectedCategory} />
                </ul>
            </main>
        </div>
    );
}
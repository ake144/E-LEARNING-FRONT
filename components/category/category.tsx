// components/CategoriesPage.js
import React, { useState } from 'react';


const categories = [
  { name: 'Accounting & Finance', content: 'Content for Accounting & Finance' },
  { name: 'Arts & Crafts', content: 'Content for Arts & Crafts' },
  { name: 'Beauty & Makeup', content: 'Content for Beauty & Makeup' },
  { name: 'Business & Marketing', content: 'Content for Business & Marketing' },
  { name: 'Creatives & Design', content: 'Content for Creatives & Design' },
  { name: 'Food & Beverage', content: 'Content for Food & Beverage' },
  { name: 'Health & Fitness', content: 'Content for Health & Fitness' },
  { name: 'IT & Development', content: 'Content for IT & Development' },
  { name: 'Language & Literature', content: 'Content for Language & Literature' },
  { name: 'Music & Theatre', content: 'Content for Music & Theatre' },
  { name: 'Office Productivity', content: 'Content for Office Productivity' },
  { name: 'Personal Development', content: 'Content for Personal Development' },
  { name: 'Photography & Videography', content: 'Content for Photography & Videography' },
];

const CategoriesPage = () => {
  const [activeTab, setActiveTab] = useState(categories[0].name);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4">
        <h2 className="text-lg font-bold mb-4">CATEGORIES</h2>
        <ul>
          {categories.map((category) => (
            <li
              key={category.name}
              className={`cursor-pointer py-2 ${activeTab === category.name ? 'text-blue-500 font-bold' : ''}`}
              onClick={() => setActiveTab(category.name)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Main content */}
    <div className="w-3/4 p-4">
        <h2 className="text-xl font-bold mb-4">{activeTab}</h2>
        <div className="content">
            {categories.find((category) => category.name === activeTab)?.content}
        </div>
    </div>
</div>
);
};

export default CategoriesPage;

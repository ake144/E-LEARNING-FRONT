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
  { name: 'Personal Development', content: 'Content for Personal Development' },
  { name: 'Reading & Writting ', content: 'Content for developing writting and reading skill' },
  { name: 'Driving', content: 'Content for Driving' },
  { name: 'Modern Agriculture', content: 'Content for Agriculture' },
  { name: 'Photography & Videography', content: 'Content for Photography & Videography' },
  { name: 'Mindset & paradigm shift', content: 'Content for Mindset' },
  { name: 'Basic of Sales', content: 'Content for Sales' },
  { name: 'Baby care', content: 'Content for MinBaby care' },
  { name: 'Basic of Health', content: 'Content for Health' },
  { name: 'Assistance ', content: 'Content for Assistance' },
  { name: 'Baby care', content: 'Content for MinBaby care' },
  { name: 'house keeping', content: 'Content for keeping' },
  { name: 'Wood Work', content: 'Content for Wood Work' },
  { name: 'Video Editing', content: 'Content for Video Editing' },
  { name: 'Grinding & Building ', content: 'Content for Grinding and Building ' },
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

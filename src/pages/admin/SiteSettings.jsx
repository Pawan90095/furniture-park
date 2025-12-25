import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Save, Image, Type } from 'lucide-react';

const SiteSettings = () => {
    const { siteSettings, updateBannerText, updateCategory } = useStore();
    const [bannerText, setBannerText] = useState(siteSettings.bannerText);
    const [categories, setCategories] = useState(siteSettings.categories);
    const [saveMessage, setSaveMessage] = useState('');

    const handleSaveBanner = () => {
        updateBannerText(bannerText);
        setSaveMessage('Banner text saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
    };

    const handleCategoryChange = (categoryId, field, value) => {
        setCategories(categories.map(cat =>
            cat.id === categoryId ? { ...cat, [field]: value } : cat
        ));
    };

    const handleSaveCategory = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        updateCategory(categoryId, category);
        setSaveMessage(`${category.name} updated successfully!`);
        setTimeout(() => setSaveMessage(''), 3000);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Site Settings</h2>
                {saveMessage && (
                    <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200">
                        {saveMessage}
                    </div>
                )}
            </div>

            {/* Banner Text Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Type className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-bold text-gray-800">Marquee Banner Text</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                    This text appears in the scrolling banner at the top of the website
                </p>
                <textarea
                    value={bannerText}
                    onChange={(e) => setBannerText(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium"
                    placeholder="Enter banner text..."
                />
                <button
                    onClick={handleSaveBanner}
                    className="mt-4 flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <Save className="w-4 h-4 mr-2" />
                    Save Banner
                </button>
            </div>

            {/* Category Thumbnails Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Image className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-bold text-gray-800">Category Thumbnails</h3>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                    Manage thumbnails and details for each product category
                </p>

                <div className="space-y-6">
                    {categories.map((category) => (
                        <div key={category.id} className="border border-gray-200 rounded-lg p-6 hover:border-indigo-300 transition-colors">
                            <h4 className="font-bold text-gray-800 mb-4 text-lg">{category.name}</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Thumbnail Preview */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Thumbnail Preview
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                                        {category.thumbnail ? (
                                            <img
                                                src={category.thumbnail}
                                                alt={category.name}
                                                className="w-full h-48 object-cover rounded-lg"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-48 flex items-center justify-center text-gray-400">
                                                No image
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Thumbnail URL Input */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Thumbnail URL
                                        </label>
                                        <input
                                            type="text"
                                            value={category.thumbnail}
                                            onChange={(e) => handleCategoryChange(category.id, 'thumbnail', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            value={category.description}
                                            onChange={(e) => handleCategoryChange(category.id, 'description', e.target.value)}
                                            rows="3"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Category description..."
                                        />
                                    </div>

                                    <button
                                        onClick={() => handleSaveCategory(category.id)}
                                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        Save {category.name}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SiteSettings;

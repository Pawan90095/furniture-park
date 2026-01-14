
import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useToast } from '../../context/ToastContext';
import { Plus, Trash2, X, Check, Search, Edit, Upload } from 'lucide-react';

const ProductManager = () => {
    const { products, addProduct, deleteProduct, editProduct } = useStore();
    const { toast } = useToast();
    const [isAdding, setIsAdding] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [uploading, setUploading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Living Room',
        image: '',
        description: '',
        isBestseller: false
    });

    const categories = ['Living Room', 'Bedroom', 'Dining', 'Office'];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        const API_URL = import.meta.env.VITE_API_URL || '';
        try {
            const res = await fetch(`${API_URL}/api/upload`, {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const data = await res.text(); // Returns path string
                setFormData(prev => ({ ...prev, image: data }));
                setUploading(false);
            } else {
                console.error("Upload failed");
                setUploading(false);
            }
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            // Edit existing product
            editProduct(editingProduct.id, {
                ...formData,
                price: Number(formData.price),
            });
            setEditingProduct(null);
            toast.success('Product updated successfully!');
        } else {
            // Add new product
            addProduct({
                ...formData,
                price: Number(formData.price),
                rating: 0,
                colors: [],
            });
            toast.success('Product added successfully!');
        }
        setIsAdding(false);
        setFormData({
            name: '',
            price: '',
            category: 'Living Room',
            image: '',
            description: '',
            isBestseller: false
        });
    };

    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            price: product.price.toString(),
            category: product.category,
            image: product.image,
            description: product.description,
            isBestseller: product.isBestseller || false
        });
        setEditingProduct(product);
        setIsAdding(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isAdding) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button
                        onClick={() => {
                            setIsAdding(false);
                            setEditingProduct(null);
                            setFormData({
                                name: '',
                                price: '',
                                category: 'Living Room',
                                image: '',
                                description: '',
                                isBestseller: false
                            });
                        }}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                            <input
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="e.g. Modern Sofa"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                            <input
                                required
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter URL or Upload"
                                />
                                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg px-3 py-2 flex items-center justify-center transition-colors">
                                    <Upload size={20} className="text-gray-600" />
                                    <input
                                        type='file'
                                        onChange={uploadFileHandler}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {uploading && <p className="text-xs text-blue-500 mt-1">Uploading...</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            required
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Product description..."
                        />
                    </div>

                    {/* Image Preview */}
                    {formData.image && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Image Preview</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="w-full h-64 object-contain rounded-lg bg-white"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isBestseller"
                            checked={formData.isBestseller}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                            Mark as Bestseller
                        </label>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsAdding(false)}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                        >
                            <Check className="w-4 h-4 mr-2" />
                            Save Product
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Products</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Product
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <img
                                                    className="h-10 w-10 rounded-lg object-cover"
                                                    src={product.image}
                                                    alt={product.name}
                                                />
                                            </div>
                                            <div className="ml-4">
                                                <div className="font-medium text-gray-900">{product.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {product.category}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        ₹{product.price.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        {product.isBestseller && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Bestseller
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="text-indigo-600 hover:text-indigo-900 transition-colors bg-indigo-50 p-2 rounded-full"
                                                title="Edit product"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-400 hover:text-red-900 transition-colors bg-red-50 p-2 rounded-full"
                                                title="Delete product"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductManager;

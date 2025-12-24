import mongoose from 'mongoose';

const siteSettingsSchema = mongoose.Schema({
    bannerText: { type: String, default: 'FREE SHIPPING ON ORDERS OVER ₹10,000' },
    categories: [{
        id: { type: String, required: true },
        name: { type: String, required: true },
        thumbnail: { type: String, required: true },
        description: { type: String }
    }]
}, {
    timestamps: true
});

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

export default SiteSettings;

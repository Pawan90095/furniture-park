import asyncHandler from 'express-async-handler';
import SiteSettings from '../models/siteSettingsModel.js';

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
const getSiteSettings = asyncHandler(async (req, res) => {
    const settings = await SiteSettings.findOne({});
    if (settings) {
        res.json(settings);
    } else {
        // Return default if not found
        res.json({
            bannerText: 'FREE SHIPPING ON ORDERS OVER ₹10,000',
            categories: []
        });
    }
});

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSiteSettings = asyncHandler(async (req, res) => {
    const { bannerText, categories } = req.body;

    const settings = await SiteSettings.findOne({});

    if (settings) {
        settings.bannerText = bannerText || settings.bannerText;
        settings.categories = categories || settings.categories;

        const updatedSettings = await settings.save();
        res.json(updatedSettings);
    } else {
        const newSettings = await SiteSettings.create({
            bannerText,
            categories
        });
        res.status(201).json(newSettings);
    }
});

export { getSiteSettings, updateSiteSettings };

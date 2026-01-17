import React from 'react';
import TextPageLayout from '../components/TextPageLayout';

export default function PrivacyPolicy() {
    return (
        <TextPageLayout
            title="Privacy Policy"
            subtitle="Last Updated: October 2024"
        >
            <p>
                At Furniture Park ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website.
            </p>

            <h3>Information We Collect</h3>
            <p>We collect information that you provide directly to us, such as when you:</p>
            <ul>
                <li>Create an account or purchase products</li>
                <li>Sign up for our newsletter</li>
                <li>Contact our customer support team</li>
            </ul>
            <p>This information may include your name, email address, shipping address, phone number, and payment information.</p>

            <h3>How We Use Your Information</h3>
            <p>We use the information we collect to:</p>
            <ul>
                <li>Process and fulfill your orders</li>
                <li>Send you order confirmations and updates</li>
                <li>Respond to your comments and questions</li>
                <li>Send you marketing communications (if you have opted in)</li>
                <li>Improve our website and product offerings</li>
            </ul>

            <h3>Data Security</h3>
            <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, please be aware that no method of transmission over the internet is 100% secure.
            </p>

            <h3>Sharing of Information</h3>
            <p>
                We do not sell your personal information to third parties. We may share your information with trusted service providers who help us operate our business, such as payment processors and shipping partners, under strict confidentiality agreements.
            </p>

            <h3>Your Rights</h3>
            <p>
                You have the right to access, correct, or delete your personal information. You can manage your account settings directly on our website or contact us at <a href="mailto:privacy@furniturepark.com">privacy@furniturepark.com</a> for assistance.
            </p>
        </TextPageLayout>
    );
}

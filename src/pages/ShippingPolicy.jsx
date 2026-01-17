import React from 'react';
import TextPageLayout from '../components/TextPageLayout';

export default function ShippingPolicy() {
    return (
        <TextPageLayout
            title="Shipping & Returns"
            subtitle="Everything you need to know about getting your order."
        >
            <h3>Shipping Information</h3>
            <p>
                We are pleased to offer complimentary White Glove Delivery on all large furniture items within India. For smaller decor items, we use trusted courier partners to ensure safe and timely delivery.
            </p>
            <ul>
                <li><strong>Processing Time:</strong> 1-3 business days</li>
                <li><strong>Delivery Time (Furniture):</strong> 7-14 business days</li>
                <li><strong>Delivery Time (Decor):</strong> 3-7 business days</li>
            </ul>

            <h3>White Glove Service</h3>
            <p>
                Our signature White Glove Service includes scheduled delivery, placement in your room of choice, assembly, and removal of all packaging materials. Our team will contact you to schedule a convenient delivery window once your order is ready.
            </p>

            <hr />

            <h3>Return Policy</h3>
            <p>
                We want you to love your new furniture. If for any reason you are not completely satisfied, we accept returns within 14 days of delivery.
            </p>
            <ul>
                <li>Items must be in original condition and packaging.</li>
                <li>Custom or made-to-order items are final sale.</li>
                <li>A return shipping fee may apply for large furniture items.</li>
            </ul>

            <h3>Damaged Items</h3>
            <p>
                In the rare event that your item arrives damaged, please refuse the delivery if possible and contact our concierge team immediately at <a href="mailto:support@furniturepark.com">support@furniturepark.com</a> with photos of the damage. We will arrange a replacement or refund right away.
            </p>
        </TextPageLayout>
    );
}

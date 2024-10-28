import React from 'react';

export default async function ProductDetail({params}: { params: { categoryId: string } }) {
    return (
        <h2>Category: {params.categoryId}</h2>
    );
}

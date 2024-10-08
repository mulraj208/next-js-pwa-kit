'use client';

import React from 'react';

export default function ProductDetail({ params }: { params: { productId: string } }) {
  const { productId } = params;
  console.log(productId);

  return (
    <div className='space-y-8 lg:space-y-14'>
      Product Page
    </div>
  );
}

import React, { useEffect } from 'react';
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import './ProductView.css'

import { useState } from 'react';

function ProductView({ products }) {

  // TODO: Replace with state variable
  const [sideOpen, setSideOpen] = useState( localStorage.getItem('sideOpen') === 'false' ? false : true);

  const [selectedProduct, setSelectedProduct] = useState( ''
  )

   // Open side panel when product is selected
   useEffect(() => {
    console.log(`selectedProduct CHANGED TO`, selectedProduct);
      if (selectedProduct)
          setSideOpen(true);
  }, [selectedProduct]);

  // Deselect product when side panel is closed
  useEffect(() => {
      console.log(`sideOpen CHANGED TO`, sideOpen);
      if (!sideOpen)
          setSelectedProduct();
      
      localStorage.setItem('sideOpen', sideOpen)
  }, [sideOpen]);

  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map(item =>
            <ProductListItem
              key={item.id}
              product={item}
              onClick={() => {
                console.log('SELECT PRODUCT', item)
                setSelectedProduct(item)
              }}
              isSelected={selectedProduct ? item.id === selectedProduct.id ? true : false : false}
            />
          )}
        </div>
      </div>
      <div className="product-side-panel">
        <div className="product-side-panel-toggle-wrapper">
          <div className="product-side-panel-toggle"
               onClick={() => {
                setSideOpen(!sideOpen)
                console.log('TOGGLE SIDE PANEL')
               }}>
            {sideOpen ? '>' : '<'}
          </div>
        </div>
        {console.log(`side panel is visible? ${sideOpen}`)}
        <ProductDetails visible={sideOpen} product={selectedProduct}/>
      </div>
    </div>
  );
}

export default ProductView;
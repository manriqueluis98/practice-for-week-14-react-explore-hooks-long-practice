import React, { useEffect } from 'react';
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import './ProductView.css'

import { useState } from 'react';

function ProductView({ products }) {

  // TODO: Replace with state variable
  const [sideOpen, setSideOpen] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState('')


  useEffect(() => {
    if(selectedProduct===''){
      setSideOpen(true)
    }else if(!selectedProduct){
      setSideOpen(false)
    }else{  
      setSideOpen(true)
    }
  }, [selectedProduct])

  useEffect(() => {
    if(!sideOpen){
      setSelectedProduct(null)
    }
  }, [sideOpen])

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
        <ProductDetails visible={sideOpen} product={selectedProduct}/>
      </div>
    </div>
  );
}

export default ProductView;
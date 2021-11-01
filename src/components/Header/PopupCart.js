import React from 'react';
import { Link } from 'react-router-dom';

// Images
import NoProduct from '../../assets/images/no-product.png';

// Components
import { Truncate } from '../Truncate';

// Commons
import { formatNumber } from '../../common';

export const PopupCart = ({ cart }) => {
  return (
    <div className='header__popup-cart cart absolute right-0 bg-white w-[400px] rounded-sm shadow-sm z-[2] border border-gray-100 cursor-pointer'>
      {cart.length > 0 ? (
        <>
          <h3 className='bg-[#fefefe] text-gray-400 p-3 font-light text-sm select-none cursor-default'>
            Sản Phẩm Mới Thêm
          </h3>
          <ul>
            {cart
              .filter((_product, index) => index <= 4)
              .map((product) => (
                <li key={product._id}>
                  <Link
                    to={`/products/${product._id}`}
                    className='flex items-start p-[10px] hover:bg-gray-100'
                  >
                    <img
                      src={product.image}
                      alt=''
                      className='w-[42px] h-[42px] bg-gray-200 flex-shrink-0 border border-gray-300'
                    />
                    <div className='flex-grow ml-2 flex items-center'>
                      <Truncate
                        tag='h5'
                        line={1}
                        className='text-sm text-gray-500 flex-grow'
                      >
                        {product.product_name}
                      </Truncate>
                      <div className='text-sm text-primary flex items-center ml-8'>
                        <span className='text-[10px]'>₫</span>
                        <span>
                          {product.price_discount
                            ? formatNumber(product.price_discount)
                            : formatNumber(product.price)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
          <div className='flex items-center justify-between p-[10px] bg-[#fefefe] cursor-auto'>
            {cart.length > 5 && (
              <span className='text-xs'>
                {cart.length - 5} Thêm Hàng Vào Giỏ
              </span>
            )}
            <Link
              to='/cart'
              className='bg-primary text-white inline-block rounded-sm px-4 py-2 text-sm hover:opacity-90 ml-auto'
            >
              Xem Giỏ Hàng
            </Link>
          </div>
        </>
      ) : (
        <div className='text-center py-16 cursor-default'>
          <img src={NoProduct} alt='' className='w-[100px] h-[100px] mx-auto' />
          <p className='text-sm text-gray-600 mt-4'>Chưa Có Sản Phẩm</p>
        </div>
      )}
    </div>
  );
};

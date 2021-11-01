import React from 'react';
import { Link } from 'react-router-dom';

// Images
import LabelFreeShip from '../../assets/images/label-freeship-product.png';
import Mall from '../../assets/images/mall.png';

// Commons
import { formatNumber, kFormatter } from '../../common';

// Components
import { Truncate } from '../Truncate';

const TOTAL_STAR = 5;

export const ProductCard = ({ data }) => {
  const renderStars = (star) => {
    let html = '';
    const disableStar = TOTAL_STAR - star;

    for (let i = 0; i < star; i++) {
      if (i === 0) {
        html += `<i class='fas fa-star text-yellow-400 text-[8px]'></i>`;
        continue;
      }
      html += `<i class='fas fa-star text-yellow-400 text-[8px] ml-[2px]'></i>`;
    }
    for (let i = 0; i < disableStar; i++) {
      html += `<i class='fas fa-star text-gray-300 text-[8px] ml-[2px]'></i>`;
    }

    return { __html: html };
  };

  return (
    <Link
      to={`/products/${data._id}`}
      className='bg-white rounded-sm flex flex-col mb-[10px] transform hover:translate-y-[-2px]'
      style={{ boxShadow: '0 0 2px rgba(0, 0, 0, 0.15)' }}
    >
      <div className='flex-shrink-0 relative'>
        <img
          src={data.image}
          alt=''
          className='w-full h-full object-contain rounded-tl-sm rounded-tr-sm'
        />

        {data.extend.label === 'like' ? (
          <div className='bg-primary text-primary text-xs px-1 absolute top-3 left-[-4px] rounded-tr-sm rounded-br-sm label-like-product'>
            <span className='text-white'>Yêu thích +</span>
          </div>
        ) : (
          <div className='bg-[#d0011b] text-[#d0011b] text-xs px-2 absolute top-3 left-[-4px] rounded-tr-sm rounded-br-sm label-like-product'>
            <img
              src={Mall}
              alt=''
              className='w-4 h-4 object-contain'
              style={{ transform: 'scale(1.2)' }}
            />
          </div>
        )}

        {data.price_discount && (
          <div className='flex flex-col w-9 text-center text-xs pt-1 pb-[2px] px-[3px] absolute right-0 top-0 label-discount-product'>
            <span className='text-primary leading-none'>
              {Math.round(100 - (data.price_discount / data.price) * 100)}%
            </span>
            <span className='text-white font-medium'>GIẢM</span>
          </div>
        )}

        <div className='absolute bottom-0 left-0'>
          <img src={LabelFreeShip} alt='' />
        </div>
      </div>

      <div className='p-[10px] flex-grow flex flex-col'>
        <Truncate tag='h4' line={2} className='text-xs flex-grow'>
          {data.product_name}
        </Truncate>
        <div className='flex-shrink-0'>
          <label className='text-[10px] border border-red-500 px-1 py-[2px] text-red-500 mt-[5px]'>
            ShopDacBiet
          </label>
        </div>

        <div className='flex items-baseline mt-[5px] flex-shrink-0'>
          {data.price_discount && (
            <div className='text-gray-400 line-through text-sm mr-2'>
              {formatNumber(data.price)}
              <span className='text-xs text-current'>₫</span>
            </div>
          )}
          {/* <span className='mx-1 text-primary'> - </span> */}
          <div className='text-primary'>
            {formatNumber(
              data.price_discount ? data.price_discount : data.price
            )}
            <span className='text-xs text-current'>₫</span>
          </div>
        </div>

        <div className='flex items-center justify-between flex-shrink-0'>
          <span onClick={(e) => e.preventDefault()}>
            <i className='far fa-heart text-xs text-gray-500' />
          </span>

          <div className='flex items-center'>
            <div
              className='flex items-center mr-[6px]'
              dangerouslySetInnerHTML={renderStars(data.star)}
            />

            <span className='text-xs text-gray-700'>
              Đã bán {kFormatter(data.sold)}
            </span>
          </div>
        </div>

        <div className='text-gray-500 text-xs text-right mt-[5px] flex-shrink-0'>
          <span className='capitalize'>{data.province}</span>
        </div>
      </div>
    </Link>
  );
};

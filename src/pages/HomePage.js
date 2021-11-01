import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { getProducts } from '../redux/actions';

// Components
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className='grid grid-cols-6 gap-x-5 pt-5'>
      <div className='col-span-1'>
        <div className=''>
          <div className='flex items-center py-3 border-b border-gray-200 mb-[10px]'>
            <i className='fas fa-list text-xs mr-2'></i>
            <h4 className='font-medium text-gray-600 text-[17px]'>Danh Mục</h4>
          </div>
          <ul className='text-sm text-gray-600'>
            <li className='category__item py-2 px-3 relative cursor-pointer hover:text-primary duration-200 active'>
              Sản Phẩm
            </li>
            <li className='category__item py-2 px-3 relative cursor-pointer hover:text-primary duration-200'>
              AirPods
            </li>
            <li className='category__item py-2 px-3 relative cursor-pointer hover:text-primary duration-200'>
              iPhone
            </li>
            <li className='category__item py-2 px-3 relative cursor-pointer hover:text-primary duration-200'>
              Apple Watch
            </li>
          </ul>
        </div>
      </div>
      <div className='col-span-5 grid grid-cols-5 gap-x-[10px]'>
        {products.map((product, index) => (
          <ProductCard key={product._id ?? index} data={product} />
        ))}
      </div>
    </div>
  );
};

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Actions
import {
  increaseCount,
  decreaseCount,
  changeCount,
  deleteCart,
} from '../../redux/actions';

// Commons
import { numberToCurrency } from '../../common';

// Components
import { Truncate } from '../Truncate';

export const CartItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleIncreaseCount = () => {
    dispatch(increaseCount(product._id));
  };

  const handleDecreaseCount = () => {
    product.count > 1 && dispatch(decreaseCount(product._id));
  };

  const handleOnChangeCount = (e) => {
    e.target.validity.valid &&
      dispatch(
        changeCount(product._id, e.target.value === '' ? 1 : e.target.value)
      );
  };

  const handleDeleteCart = () => {
    dispatch(deleteCart(product._id));
  };

  return (
    <div className='mt-4 p-5 bg-white rounded'>
      <div className='border border-gray-300 rounded flex items-center py-4'>
        <div className='px-5 flex items-center'>
          <label
            htmlFor={product._id}
            className='wrap-checkbox inline-block relative h-[18px] w-[18px] border border-gray-300 rounded-sm cursor-pointer'
          >
            <input type='checkbox' id={product._id} hidden />
            <span className='bg-primary rounded-sm hidden h-[18px] w-[18px] absolute top-[-1px] left-[-1px]' />
          </label>
        </div>

        <div className='flex items-center flex-grow'>
          <Link to={`/products/${product._id}`} className='flex-shrink-0 mr-3'>
            <img
              src={product.image}
              alt=''
              loading='lazy'
              className='w-20 h-20 border border-gray-200 rounded'
            />
          </Link>
          <div className='self-start'>
            <Link to={`/products/${product._id}`}>
              <Truncate tag='p' line={2} className='text-sm text-gray-600'>
                {product.product_name}
              </Truncate>
            </Link>
            <img
              src='https://cf.shopee.vn/file/9a3ee42ae96ed8232ddc8b62a33b9e6c'
              alt=''
              className='h-[18px] mt-1'
            />
          </div>
        </div>

        <div className='w-[14%] flex-shrink-0 text-sm text-center'>
          {product.price_discount ? (
            <>
              <span className='text-gray-500 line-through mr-2'>
                {numberToCurrency(product.price)}
              </span>
              <span>{numberToCurrency(product.price_discount)}</span>
            </>
          ) : (
            <span>{numberToCurrency(product.price)}</span>
          )}
        </div>

        <div className='w-[14%] flex-shrink-0 text-center'>
          <div className='inline-flex items-center border border-gray-300 rounded-sm h-8'>
            <button
              className={`h-full px-3 ${
                product.count > 1 ? 'cursor-pointer' : 'cursor-not-allowed'
              }`}
              onClick={handleDecreaseCount}
            >
              <svg
                enableBackground='new 0 0 10 10'
                viewBox='0 0 10 10'
                x='0'
                y='0'
                className='w-[10px] h-[10px]'
              >
                <polygon points='4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5'></polygon>
              </svg>
            </button>
            <input
              type='text'
              className='w-[50px] h-full focus:outline-none border-l border-r border-gray-300 rounded-none text-center'
              value={product.count || 1}
              onChange={handleOnChangeCount}
              pattern='[0-9]*'
            />
            <button className='h-full px-3' onClick={handleIncreaseCount}>
              <svg
                enableBackground='new 0 0 10 10'
                viewBox='0 0 10 10'
                x='0'
                y='0'
                className='w-[10px] h-[10px]'
              >
                <polygon points='10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5'></polygon>
              </svg>
            </button>
          </div>
        </div>

        <div className='w-[12%] flex-shrink-0 text-sm text-primary text-center'>
          {numberToCurrency(
            product.price_discount ? product.price_discount : product.price
          )}
        </div>

        <div className='w-[12%] flex-shrink-0 text-sm text-center'>
          <span
            className='cursor-pointer hover:text-primary'
            onClick={handleDeleteCart}
          >
            Xóa
          </span>
        </div>
      </div>
    </div>
  );
};

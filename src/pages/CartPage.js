import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Components
import { CartItem } from '../components/CartItem';

// Commons
import { numberToCurrency } from '../common';

// Assets
import NoProduct from '../assets/images/no-product.png';

export const CartPage = () => {
  const { cart } = useSelector((state) => state.cart);
  const [isSticky, setIsSticky] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const divPaymentRef = React.useRef();

  const handleStyleCssSticky = () => {
    const divPaymentRefCurrent = divPaymentRef.current;
    const observer = new IntersectionObserver(
      ([e]) => setIsSticky(e.intersectionRatio < 1),
      { threshold: [1] }
    );
    observer.observe(divPaymentRefCurrent);

    return {
      observer,
      unobserve: () => observer.unobserve(divPaymentRefCurrent),
    };
  };

  React.useEffect(() => {
    if (divPaymentRef.current) {
      const observer = handleStyleCssSticky();
      return () => observer?.unobserve();
    }
  }, []);

  React.useEffect(() => {
    (() => {
      const total = cart.reduce(
        (prev, item) =>
          prev +
          item.count * (item.price_discount ? item.price_discount : item.price),
        0
      );
      setTotal(total);
    })();
  }, [cart]);

  return (
    <div className='py-5'>
      {cart.length > 0 ? (
        <>
          <div
            className='bg-white flex items-center h-14 px-5 text-gray-500 capitalize rounded'
            style={{
              boxShadow: '0 1px 0 rgba(0, 0, 0, 0.08)',
            }}
          >
            <div className='h-full px-5 flex items-center'>
              <label
                htmlFor='checkbox'
                className='wrap-checkbox inline-block relative h-[18px] w-[18px] border border-gray-300 rounded-sm cursor-pointer'
              >
                <input type='checkbox' id='checkbox' hidden />
                <span className='bg-primary rounded-sm hidden h-[18px] w-[18px] absolute top-[-1px] left-[-1px]' />
              </label>
            </div>
            <div className='text-sm flex-grow'>Sản phẩm</div>
            <div className='text-sm w-[14%] text-center'>Đơn giá</div>
            <div className='text-sm w-[14%] text-center'>Số lượng</div>
            <div className='text-sm w-[12%] text-center'>Số tiền</div>
            <div className='text-sm w-[12%] text-center'>Thao tác</div>
          </div>
          {cart.map((item, index) => (
            <CartItem key={item._id ?? index} product={item} />
          ))}
          <div
            className='bg-white flex items-center justify-between my-8 py-3 px-5 sticky bottom-[-1px] rounded border-b border-transparent'
            style={
              isSticky
                ? {
                    boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.2)',
                  }
                : {}
            }
            ref={divPaymentRef}
          >
            <div className='flex items-center text-gray-600'>
              <span>Tổng thanh toán:</span>
              <span className='text-primary text-2xl ml-2'>
                {numberToCurrency(total, 'VND')}
              </span>
            </div>
            <button className='h-10 w-[210px] bg-primary text-white text-sm hover:opacity-90'>
              Mua Hàng
            </button>
          </div>
        </>
      ) : (
        <div className='flex flex-col items-center py-20'>
          <img src={NoProduct} alt='' className='w-28 h-28' />
          <p
            className='text-sm font-medium text-gray-400 mb-4 mt-2'
            style={{ letterSpacing: '0.5px' }}
          >
            Giỏ hàng của bạn còn trống
          </p>
          <Link
            to='/'
            className='inline-block bg-primary text-white uppercase py-[7px] px-10 rounded-sm hover:opacity-90'
          >
            Mua ngay
          </Link>
        </div>
      )}
    </div>
  );
};

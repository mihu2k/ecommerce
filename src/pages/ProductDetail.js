import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

// Components
import { Truncate } from '../components/Truncate';
import { Cart } from '../components/Svg/Cart';

// Actions
import { addCart, getProduct } from '../redux/actions';

// Commons
import { formatNumber, kFormatter, numberToCurrency } from '../common';

const thumbnails = [
  {
    img: 'https://cf.shopee.vn/file/fb88c4d2fe9fc3dde588549715852ce3_tn',
  },
  {
    img: 'https://cf.shopee.vn/file/eb593f3020195bc2a7b23439162328de_tn',
  },
  {
    img: 'https://cf.shopee.vn/file/fb88c4d2fe9fc3dde588549715852ce3_tn',
  },
  {
    img: 'https://cf.shopee.vn/file/eb593f3020195bc2a7b23439162328de_tn',
  },
  {
    img: 'https://cf.shopee.vn/file/fb88c4d2fe9fc3dde588549715852ce3_tn',
  },
  {
    img: 'https://cf.shopee.vn/file/eb593f3020195bc2a7b23439162328de_tn',
  },
  {
    img: 'https://cf.shopee.vn/file/fb88c4d2fe9fc3dde588549715852ce3_tn',
  },
  {
    img: 'https://cf.shopee.vn/file/eb593f3020195bc2a7b23439162328de_tn',
  },
];

export const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    products: { product },
    cart,
  } = useSelector((state) => state);

  // Refs
  const wrapImgRef = React.useRef();

  // States
  const [quantityProduct, setQuantityProduct] = React.useState(1);
  const [activeImg, setActiveImg] = React.useState(0);
  const [idxSlider, setIdxSlider] = React.useState(0);

  const handleAddToCart = () => {
    // handle spam click add to cart
    const isNotExist = cart.cart.every((product) => product._id !== id);
    isNotExist && dispatch(addCart(product));
  };

  const handleOnChange = (e) => {
    e.target.validity.valid &&
      setQuantityProduct(e.target.value === '' ? 1 : e.target.value);
  };

  // let idxSlider = 0;
  // const handleClickSlider = (type) => {
  //   if (thumbnails <= 5) return;
  //   if (type === 'prev') {
  //     if (idxSlider <= 0) return;
  //     idxSlider--;
  //     console.log(idxSlider);
  //   }
  //   if (type === 'next') {
  //     if (thumbnails.length - idxSlider > 5) idxSlider++;
  //     console.log(idxSlider);
  //   }
  //   wrapImgRef.current.style.transform = `translateX(${idxSlider * -20}%)`;
  // };
  const handleClickSlider = (type) => {
    if (thumbnails <= 5) return;
    if (type === 'prev') {
      if (idxSlider <= 0) return;
      // idxSlider--;
      setIdxSlider(idxSlider - 1);
      console.log(idxSlider);
    }
    if (type === 'next') {
      if (thumbnails.length - idxSlider > 5)
        // idxSlider++;
        setIdxSlider(idxSlider + 1);
      console.log(idxSlider);
    }
    setIdxSlider((prevState) => {
      wrapImgRef.current.style.transform = `translateX(${prevState * -20}%)`;
      return prevState;
    });
    // wrapImgRef.current.style.transform = `translateX(${idxSlider * -20}%)`;
  };

  React.useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);
  // console.log(cart, 'CART');

  return (
    <div className='pt-6'>
      <section className='bg-white flex mt-6'>
        <div className='p-4 flex-shrink-0'>
          <div className='w-[450px] flex flex-col'>
            <div
              className='w-full pt-[100%] cursor-pointer flex-shrink-0'
              style={{
                background: `url(${product.image}) center no-repeat`,
              }}
            />
            <div className='relative my-2'>
              <span
                className='absolute top-1/2 transform -translate-y-1/2 px-1 py-[6px] bg-[#00000033] cursor-pointer z-[1]'
                onClick={() => handleClickSlider('prev')}
              >
                <i className='fas fa-chevron-left text-xl text-white' />
              </span>
              <span
                className='absolute top-1/2 right-0 transform -translate-y-1/2 px-1 py-[6px] bg-[#00000033] cursor-pointer z-[1]'
                onClick={() => handleClickSlider('next')}
              >
                <i className='fas fa-chevron-right text-xl text-white' />
              </span>
              <div className='w-full overflow-hidden'>
                <div
                  className='flex ml-[-5px]'
                  ref={wrapImgRef}
                  style={{ transition: '0.4s' }}
                >
                  {thumbnails.map((thumbnail, index) => (
                    <div
                      key={index}
                      className={`p-[5px] inline-block ml-[5px] cursor-pointer border-2 ${
                        activeImg === index
                          ? 'border-primary'
                          : 'border-transparent'
                      }`}
                      style={{
                        flexBasis: 'calc(20% - 5px)',
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={thumbnail.img}
                        alt=''
                        className='w-full'
                        onMouseEnter={() => setActiveImg(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex-grow pt-5 pl-5 pr-9'>
          <Truncate tag='div' line={2}>
            <span className='inline-block text-white bg-primary text-xs px-1 py-[1px] rounded-sm transform translate-y-[-2px] mr-3'>
              Yêu thích +
            </span>
            <span className='text-xl leading-[18]px text-gray-600'>
              {product.product_name}
            </span>
          </Truncate>

          <div className='flex items-center divide-x-[2px] mt-4'>
            <div className='flex items-center text-primary mr-4'>
              <span className='leading-5 border-b border-primary mt-[1px]'>
                {formatNumber(product.star)}
                {formatNumber(product.star).length === 1 && '.0'}
              </span>
              <div className='flex items-center ml-1'>
                <i className='fas fa-star text-[13px]' />
                <i className='fas fa-star text-[13px]' />
                <i className='fas fa-star text-[13px]' />
                <i className='fas fa-star text-[13px]' />
                <i className='fas fa-star text-[13px]' />
              </div>
            </div>
            <div className='px-4'>
              <span className='leading-5 border-b border-gray-700 mt-[1px]'>
                1,9k
              </span>
              <span className='text-sm text-gray-500 ml-1'>Đánh Giá</span>
            </div>
            <div className='px-4'>
              <span>{kFormatter(product.sold)}</span>
              <span className='text-sm text-gray-500 ml-1'>Đã Bán</span>
            </div>
          </div>

          <div className='bg-gray-50 flex items-center rounded-sm py-4 px-5 mt-4'>
            {product.price_discount ? (
              <>
                <div className='text-gray-400 line-through'>
                  <span>{numberToCurrency(product.price)}</span>
                </div>
                <div className='text-3xl mx-4 text-primary'>
                  <span>{numberToCurrency(product.price_discount)}</span>
                </div>
                <div className='text-xs text-white bg-primary px-1 rounded-sm font-medium'>
                  {Math.round(
                    100 - (product.price_discount / product.price) * 100
                  )}
                  % GIẢM
                </div>
              </>
            ) : (
              <div className='text-3xl text-primary'>
                <span>{numberToCurrency(product.price)}</span>
              </div>
            )}
          </div>

          <div className='flex flex-col mt-6 px-5'>
            <div className='flex items-center'>
              <div className='w-28 pr-4 text-sm text-gray-500'>Số Lượng</div>
              <div className='flex items-center'>
                <div className='flex items-center border border-gray-300 rounded-sm h-8'>
                  <button className='h-full px-3'>
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
                    value={quantityProduct}
                    pattern='[0-9]*'
                    onChange={handleOnChange}
                  />
                  <button className='h-full px-3'>
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
                <span className='text-gray-500 text-sm ml-4'>
                  10000 sản phẩm có sẵn
                </span>
              </div>
            </div>

            <div className='flex items-center mt-4 text-sm'>
              <div
                className='inline-flex text-primary h-12 items-center rounded-sm border border-primary px-3 mr-4 cursor-pointer bg-[#ffeee8] hover:bg-[#ffc5b22e]'
                onClick={handleAddToCart}
              >
                <Cart className='w-5 h-5 stroke-current fill-current mr-2' />
                <span>Thêm Vào Giỏ Hàng</span>
              </div>
              <div className='h-12 bg-primary text-white text-center leading-[48px] rounded-sm cursor-pointer px-14 hover:opacity-90'>
                Mua Ngay
              </div>
            </div>
          </div>
          {/* ----- */}
        </div>
      </section>
    </div>
  );
};

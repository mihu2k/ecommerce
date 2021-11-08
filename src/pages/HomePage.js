import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { getProducts } from '../redux/actions';

// Components
import { ProductCard } from '../components/ProductCard';

// Assets
import Banner1 from '../assets/images/home/sub_banner_1.png';
import Banner2 from '../assets/images/home/sub_banner_2.png';

const thumbnails = [
  {
    img: 'https://cf.shopee.sg/file/598ed784a0f17c752c12151d121d3c5a_xxhdpi',
  },
  {
    img: 'https://cf.shopee.sg/file/e097ed54b8320e840f266d787d91c75e_xxhdpi',
  },
  {
    img: 'https://cf.shopee.sg/file/09b19d542ea4902f89ec71ed653a0212_xxhdpi',
  },
];

export const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [idxSlider, setIdxSlider] = React.useState(0);

  const wrapSliderRef = React.useRef();

  const handleClickSlider = (type) => {
    const quantitySlider = thumbnails.length;

    if (type === 'prev') {
      if (idxSlider <= 0) {
        setIdxSlider(quantitySlider - 1);
      }
      if (idxSlider > 0) {
        setIdxSlider(idxSlider - 1);
      }
    }
    if (type === 'next') {
      if (idxSlider >= quantitySlider - 1) {
        setIdxSlider(0);
      }
      if (idxSlider < quantitySlider - 1) {
        setIdxSlider(idxSlider + 1);
      }
    }

    setIdxSlider((prevState) => {
      wrapSliderRef.current.style.transform = `translateX(${
        prevState * -100
      }%)`;
      return prevState;
    });
  };

  const handleClickDotSlider = (index) => {
    setIdxSlider(index);
    setIdxSlider((prevState) => {
      wrapSliderRef.current.style.transform = `translateX(${
        prevState * -100
      }%)`;
      return prevState;
    });
  };

  React.useEffect(() => {
    const intervalSlider = setInterval(() => handleClickSlider('next'), 4000);

    return () => {
      clearInterval(intervalSlider);
    };
  }, [idxSlider]);

  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <section className='flex pt-8 pb-4'>
        <div className='' style={{ flex: 2 }}>
          <div className='relative h-full'>
            <span
              className='absolute top-1/2 transform -translate-y-1/2 px-2 py-3 bg-[#00000033] cursor-pointer z-[1]'
              onClick={() => handleClickSlider('prev')}
            >
              <i className='fas fa-chevron-left text-2xl text-white' />
            </span>
            <span
              className='absolute top-1/2 right-0 transform -translate-y-1/2 px-2 py-3 bg-[#00000033] cursor-pointer z-[1]'
              onClick={() => handleClickSlider('next')}
            >
              <i className='fas fa-chevron-right text-2xl text-white' />
            </span>

            <ul className='absolute bottom-5 w-full flex justify-center'>
              {thumbnails.map((_, index) => (
                <li
                  key={index}
                  className={`w-[10px] h-[10px] rounded-full z-[1] mx-1 cursor-pointer ${
                    index === idxSlider
                      ? 'bg-primary'
                      : 'bg-gray-300 border border-gray-400'
                  }`}
                  onClick={() => handleClickDotSlider(index)}
                />
              ))}
            </ul>

            <div className='overflow-hidden w-full h-full'>
              <div
                className='flex h-full'
                ref={wrapSliderRef}
                style={{ transition: 'all ease 0.4s' }}
              >
                {thumbnails.map((item, index) => (
                  <img
                    key={index}
                    src={item.img}
                    alt=''
                    className='object-fill w-full h-full'
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='ml-2' style={{ flex: 1 }}>
          <div className='mb-2'>
            <img src={Banner1} alt='' />
          </div>
          <div className=''>
            <img src={Banner2} alt='' />
          </div>
        </div>
      </section>

      <div className='grid grid-cols-6 gap-x-5 pt-5'>
        <div className='col-span-1'>
          <div className=''>
            <div className='flex items-center py-3 border-b border-gray-200 mb-[10px]'>
              <i className='fas fa-list text-xs mr-2'></i>
              <h4 className='font-medium text-gray-600 text-[17px]'>
                Danh Mục
              </h4>
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
    </>
  );
};

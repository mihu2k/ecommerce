import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import { Logo } from '../Svg/Logo';
import { Tick } from '../Svg/Tick';
import { Truncate } from '../Truncate';
import { PopupCart } from './PopupCart';
import { PopupDownloadApp } from './PopupDownloadApp';
import { PopupNotification } from './PopupNotification';

// Actions
import { getCart } from '../../redux/actions';

export const Header = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [openPopups, setOpenPopups] = React.useState({
    downloadApp: false,
    notification: false,
    account: false,
    inOutShop: false,
    cart: false,
  });

  const handleOnPopups = (popupName) => {
    popupName &&
      setOpenPopups({ ...openPopups, [popupName]: !openPopups[popupName] });
  };

  React.useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  React.useEffect(() => {
    localStorage.setItem('dataCart', JSON.stringify(cart));
  }, [cart]);

  return (
    <header className='header h-[120px] fixed top-0 left-0 right-0 z-[1]'>
      <div className='max-w-[1280px] mx-auto flex flex-col h-full'>
        {/* Header: Phần trên */}
        <div className='flex items-center justify-between py-2 flex-shrink-0'>
          <ul className='flex items-center divide-x divide-[#f1f1f1]'>
            <li>
              <Link
                to='/'
                className='block text-white text-[13px] leading-4 px-2 hover:text-opacity-80'
              >
                Kênh Người Bán
              </Link>
            </li>
            <li>
              <Link
                to='/'
                className='block text-white text-[13px] leading-4 px-2 hover:text-opacity-80'
              >
                Trở thành Người bán Shopee
              </Link>
            </li>
            <li>
              <Link
                to='/web'
                target='_blank'
                rel='noopener noreferrer'
                className='block text-white text-[13px] leading-4 px-2 relative hover:text-opacity-80'
                onMouseEnter={() => handleOnPopups('downloadApp')}
                onMouseLeave={() => handleOnPopups('downloadApp')}
              >
                Tải ứng dụng
                <PopupDownloadApp open={openPopups.downloadApp} />
              </Link>
            </li>
            <li className='flex items-center h-4'>
              <span className='block text-white text-[13px] leading-4 px-2'>
                Kết nối
              </span>
              <Link
                to={{ pathname: 'https://www.google.com' }}
                target='_blank'
                rel='noopener noreferrer'
                className='block'
                title='Kết nối Facebook!'
              >
                <i className='fab fa-facebook text-white' />
              </Link>
              <Link
                to={{ pathname: 'https://www.google.com/?hl=vi' }}
                target='_blank'
                rel='noopener noreferrer'
                className='block px-2'
                title='Kết nối Instagram!'
              >
                <i className='fab fa-instagram text-white text-lg' />
              </Link>
            </li>
          </ul>

          <ul className='flex items-center'>
            <li
              className='relative hover:text-opacity-80 text-white'
              onMouseEnter={() => handleOnPopups('notification')}
              onMouseLeave={() => handleOnPopups('notification')}
            >
              <Link
                to='/user/notifications/order'
                className='flex items-center pr-2'
              >
                <i className='far fa-bell'></i>
                <span className='text-[13px] leading-4 pl-1'>Thông Báo</span>
              </Link>
              <PopupNotification open={openPopups.notification} />
            </li>
            <li>
              <Link to='/' className='flex items-center px-2 hover:opacity-80'>
                <i className='far fa-question-circle text-white'></i>
                <span className='text-white text-[13px] leading-4 pl-1'>
                  Hỗ Trợ
                </span>
              </Link>
            </li>
            {/* <li className='divide-x'>
              <a
                href=''
                className='text-white text-[13px] leading-4 px-2 hover:opacity-80'
              >
                Đăng Ký
              </a>
              <a
                href=''
                className='text-white text-[13px] leading-4 px-2 hover:opacity-80'
              >
                Đăng Nhập
              </a>
            </li> */}
            <li
              className='flex items-center px-2 text-white cursor-pointer hover:text-opacity-80 relative'
              onMouseEnter={() => handleOnPopups('account')}
              onMouseLeave={() => handleOnPopups('account')}
            >
              <img
                src='https://cf.shopee.vn/file/da97fdeade6243b50ca0ea691badd0a9_tn'
                alt='Avatar'
                className='w-5 h-5 flex-shrink-0 rounded-full'
              />
              <Link
                to='/user/purchase'
                className='text-[13px] leading-4 pl-[6px]'
              >
                Minh Hưng
              </Link>

              {openPopups.account && (
                <ul className='header__popup-account absolute right-0 min-w-max bg-white text-gray-500 text-sm border border-gray-200 shadow-sm rounded-[3px] z-[1]'>
                  <Link
                    to='/user/account/profile'
                    className='block px-4 py-[10px] hover:bg-gray-100 hover:text-green-400'
                  >
                    Tài Khoản Của Tôi
                  </Link>
                  <Link
                    to='/user/purchase'
                    className='block px-4 py-[10px] hover:bg-gray-100 hover:text-green-400'
                  >
                    Đơn Mua
                  </Link>
                  <li className='cursor-pointer px-4 py-[10px] hover:bg-gray-100 hover:text-green-400'>
                    Đăng Xuất
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* Header: Phần dưới */}
        <div className='flex-grow flex items-center'>
          <div className='flex-shrink-0'>
            <Link to='/' className='block text-white pr-10 mb-4'>
              <Logo />
            </Link>
          </div>

          <div className='flex-grow flex flex-col'>
            <div className='bg-white h-10 flex items-center rounded-sm my-[5px]'>
              <div className='flex-grow h-full relative'>
                <input
                  type='text'
                  className='header__input-search w-full h-full px-4 text-sm focus:outline-none placeholder-shown:text-sm'
                  placeholder='Tìm sản phẩm, thương hiệu và tên shop'
                  onChange={() => {
                    console.log('Change');
                  }}
                />

                <div
                  className='header__history-search absolute left-0 right-4 bg-white rounded-sm text-sm z-[1] opacity-0 invisible'
                  style={{
                    top: 'calc(100% + 4px)',
                    boxShadow: '0 1px 5px rgba(0, 0, 0, .4)',
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <h3 className='text-gray-300 px-3 py-[10px] select-none font-normal'>
                    Lịch sử Tìm kiếm
                  </h3>
                  <ul className='text-gray-600'>
                    <li
                      className='px-3 py-[10px] cursor-pointer hover:bg-gray-50'
                      onClick={() => console.log('click')}
                    >
                      đâsdsadsad
                    </li>
                    <li className='px-3 py-[10px] cursor-pointer hover:bg-gray-50'>
                      11111111111
                    </li>
                  </ul>
                </div>
              </div>

              <div
                className='h-full relative flex items-center cursor-pointer'
                onMouseEnter={() => handleOnPopups('inOutShop')}
                onMouseLeave={() => handleOnPopups('inOutShop')}
              >
                <div className='border-l border-gray-300'>
                  <div className='flex items-center max-w-[150px] pl-4 pr-[10px] text-sm'>
                    <Truncate tag='span' line={1} className='pr-4'>
                      Trong shop Tro shop
                    </Truncate>
                    <i className='fas fa-angle-down transform translate-y-[1px]'></i>
                  </div>
                </div>

                {openPopups.inOutShop && (
                  <ul
                    className='header__popup-in-shop absolute right-0 bg-white min-w-max z-[2] rounded-sm border border-transparent'
                    style={{
                      top: 'calc(100% + 4px)',
                      boxShadow: '0 1px 5px rgba(0, 0, 0, .3)',
                      animation: 'fadeIn 0.2s linear',
                    }}
                  >
                    <li className='text-primary flex items-center pl-4 pr-[10px] py-[10px] h-[45px] text-sm hover:bg-gray-50'>
                      <span className='text-black mr-4'>
                        Trong Thời Trang Nam
                      </span>
                      <Tick />
                    </li>
                    <li className='text-primary flex items-center pl-4 pr-[10px] py-[10px] h-[45px] text-sm hover:bg-gray-50'>
                      <span className='text-black mr-4'>Trong Shopee</span>
                      {/* <Tick /> */}
                    </li>
                  </ul>
                )}
              </div>

              <button className='flex items-center justify-center bg-primary h-[34px] px-6 mr-[3px] rounded-sm'>
                <i className='fas fa-search text-white text-sm' />
              </button>
            </div>

            <ul className='flex items-center text-xs'>
              <li>
                <Link to='/' className='capitalize text-white opacity-90 mr-4'>
                  Áo khoác
                </Link>
              </li>
              <li>
                <Link to='/' className='capitalize text-white opacity-90 mr-4'>
                  Bông Tẩy Trang
                </Link>
              </li>
              <li>
                <Link to='/' className='capitalize text-white opacity-90 mr-4'>
                  Bánh Trung Thu
                </Link>
              </li>
              <li>
                <Link to='/' className='capitalize text-white opacity-90 mr-4'>
                  Tai Nghe
                </Link>
              </li>
              <li>
                <Link to='/' className='capitalize text-white opacity-90 mr-4'>
                  Váy
                </Link>
              </li>
            </ul>
          </div>

          <div className='w-36 flex-shrink-0 flex justify-center mb-1'>
            <div
              className='inline-block px-4 py-2 cursor-pointer relative'
              onMouseEnter={() => handleOnPopups('cart')}
              onMouseLeave={() => handleOnPopups('cart')}
            >
              <Link to='/cart'>
                <i className='fas fa-shopping-cart text-[26px] text-white' />
              </Link>
              {cart.length > 0 && (
                <div
                  className='absolute top-[-2px] bg-white rounded-full text-primary px-1 pt-[1px] leading-4 text-sm font-medium border-2 border-primary'
                  style={{ left: 'calc(100% - 24px)' }}
                >
                  {cart.length}
                </div>
              )}
              {openPopups.cart && <PopupCart cart={cart} />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

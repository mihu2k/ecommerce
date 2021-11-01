import React from 'react';
import { Link } from 'react-router-dom';

// Components
import { Truncate } from '../Truncate';

export const PopupNotification = ({ open }) => {
  const fakeData = [
    {
      id: 1,
      image: 'https://cf.shopee.vn/file/eca175ffb93966cec9e2aff44a309208_tn',
      title:
        'Voucher tặng bạn mới đang chờ bạn nhận! Voucher tặng bạn mới đang chờ bạn nhận!',
      content:
        'minhhng960 ơi, miễn phí vận chuyển đơn đầu tiên từ 0đ! Nhanh tay sử dụng ngay! minhhng960 ơi, miễn phí vận chuyển đơn đầu tiên từ 0đ! Nhanh tay sử dụng ngay!',
    },
    {
      id: 2,
      image: 'https://cf.shopee.vn/file/b7a7d1647f72375d83668ef4bfe92ea0_tn',
      title: 'Voucher tặng bạn mới đang chờ bạn nhận!',
      content:
        'minhhng960 ơi, miễn phí vận chuyển đơn đầu tiên từ 0đ! Nhanh tay sử dụng ngay!',
    },
  ];

  return (
    <React.Fragment>
      {open && (
        <div className='header__popup-notifications notifications absolute right-0 bg-white w-[402px] rounded-sm shadow-sm z-[2] border border-gray-100 cursor-pointer'>
          <h3 className='bg-[#fefefe] text-gray-400 p-3 font-light text-sm select-none cursor-default'>
            Thông Báo Mới Nhận
          </h3>
          <ul className='max-h-[360px] overflow-y-auto'>
            {fakeData.length > 0
              ? fakeData.map((notification) => (
                  <li key={notification.id}>
                    <Link to='/' className='flex p-3 hover:bg-gray-50'>
                      <img
                        src={notification.image}
                        alt=''
                        className='w-10 h-10 bg-gray-200 flex-shrink-0'
                      />
                      <div className='flex-grow ml-2'>
                        <Truncate
                          tag='h5'
                          line={1}
                          className='text-sm text-gray-500'
                        >
                          {notification.title}
                        </Truncate>
                        <Truncate
                          tag='p'
                          line={3}
                          className='text-xs mt-[6px] text-gray-400'
                        >
                          {notification.content}
                        </Truncate>
                      </div>
                    </Link>
                  </li>
                ))
              : null}
          </ul>
          <Link
            to='/user/notifications/order'
            className='flex items-center justify-center text-gray-500 py-3 bg-[#fefefe] text-sm hover:bg-gray-50'
          >
            <span>Xem tất cả</span>
          </Link>
        </div>
      )}
    </React.Fragment>
  );
};

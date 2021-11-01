import React from 'react';

// Images
import QrCode from '../../assets/images/qr-code.png';
import GGPlay from '../../assets/images/gg-play.png';
import AppStore from '../../assets/images/app-store.png';
import AppGallery from '../../assets/images/app-gallery.png';

export const PopupDownloadApp = ({ open }) => {
  return (
    <React.Fragment>
      {open && (
        <div
          className='block absolute top-full z-[2] w-[184px] shadow-sm'
          style={{
            animation: 'fadeIn 0.2s linear',
          }}
        >
          <div className='w-full mt-2 bg-white rounded-sm p-[2px]'>
            <img
              src={QrCode}
              alt='QR Code'
              className='w-full h-[180px] rounded-tl-sm rounded-tr-sm'
            />

            <div className='flex flex-wrap justify-between px-[15px] pb-[5px] mt-2'>
              <img src={AppStore} alt='QR Code' className='w-[70px] mb-3' />
              <img src={GGPlay} alt='QR Code' className='w-[72px] mb-3' />
              <img src={AppGallery} alt='QR Code' className='w-[70px] mb-2' />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

import * as types from '../type';

const initialState = {
  products: [],
  product: {},
};

export const productReducer = (state = initialState, action) => {
  const fakeData = [
    {
      _id: '1',
      price: 699000,
      image: 'https://cf.shopee.vn/file/081421c017e8102f319402ed7ab2a986_tn',
      product_name: 'Đĩa Game PS4 Grand Theft Auto V Premium Edition (GTA 5)',
      price_discount: 649000,
      star: 4,
      sold: 301,
      province: 'TP. Hồ Chí Minh',
      extend: {
        label: 'like',
      },
    },
    {
      _id: '6',
      price: 9000,
      image: 'https://cf.shopee.vn/file/d31fa9d819844772fdcd36b2a2ada647_tn',
      product_name: 'Jack DC DC-022B',
      discount: null,
      star: 5,
      sold: 3620,
      province: 'TP. Hồ Chí Minh',
      extend: {
        label: 'like',
      },
    },
    {
      _id: '2',
      price: 550000,
      image: 'https://cf.shopee.vn/file/c53b2e05fcebbbd5cebe569c46f99666_tn',
      product_name:
        'Micro không dây Karaoke JVJ YS-91 Bluetooth - Hỗ trợ ghi âm',
      price_discount: 429000,
      star: 5,
      sold: 5140,
      province: 'Hà Nội',
      extend: {
        label: 'mall',
      },
    },
    {
      _id: '3',
      price: 199000,
      image: 'https://cf.shopee.vn/file/0913743f473de79a602b8730173705a3_tn',
      product_name:
        'Tai nghe Bluetooth i12 TWS 5.0 tai nghe i12 không dây bản Quốc tế âm thanh chuẩn HIFI dùng cho IOS Android',
      price_discount: 135000,
      star: 5,
      sold: 23620,
      province: 'Hà nội',
      extend: {
        label: 'like',
      },
    },
    {
      _id: '4',
      price: 175000,
      image: 'https://cf.shopee.vn/file/9e23fab8593605dba7290e5c81e91cbc_tn',
      product_name: 'Quần jean nam baggy kiểu ống rộng dáng suông chất bò QD04',
      price_discount: 149000,
      star: 5,
      sold: 5100,
      province: 'Hà Nội',
      extend: {
        label: 'like',
      },
    },
    {
      _id: '5',
      price: 149000,
      image: 'https://cf.shopee.vn/file/328c3b031b31385cc5b3b7c36afabf6f_tn',
      product_name:
        'Áo hoodie Chống nắng Cho nam nữ và Cặp Đôi NHIỀU Màu,Form rộng Unisex( Có viền tay)',
      price_discount: 99000,
      star: 4,
      sold: 9822,
      province: 'TP. Hồ Chí Minh',
      extend: {
        label: 'like',
      },
    },
  ];

  switch (action.type) {
    case types.GET_PRODUCTS_SUCCESS:
      // Add field count for product
      const newData = fakeData.map((product) => ({ ...product, count: 1 }));
      return {
        ...state,
        products: newData,
      };

    case types.GET_PRODUCT_SUCCESS:
      const product = fakeData.find(
        (product) => product._id === action.payload
      );
      product.count = 1;
      return {
        ...state,
        product,
      };

    default:
      return state;
  }
};

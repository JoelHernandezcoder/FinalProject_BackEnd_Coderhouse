const Product = require('../models/product.js');

const productData = [
  {
    title: 'AORUS GeForce RTX™ 3090 XTREME 24G',
    price: 2000,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, sit voluptatibus. Deserunt nulla explicabo amet culpa deleniti ipsa eveniet sunt dolorum ipsam. Asperiores dolorem at aliquam tenetur, molestiae itaque. Architecto?',
    imageUrl: '/images/products/2022-07-12T09:42:42.669Z-3090.png',
  },
  {
    title: 'AORUS GeForce RTX™ 3080 MASTER 12G',
    price: 1200,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, sit voluptatibus. Deserunt nulla explicabo amet culpa deleniti ipsa eveniet sunt dolorum ipsam. Asperiores dolorem at aliquam tenetur, molestiae itaque. Architecto?',
    imageUrl: '/images/products/2022-07-12T09:45:53.546Z-3080.png',
  },
  {
    title: 'AORUS GeForce RTX™ 3090 Ti XTREME WATERFORCE 24G',
    price: 2500,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, sit voluptatibus. Deserunt nulla explicabo amet culpa deleniti ipsa eveniet sunt dolorum ipsam. Asperiores dolorem at aliquam tenetur, molestiae itaque. Architecto?',
    imageUrl: '/images/products/2022-07-12T09:51:35.080Z-3090ti.png',
  },
  {
    title: 'EVGA GeForce RTX 3060 Ti XC GAMING 8GB GDDR6',
    price: 400,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, sit voluptatibus. Deserunt nulla explicabo amet culpa deleniti ipsa eveniet sunt dolorum ipsam. Asperiores dolorem at aliquam tenetur, molestiae itaque. Architecto?',
    imageUrl: '/images/products/2022-07-12T09:53:52.323Z-3060ti.png',
  },
  {
    title: 'ASUS Dual GeForce RTX™ 2060 EVO OC Edition 12GB GDDR6',
    price: 500,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, sit voluptatibus. Deserunt nulla explicabo amet culpa deleniti ipsa eveniet sunt dolorum ipsam. Asperiores dolorem at aliquam tenetur, molestiae itaque. Architecto?',
    imageUrl: '/images/products/2022-07-12T10:00:54.639Z-2060.png',
  },
  {
    title: 'MSI Radeon RX™ 6800 XT GAMING X TRIO 16G',
    price: 800,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, sit voluptatibus. Deserunt nulla explicabo amet culpa deleniti ipsa eveniet sunt dolorum ipsam. Asperiores dolorem at aliquam tenetur, molestiae itaque. Architecto?',
    imageUrl: '/images/products/2022-07-12T10:03:06.806Z-amd6800xt.png',
  },
];

const seedProducts = async () => {
  try {
    await Product.create(productData);
  } catch (err) {
    console.log(err);
  }
};

module.exports = seedProducts;

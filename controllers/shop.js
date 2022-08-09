const fs = require('fs');
const path = require('path');

const stripe = require('stripe')(
  'sk_test_51LEeSoLIosFZTclcmN0Qu8lP5sWZoFx8GWfLYh4eTPLKno6Xf6Y107ilViom85XpSKfgnQtmBkbIIDDtXZxolXif00DsZRPT1B'
);

const pdfkit = require('pdfkit');

const Order = require('../models/order');
const Product = require('../models/product');

const ITEMS_PRE_PAGE = 6;

exports.getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let totalItems;

    const numProducts = await Product.find().countDocuments();
    totalItems = parseInt(numProducts);

    const products = await Product.find()
      .skip((page - 1) * ITEMS_PRE_PAGE)
      .limit(ITEMS_PRE_PAGE);

    res.render('shop/product-list', {
      title: 'All Products',
      products: products,
      path: '/products',
      currentPage: page,
      totalProducts: totalItems,
      hasNextPage: ITEMS_PRE_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PRE_PAGE),
    });
    return products;
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    return next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    res.render('shop/product-details', {
      title: product.title + ' | Product Details',
      product: product,
    });
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    return next(error);
  }
};

exports.getIndex = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  let totalItems;
  const numProducts = await Product.find().countDocuments();
  try {
    totalItems = parseInt(numProducts);
    const products = await Product.find()
      .skip((page - 1) * ITEMS_PRE_PAGE)
      .limit(ITEMS_PRE_PAGE);
    res.render('shop/index', {
      title: 'Shop Home',
      products: products,
      path: '/',
      currentPage: page,
      totalProducts: totalItems,
      hasNextPage: ITEMS_PRE_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PRE_PAGE),
    });
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    return next(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const user = await req.user
      .populate('cart.products.productId', 'title price')
      .execPopulate();
    const products = await user.cart.products;
    res.render('shop/cart', {
      path: '/cart',
      title: 'Cart',
      products: products,
    });
    return products;
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    return next(error);
  }
};

exports.postCart = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const product = await Product.findById(productId);
    const prodCart = await req.user.addToCart(product);
    res.redirect('/cart');
    return prodCart;
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    return next(error);
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    await req.user.deleteCartItem(productId);
    res.redirect('/cart');
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    return next(error);
  }
};

exports.getCheckoutSuccess = async (req, res, next) => {
  try {
    const user = await req.user
      .populate('cart.products.productId', 'title price')
      .execPopulate();
    const products = await user.cart.products.map((product) => {
      return {
        product: {
          productId: product.productId._id,
          title: product.productId.title,
          price: product.productId.price,
        },
        quantity: product.quantity,
      };
    });

    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice =
        totalPrice +
        parseInt(product.product.price) * parseInt(product.quantity);
    });
    const orders = new Order({
      user: {
        userId: req.user._id,
        email: req.user.email,
      },
      products: products,
      orderValue: totalPrice,
    });

    await req.user.clearCart();
    res.redirect('/orders');
    return await orders.save();
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    return next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ 'user.userId': req.user._id });
    res.render('shop/orders', {
      path: '/orders',
      title: 'Your Orders',
      orders: orders,
    });
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    return next(error);
  }
};

exports.getCheckout = async (req, res, next) => {
  try {
    let totalPrice = 0;
    let products;
    const user = await req.user
      .populate('cart.products.productId', 'title price description')
      .execPopulate();
    products = user.cart.products.map((product) => {
      return {
        product: {
          productId: product.productId._id,
          title: product.productId.title,
          price: product.productId.price,
          description: product.productId.description,
        },
        quantity: product.quantity,
      };
    });
    totalPrice = 0;
    products.forEach((product) => {
      totalPrice =
        totalPrice +
        parseInt(product.product.price) * parseInt(product.quantity);
    });
    res.render('shop/checkout', {
      title: 'Checkout',
      path: '/checkout',
      products: products,
      totalPrice: totalPrice,
    });
    return products;
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    return next(error);
  }
};

exports.getCheckout = async (req, res, next) => {
  try {
    let totalPrice = 0;
    let products;
    const user = await req.user
      .populate('cart.products.productId', 'title price description')
      .execPopulate();

    products = user.cart.products.map((product) => {
      return {
        product: {
          productId: product.productId._id,
          title: product.productId.title,
          price: product.productId.price,
          description: product.productId.description,
        },
        quantity: product.quantity,
      };
    });

    totalPrice = 0;
    products.forEach((product) => {
      totalPrice =
        totalPrice +
        parseInt(product.product.price) * parseInt(product.quantity);
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: products.map((p) => {
        return {
          price_data: {
            currency: 'usd',
            unit_amount: p.product.price * 100,
            product_data: { name: p.product.title },
          },
          quantity: p.quantity,
        };
      }),
      mode: 'payment',
      success_url: `${req.protocol}://${req.get('host')}/checkout/success`,
      cancel_url: `${req.protocol}://${req.get('host')}/checkout/cancel`,
    });

    res.render('shop/checkout', {
      title: 'Checkout',
      path: '/checkout',
      products: products,
      totalPrice: totalPrice,
      sessionId: session.id,
    });

    return products;
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    return next(error);
  }
};

exports.getInvoice = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const invoiceName = `Invoice-${orderId}.pdf`;
    // const invoicePath = path.join('Data', 'Invoices', invoiceName);

    const order = await Order.findById(orderId);

    if (!order) {
      return next(new Error('No order Found'));
    }
    if (order.user.userId.toString() !== req.user._id.toString()) {
      return next(new Error('Unauthorized Access'));
    }

    const invoicePdf = new pdfkit();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${invoiceName}`);

    // invoicePdf.pipe(fs.createWriteStream(invoicePath));
    invoicePdf.pipe(res);

    invoicePdf.fontSize(22).text('Invoice', { align: 'center' });
    invoicePdf
      .fontSize(14)
      .text(
        '--------------------------------------------------------------------',
        {
          align: 'center',
        }
      )
      .text('C O D E R        S H O P', {
        align: 'center',
      })
      .text(
        '--------------------------------------------------------------------',
        {
          align: 'center',
        }
      );

    invoicePdf.fontSize(40).text(' ', { align: 'center' });

    invoicePdf
      .fontSize(16)
      .text(`User: ${order.user.email}`, { align: 'right' });

    invoicePdf.fontSize(40).text(' ', { align: 'center' });

    order.products.forEach((prod, index) => {
      invoicePdf
        .fontSize(14)
        .text(
          `${index + 1}). ${prod.product.title} (${prod.quantity}) - \$${
            prod.product.price
          }`
        );
    });

    invoicePdf.fontSize(40).text(' ', { align: 'center' });

    invoicePdf
      .fontSize(12)
      .text(
        '__________________________________________________________________',
        {
          align: 'center',
        }
      );

    invoicePdf.fontSize(10).text(' ', { align: 'center' });

    invoicePdf
      .fontSize(20)
      .text(`Total: \$${order.orderValue}`, { align: 'center' });

    invoicePdf.fontSize(5).text(' ', { align: 'center' });

    invoicePdf
      .fontSize(12)
      .text(
        '__________________________________________________________________',
        {
          align: 'center',
        }
      );

    invoicePdf
      .fontSize(12)
      .text('Country: ARG | Phone: 123456 | Email: codershop@gmail.com', {
        align: 'center',
      });

    invoicePdf.end();
  } catch (err) {
    next(err);
  }
};

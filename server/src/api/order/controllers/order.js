"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { userId, products, userName, email, phone } = ctx.request.body;

    let lineItems;

    // Attempt to retrieve item information
    try {
      lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::item.item")
            .findOne(product.id);

          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100,
            },
            quantity: product.count,
          };
        })
      );
    } catch (error) {
      ctx.response.status = 500;
      return { error: { message: "Error retrieving items: " + error.message } };
    }

    let session;

    // Attempt to create a stripe session
    try {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        success_url: "http://localhost:3000/checkout/success",
        cancel_url: "http://localhost:3000",
        line_items: lineItems,
      });
    } catch (error) {
      ctx.response.status = 500;
      return { error: { message: "Error creating stripe session: " + error.message } };
    }

    // Attempt to create the order
    try {
      await strapi
        .service("api::order.order")
        .create({
          data: {
            userName,
            products,
            stripeSessionId: session.id,
            email,
            phone,
            userId
          }
        });
    } catch (error) {
      ctx.response.status = 500;
      return { error: { message: "Error creating order: " + error.message } };
    }

    return { id: session.id };
  },
}));

// This example shows how to intall Google Ads standard event tracking with enhanced conversions
// (Version 2 is less clean but easier to understand for non-programmers)
// Replace Google Ads ID with your own and the conversion label inside of checkoutData

const script = document.createElement("script");
script.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=AW-EXAMPLE");
script.setAttribute("async", "");
document.head.appendChild(script);

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "AW-EXAMPLE", { "allow_enhanced_conversions": true });

analytics.subscribe("checkout_completed", async (event) => {
  const enhancedConversionData = {
    email: event.data.checkout.email,
    phone_number: event.data.checkout.phone,
    address: {
      first_name: event.data.checkout.shippingAddress.firstName,
      last_name: event.data.checkout.shippingAddress.lastName,
      street: event.data.checkout.shippingAddress.address1,
      city: event.data.checkout.shippingAddress.city,
      region: event.data.checkout.shippingAddress.provinceCode,
      postal_code: event.data.checkout.shippingAddress.zip,
      country: event.data.checkout.shippingAddress.countryCode,
    }
  };

  const checkoutData = {
    send_to: "AW-XXXXXXXXXX/YYYYYYYYYYYYYYYYYYY",
    transaction_id: event.data.checkout.order.id,
    currency: event.data.checkout.currencyCode,
    value: event.data.checkout.totalPrice.amount,
    items: event.data.checkout.lineItems.map(item => ({
      item_id: item.variant.product.id,
      item_name: item.variant.product.title,
    })),
  };

  gtag("set", "user_data", enhancedConversionData);
  gtag("event", "conversion", checkoutData);
});

analytics.subscribe("search_submitted", async (event) => {
  gtag("event", "search", { search_term: event.data.searchResult.query });
});

analytics.subscribe("product_viewed", async (event) => {
  gtag("event", "view_item", {
    currency: event.data.productVariant.price.currencyCode,
    value: event.data.productVariant.price.amount,
    items: [{
      item_id: event.data.productVariant.id,
      item_name: event.data.productVariant.product.title
    }],
  });
});

analytics.subscribe("collection_viewed", async (event) => {
  gtag("event", "view_item_list", {
    items: event.data.collection.productVariants.map(variant => ({
      item_id: variant.id,
      item_name: variant.product.title,
    })),
  });
});

analytics.subscribe("product_added_to_cart", async (event) => {
  gtag("event", "add_to_cart", {
    currency: event.data.cartLine.merchandise.price.currencyCode,
    value: event.data.cartLine.merchandise.price.amount,
    items: [{
      item_id: event.data.cartLine.merchandise.id,
      item_name: event.data.cartLine.merchandise.product.title
    }],
  });
});

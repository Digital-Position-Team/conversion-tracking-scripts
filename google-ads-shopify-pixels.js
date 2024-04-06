// This example shows how to intall Google Ads standard event tracking with enhanced conversions
// (Same as Version 2 except the code is more organized)
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
gtag("config", "AW-EXAMPLE");

const DPEvents = {
  getItemsFromLineItems(lineItems) {
    let items = []
    for (const item of lineItems) {
      items.push({
        item_id: item.variant.product.id,
        item_name: item.variant.product.title,
      })
    }

    return items
  },

  getItemsFromProductVariants(productVariants) {
    let items = []
    for (const item of productVariants) {
      items.push({
        item_id: item.id,
        item_name: item.product.title,
      })
    }

    return items
  },

  getViewItemData(evt) {
    return {
      currency: evt.data.productVariant.price.currencyCode,
      value: evt.data.productVariant.price.amount,
      items: [{ item_id: evt.data.productVariant.id, item_name: evt.data.productVariant.product.title }],
    }
  },

  getViewItemListData(evt) {
    return {
      items: this.getItemsFromProductVariants(evt.data.collection.productVariants),
    }
  },

  getAddToCartData(evt) {
    return {
      currency: evt.data.cartLine.merchandise.price.currencyCode,
      value: evt.data.cartLine.merchandise.price.amount,
      items: [{ item_id: evt.data.cartLine.merchandise.id, item_name: evt.data.cartLine.merchandise.product.title }],
    }
  },

  enhancedConversionData(evt) {
    return {
      email: evt.data.checkout.email,
      phone_number: evt.data.checkout.phone,
      address: {
        first_name: evt.data.checkout.shippingAddress.firstName,
        last_name: evt.data.checkout.shippingAddress.lastName,
        street: evt.data.checkout.shippingAddress.address1,
        city: evt.data.checkout.shippingAddress.city,
        region: evt.data.checkout.shippingAddress.provinceCode,
        postal_code: evt.data.checkout.shippingAddress.zip,
        country: evt.data.checkout.shippingAddress.countryCode,
      },
    }
  },

  getCheckoutCompletData(evt) {
    return {
      send_to: "AW-XXXXXXXXXX/YYYYYYYYYYYYYYYYYYY",
      transaction_id: evt.data.checkout.order.id,
      currency: evt.data.checkout.currencyCode,
      value: evt.data.checkout.totalPrice.amount,
      items: this.getItemsFromLineItems(evt.data.checkout.lineItems),
    }
  }
}

analytics.subscribe("checkout_completed", async (event) => {
  gtag("set", "user_data", DPEvents.enhancedConversionData(event));
  gtag("event", "conversion", DPEvents.getCheckoutCompletData(event));
});

analytics.subscribe("search_submitted", async (event) => {
  gtag("event", "search", { search_term: event.data.searchResult.query, });
});

analytics.subscribe("product_viewed", async (event) => {
  gtag("event", "view_item", DPEvents.getViewItemData(event));
});

analytics.subscribe("collection_viewed", async (event) => {
  gtag("event", "view_item_list", DPEvents.getViewItemListData(event));
});

analytics.subscribe("product_added_to_cart", async (event) => {
  gtag("event", "add_to_cart", DPEvents.getAddToCartData(event));
});

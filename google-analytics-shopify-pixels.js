// This example shows how to intall Google Analytics (GA4) standard event tracking
// (Same as Version 2 except code is more organized)
// Replace GA4 Datastream id with your own

const script = document.createElement("script");
script.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-EXAMPLE");
script.setAttribute("async", "");
document.head.appendChild(script);

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-EXAMPLE", { send_page_view: false });

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

  getPageViewData(evt) {
    let ctx = evt.context
    return {
      page_location: ctx.document.location.href,
      page_title: ctx.document.title,
      language: ctx.language,
    }
  },

  getViewItemData(evt) {
    return {
      currency: evt.data.productVariant.price.currencyCode,
      value: evt.data.productVariant.price.amount,
      items: [{ item_id: evt.data.productVariant.id, item_name: evt.data.productVariant.product.title }],
    }
  },

  getViewCollectionData(evt) {
    return {
      items: event.data.collection.productVariants.map(variant => ({
        item_id: variant.id,
        item_name: variant.product.title,
      })
    }
  },

  getAddToCartData(evt) {
    return {
      currency: evt.data.cartLine.merchandise.price.currencyCode,
      value: evt.data.cartLine.merchandise.price.amount,
      items: [{ item_id: evt.data.cartLine.merchandise.id, item_name: evt.data.cartLine.merchandise.product.title }],
    }
  },

  getPaymentInfoData(evt) {
    return {
      currency: evt.data.checkout.currencyCode,
      value: evt.data.checkout.totalPrice.amount,
      items: this.getItemsFromLineItems(evt.data.checkout.lineItems),
    }
  },

  getCheckoutData(evt) {
    return {
      currency: evt.data.checkout.currencyCode,
      value: evt.data.checkout.totalPrice.amount,
      items: this.getItemsFromLineItems(evt.data.checkout.lineItems),
    }
  },

  getCheckoutCompletData(evt) {
    return {
      transaction_id: evt.data.checkout.order.id,
      currency: evt.data.checkout.currencyCode,
      value: evt.data.checkout.totalPrice.amount,
      items: this.getItemsFromLineItems(evt.data.checkout.lineItems),
    }
  }
}


analytics.subscribe("page_viewed", async (event) => {
  gtag("event", "page_view", DPEvents.getPageViewData(event));
});

analytics.subscribe("product_viewed", async (event) => {
  gtag("event", "view_item", DPEvents.getViewItemData(event));
});

analytics.subscribe("search_submitted", async (event) => {
  gtag("event", "search", {search_term: event.data.searchResult.query});
});

analytics.subscribe("product_added_to_cart", async (event) => {
  gtag("event", "add_to_cart", DPEvents.getAddToCartData(event));
});

analytics.subscribe("collection_viewed", async (event) => {
  gtag("event", "view_item_list", DPEvents.getViewCollectionData(event));
});

analytics.subscribe("payment_info_submitted", async (event) => {
  gtag("event", "add_payment_info", DPEvents.getPaymentInfoData(event));
});

analytics.subscribe("checkout_started", async (event) => {
  gtag("event", "begin_checkout", DPEvents.getCheckoutData(event) );
});

analytics.subscribe("checkout_completed", async (event) => {
  gtag("event", "purchase", DPEvents.getCheckoutCompletData(event));
});

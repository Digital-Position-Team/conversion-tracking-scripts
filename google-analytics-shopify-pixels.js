// This example shows how to intall Google Analytics (GA4) standard event tracking
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

analytics.subscribe("page_viewed", async (event) => {
  let ctx = event.context;
  gtag("event", "page_view", {
    page_location: ctx.document.location.href,
    page_title: ctx.document.title,
    language: ctx.language,
  });
});

analytics.subscribe("product_viewed", async (event) => {
  gtag("event", "view_item", {
    currency: event.data.productVariant.price.currencyCode,
    value: event.data.productVariant.price.amount,
    items: [{
      item_id: event.data.productVariant.id,
      item_name: event.data.productVariant.product.title,
      price: event.data.productVariant.price.amount,
      quantity: 1
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

analytics.subscribe("search_submitted", async (event) => {
  gtag("event", "search", {
    search_term: event.data.searchResult.query,
  });
});

analytics.subscribe("product_added_to_cart", async (event) => {
  gtag("event", "add_to_cart", {
    currency: event.data.cartLine.merchandise.price.currencyCode,
    value: event.data.cartLine.merchandise.price.amount,
    items: [{
      item_id: event.data.cartLine.merchandise.id,
      item_name: event.data.cartLine.merchandise.product.title,
      price: event.data.cartLine.cost.amount,
      quantity: event.data.cartLine.quantity
    }],
  });
});

analytics.subscribe("payment_info_submitted", async (event) => {
  gtag("event", "add_payment_info", {
    currency: event.data.checkout.currencyCode,
    value: event.data.checkout.totalPrice.amount,
    items: event.data.checkout.lineItems.map(item => ({
      item_id: item.variant.product.id,
      item_name: item.variant.product.title,
      price: item.variant.price.amount,
      quantity: item.quantity
    })),
  });
});

analytics.subscribe("checkout_started", async (event) => {
  gtag("event", "begin_checkout", {
    currency: event.data.checkout.currencyCode,
    value: event.data.checkout.totalPrice.amount,
    items: event.data.checkout.lineItems.map(item => ({
      item_id: item.variant.product.id,
      item_name: item.variant.product.title,
      price: item.variant.price.amount,
      quantity: item.quantity
    })),
  });
});

analytics.subscribe("checkout_completed", async (event) => {
  gtag("event", "purchase", {
    transaction_id: event.data.checkout.order.id,
    currency: event.data.checkout.currencyCode,
    value: event.data.checkout.totalPrice.amount,
    items: event.data.checkout.lineItems.map(item => ({
      item_id: item.variant.product.id,
      item_name: item.variant.product.title,
      price: item.variant.price.amount,
      quantity: item.quantity
    })),
  });
});

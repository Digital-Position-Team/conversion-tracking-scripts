// Step 1. Add and initialize your third-party JavaScript pixel
const script = document.createElement("script");
script.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-EXAMPLE");
script.setAttribute("async", "");
document.head.appendChild(script);

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-EXAMPLE");

// Directly embedding logic within analytics.subscribe callbacks

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
      item_name: event.data.productVariant.product.title
    }],
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
      item_name: event.data.cartLine.merchandise.product.title
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
    })),
  });
});

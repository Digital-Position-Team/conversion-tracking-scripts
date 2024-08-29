// This example shows how to do a full install of GTM with a data layer
// (You should remove all other references to GTM across the site to prevent double counting)
// Replace GTM ID with your own
//
// Events tracked:
// - checkout_completed
// - checkout_started
// - payment_info_submitted
// - checkout_shipping_info_submitted
// - product_added_to_cart
// - product_removed_from_cart
// - cart_viewed
// - page_viewed
// - product_viewed
// - collection_viewed
// - search_submitted

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

//Initialize GTM tag
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer', 'GTM-XXXXXXX');

//subscribe to events
analytics.subscribe("checkout_completed", (event) => {
  window.dataLayer.push({
    event: "checkout_completed",
    timestamp: event.timestamp,
    id: event.id,
    token: event.data?.checkout?.token,
    url: event.context.document.location.href,
    client_id: event.clientId,
    email: event.data?.checkout?.email,
    phone: event.data?.checkout?.phone,
    first_name: event.data?.checkout?.shippingAddress?.firstName,
    last_name: event.data?.checkout?.shippingAddress?.lastName,
    address1: event.data?.checkout?.shippingAddress?.address1,
    address2: event.data?.checkout?.shippingAddress?.address2,
    city: event.data?.checkout?.shippingAddress?.city,
    country: event.data?.checkout?.shippingAddress?.country,
    country_code: event.data?.checkout?.shippingAddress?.countryCode,
    province: event.data?.checkout?.shippingAddress?.province,
    province_code: event.data?.checkout?.shippingAddress?.provinceCode,
    zip: event.data?.checkout?.shippingAddress?.zip,
    order_id: event.data?.checkout?.order?.id,
    currency: event.data?.checkout?.currencyCode,
    subtotal: event.data?.checkout?.subtotalPrice?.amount,
    shipping: event.data?.checkout?.shippingLine?.price?.amount,
    value: event.data?.checkout?.totalPrice?.amount,
    tax: event.data?.checkout?.totalTax?.amount,
    items: event.data?.checkout?.lineItems.map(item => ({
      item_id: item.variant?.product?.id,
      item_name: item.variant?.product?.title,
    })),
  });
});

analytics.subscribe("checkout_started", (event) => {
  window.dataLayer.push({
    event: "checkout_started",
    timestamp: event.timestamp,
    id: event.id,
    token: event.data?.checkout?.token,
    url: event.context.document.location.href,
    client_id: event.clientId,
    email: event.data?.checkout?.email,
    phone: event.data?.checkout?.phone,
    first_name: event.data?.checkout?.shippingAddress?.firstName,
    last_name: event.data?.checkout?.shippingAddress?.lastName,
    address1: event.data?.checkout?.shippingAddress?.address1,
    address2: event.data?.checkout?.shippingAddress?.address2,
    city: event.data?.checkout?.shippingAddress?.city,
    country: event.data?.checkout?.shippingAddress?.country,
    country_code: event.data?.checkout?.shippingAddress?.countryCode,
    province: event.data?.checkout?.shippingAddress?.province,
    province_code: event.data?.checkout?.shippingAddress?.provinceCode,
    zip: event.data?.checkout?.shippingAddress?.zip,
    order_id: event.data?.checkout?.order?.id,
    currency: event.data?.checkout?.currencyCode,
    subtotal: event.data?.checkout?.subtotalPrice?.amount,
    shipping: event.data?.checkout?.shippingLine?.price?.amount,
    value: event.data?.checkout?.totalPrice?.amount,
    tax: event.data?.checkout?.totalTax?.amount,
    items: event.data?.checkout?.lineItems.map(item => ({
      item_id: item.variant?.product?.id,
      item_name: item.variant?.product?.title,
    })),
  });
});

analytics.subscribe("payment_info_submitted", async (event) => {
  window.dataLayer.push({
    event: "payment_info_submitted",
    timestamp: event.timestamp,
    id: event.id,
    client_id: event.clientId,
    url: event.context.document.location.href,
    currency: event.data?.checkout?.currencyCode,
    value: event.data?.checkout?.totalPrice.amount,
    items: event.data?.checkout?.lineItems.map(item => ({
      item_id: item.variant?.product?.id,
      item_name: item.variant?.product?.title,
    })),
  });
});

analytics.subscribe("checkout_shipping_info_submitted", async (event) => {
  window.dataLayer.push({
    event: "checkout_shipping_info_submitted",
    timestamp: event.timestamp,
    id: event.id,
    client_id: event.clientId,
    url: event.context.document.location.href,
    currency: event.data?.checkout?.currencyCode,
    value: event.data?.checkout?.totalPrice.amount,
    items: event.data?.checkout?.lineItems.map(item => ({
      item_id: item.variant?.product?.id,
      item_name: item.variant?.product?.title,
    })),
  });
});

analytics.subscribe("product_added_to_cart", (event) => {
  window.dataLayer.push({
    event: "product_added_to_cart",
    timestamp: event.timestamp,
    id: event.id,
    client_id: event.clientId,
    url: event.context.document.location.href,
    value: event.data?.cartLine?.merchandise?.price?.amount,
    currency: event.data?.cartLine?.cost?.totalAmount?.currencyCode,
    product_title: event.data?.cartLine?.merchandise?.product?.title,
    quantity: event.data?.cartLine?.quantity,
    total_cost: event.data?.cartLine?.cost?.totalAmount?.amount,
  });
});

analytics.subscribe("product_removed_to_cart", (event) => {
  window.dataLayer.push({
    event: "product_removed_to_cart",
    timestamp: event.timestamp,
    id: event.id,
    client_id: event.clientId,
    url: event.context.document.location.href,
    value: event.data?.cartLine?.merchandise?.price?.amount,
    currency: event.data?.cartLine?.cost?.totalAmount?.currencyCode,
    product_title: event.data?.cartLine?.merchandise?.product?.title,
    quantity: event.data?.cartLine?.quantity,
    total_cost: event.data?.cartLine?.cost?.totalAmount?.amount,
  });
});

analytics.subscribe("cart_viewed", (event) => {
  window.dataLayer.push({
    event: "cart_viewed",
    timestamp: event.timestamp,
    id: event.id,
    client_id: event.clientId,
    url: event.context.document.location.href,
    total_cost: event.data?.cart?.cost?.totalAmount?.amount,
    currency: event.data?.cart?.cost?.totalAmount?.currencyCode,
    quantity: event.data?.cart?.totalQuantity,
    cart_id: event.data?.cart?.id,
    items: event.data?.cart?.lines.map(item => ({
      item_id: item.merchandise?.id,
      item_name: item.merchandise?.title,
    })),
  });
});

analytics.subscribe("page_viewed", (event) => {
  window.dataLayer.push({
    event: "page_viewed",
    timestamp: event.timestamp,
    id: event.id,
    client_id: event.clientId,
    url: event.context.document.location.href,
    page_title: event.context.document.title,
  });
});

analytics.subscribe("product_viewed", (event) => {
  window.dataLayer.push({
    event: "product_viewed",
    timestamp: event.timestamp,
    id: event.id,
    client_id: event.clientId,
    url: event.context.document.location.href,
    product_id: event.data?.productVariant?.product?.id,
    product_title: event.data?.productVariant?.title,
    product_sku: event.data?.productVariant?.sku,
  });
});

analytics.subscribe("collection_viewed", (event) => {
  window.dataLayer.push({
    event: "collection_viewed",
    timestamp: event.timestamp,
    id: event.id,
    client_id: event.clientId,
    url: event.context.document.location.href,
    collection_id: event.data?.collection?.id,
    collection_title: event.data?.collection?.title,
    items: event.data?.collection?.productVariants.map(variant => ({
      item_id: variant.id,
      item_name: variant.product?.title,
    })),
  });
});

analytics.subscribe("search_submitted", (event) => {
  window.dataLayer.push({
    event: "search_submitted",
    timestamp: event.timestamp,
    id: event.id,
    client_id: event.clientId,
    url: event.context.document.location.href,
    query: event.data?.searchResult?.query,
  });
});



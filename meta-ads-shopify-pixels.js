// This example shows how to install a Meta Ads base pixel and standard events
// Replace pixel ID with your own

!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

fbq('init', "YOUR_PIXEL_ID");

analytics.subscribe("page_viewed", (event) => {
  fbq('track', 'PageView');
});

analytics.subscribe("product_viewed", (event) => {
  fbq('track', 'ViewContent', {
    content_ids:  [event.data?.productVariant?.id],
    content_name: event.data?.productVariant?.title,
    currency: event.data?.productVariant?.price.currencyCode,
    value: event.data?.productVariant?.price.amount,
  });
});

analytics.subscribe("search_submitted", (event) => {
  fbq('track', 'Search', {
    search_string: event.searchResult.query
  });
});

analytics.subscribe("product_added_to_cart", (event) => {
  fbq('track', 'AddToCart', {
    content_ids: [event.data?.cartLine?.merchandise?.productVariant?.id],
    content_name: event.data?.cartLine?.merchandise?.productVariant?.title,
    currency: event.data?.cartLine?.merchandise?.productVariant?.price?.currencyCode,
    value: event.data?.cartLine?.merchandise?.productVariant?.price.amount,
  });
});

analytics.subscribe("payment_info_submitted", (event) => {
  fbq('track', 'AddPaymentInfo');
});

analytics.subscribe("checkout_started", (event) => {
  fbq('track', 'InitiateCheckout');
});

analytics.subscribe("checkout_completed", (event) => {
  fbq('track', 'Purchase', {
    currency: event.data?.checkout?.currencyCode,
    value: event.data?.checkout?.totalPrice?.amount,
  });
});

// Updated TikTok Pixel Code for Shopify Web Pixel API integration
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))};};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e;};ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script"),n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e);};

  ttq.load('YOUR_PIXEL_ID');
  ttq.page();
}(window, document, 'ttq');

// Search event
analytics.subscribe('search_submitted', (event) => {
  ttq.track('Search', {
    'search_string': event.data.searchResult.query
  });
  console.log('Search event tracked:', event.data.searchResult.query);
});

// Product viewed event
analytics.subscribe('product_viewed', (event) => {
  const product = event.data.productVariant;
  
  ttq.track('ViewContent', {
    'contents': [
      {
        'content_id': product.id || product.sku,
        'content_type': 'product',
        'content_name': product.title || product.name
      }
    ],
    'value': parseFloat(product.price.amount || 0),
    'currency': product.price.currencyCode
  });
  console.log('Product viewed event tracked:', product.title);
});

// Add to cart event
analytics.subscribe('product_added_to_cart', (event) => {
  const product = event.data.cartLine.merchandise;
  
  ttq.track('AddToCart', {
    'contents': [
      {
        'content_id': product.id || product.product_id,
        'content_type': 'product',
        'content_name': product.title || product.name
      }
    ],
    'value': parseFloat(product.price.amount || 0),
    'currency': product.price.currencyCode
  });
  console.log('Add to cart event tracked:', product.title);
});

// Checkout started event
analytics.subscribe('checkout_started', (event) => {
  const checkout = event.data.checkout;
  const items = checkout.lineItems || [];
  const contents = items.map(item => {
    return {
      'content_id': item.variant?.id || item.id,
      'content_type': 'product',
      'content_name': item.title || item.name
    };
  });
  
  ttq.track('InitiateCheckout', {
    'contents': contents,
    'value': parseFloat(checkout.totalPrice.amount || 0),
    'currency': checkout.currencyCode
  });
  console.log('Checkout started event tracked:', checkout.id);
});

// Payment info submitted
analytics.subscribe('payment_info_submitted', (event) => {
  const checkout = event.data.checkout;
  
  ttq.track('AddPaymentInfo', {
    'contents': [],
    'value': parseFloat(checkout.totalPrice.amount || 0),
    'currency': checkout.currencyCode
  });
  console.log('Payment info submitted event tracked:', checkout.id);
});

// Purchase completed
analytics.subscribe('checkout_completed', (event) => {
  const checkout = event.data.checkout;
  const items = checkout.lineItems || [];
  const contents = items.map(item => {
    return {
      'content_id': item.variant?.id || item.id,
      'content_type': 'product',
      'content_name': item.title || item.name
    };
  });
  
  ttq.track('Purchase', {
    'contents': contents,
    'value': parseFloat(checkout.totalPrice.amount || 0),
    'currency': checkout.currencyCode
  });
  console.log('Purchase completed event tracked:', checkout.id);
});
// This example shows how to install a Microsoft Ads base pixel and purchase event
// (You will need to make sure the goal configuration matches the values used here)
// Replace UET ID with your own and 'conversion' with your goal's action

// NOTE:
// Only 'event' type goals in Microsoft Ads will work since code runs in a sandbox and destination url cannot be reliably tracked
// UNTESTED: (For desintation URL set it to 'processing?completed=true' in the microsoft ads interface)


(function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"EXAMPLE-ID", enableAutoSpaTracking: true};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");


analytics.subscribe("checkout_completed", (event) => {
  uetq = uetq || [];

  // For enhanced conversions
  window.uetq.push('set', { 'pid': { 
    'em': event.data.checkout.email,
    'ph': event.data.checkout.phone,
   } });
  
  uetq.push('event', 'conversion',
    {
      'event_category': 'your_event_category',
      'revenue_value': event.data.checkout.totalPrice.amount,
      'currency' : event.data.checkout.currencyCode
    }
 ); 
});

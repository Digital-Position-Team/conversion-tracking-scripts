// This example shows how to install a custom script on only the main checkout pages
// Replace the example script with your custom script

analytics.subscribe("checkout_completed", (event) => {
  // Custom script to only fire when a purchase occurs (make sure to exclude HTML) 
  const customScript = document.createElement("script");
  customScript.setAttribute("src", "https://www.your-custom-script-link.com/script.js");
  customScript.setAttribute("async", "");
  document.head.appendChild(customScript);

  // Script is initialized and may be used
  // Code for purchase event
});

analytics.subscribe("checkout_started", (event) => {
  // Custom script to only fire when a purchase occurs (make sure to exclude HTML) 
  const customScript = document.createElement("script");
  customScript.setAttribute("src", "https://www.your-custom-script-link.com/script.js");
  customScript.setAttribute("async", "");
  document.head.appendChild(customScript);

  // Script is initialized and may be used
  // Code for begin_checkout event
});

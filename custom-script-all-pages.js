// This example shows how to install a custom script on all pages
// Replace the example script with your custom script

// Custom script runs on all pages
const customScript = document.createElement("script");
customScript.setAttribute("src", "https://www.your-custom-script-link.com/script.js");
customScript.setAttribute("async", "");
document.head.appendChild(customScript);

// Script is initialized and may be used
// Subscribe to events using analytics.subscribe to execute code situationally

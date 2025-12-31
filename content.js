function setGrayscale(shouldBeGray) {
  if (shouldBeGray) {
    document.documentElement.style.filter = "grayscale(100%)";
  } else {
    document.documentElement.style.filter = "none";
  }
}

// To prevent a "flash of color" when a new page loads, we immediately apply
// the grayscale filter. We assume the effect is enabled until we can confirm
// the actual setting from storage. This makes the user experience smoother.
setGrayscale(true); 

browser.storage.local.get("enabled").then((data) => {
  // Now we check the actual stored setting. If it exists and is set to false,
  // we remove the grayscale filter.
  if (data.enabled !== undefined) {
    setGrayscale(data.enabled);
  }
});

// This listens for changes to the "enabled" setting, which can be triggered
// by the user clicking the extension icon. This allows us to apply or remove
// the grayscale effect in real-time without needing to reload the page.
browser.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    setGrayscale(changes.enabled.newValue);
  }
});

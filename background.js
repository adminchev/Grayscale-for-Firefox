const grayTheme = {
  colors: {
    frame: "#2a2a2a",
    tab_background_text: "#888888",
    toolbar: "#333333",
    toolbar_text: "#dddddd",
    toolbar_field: "#444444",
    toolbar_field_text: "#ffffff",
    tab_line: "#000000"
  }
};

// When the extension is first installed, we'll default the grayscale setting to
// "on" so the user can immediately see the extension's effect.
browser.runtime.onInstalled.addListener(() => {
  browser.storage.local.set({ enabled: true });
});

// This listener is triggered when the user clicks the extension's icon in the
// toolbar. It reads the current "enabled" state from storage, flips it to the
// opposite value, and saves the new state. This effectively toggles the
// grayscale effect on or off.
browser.action.onClicked.addListener(async () => {
  const data = await browser.storage.local.get("enabled");
  // The '?? true' part handles the case where the storage value might not exist
  // yet, defaulting to an "on" state.
  const newState = !(data.enabled ?? true); 
  await browser.storage.local.set({ enabled: newState });
});

// This listener watches for any changes to the "enabled" value in storage.
// When a change is detected, it either applies the custom grayscale theme to
// the browser's UI or resets it back to the default theme.
browser.storage.onChanged.addListener((changes) => {
  if (changes.enabled) {
    if (changes.enabled.newValue) {
      browser.theme.update(grayTheme);
    } else {
      browser.theme.reset();
    }
  }
});

chrome.contextMenus.create({
  "title": "Get gif url for this post",
  "contexts": ["video"],
  "documentUrlPatterns": ["*://9gag.com/*"],
  "onclick": function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {});
    });
  }
});

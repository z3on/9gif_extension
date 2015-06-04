(function () {
  var NOT_VIDEO_MESSAGE = 'Not a video post';
  var VIDEO_POST_CLASS = 'badge-animated-container-animated';
  var GIF_CONTAINING_ATTRIBUTE = 'data-image';
  var NOTIFICATION_CLASS = 'notification_9gif';
  var CLOSE_BUTTON_CLASS = 'notification_close';

  var foundGif = NOT_VIDEO_MESSAGE;

  function isMediaPost(element) {
    return (' ' + element.className + ' ').indexOf(' ' + VIDEO_POST_CLASS + ' ') > -1;
  }

  function createNotification(gifUrl) {
    var notification = document.createElement('div');
    notification.className = NOTIFICATION_CLASS;

    var gifLink = document.createElement('a');
    gifLink.href = gifUrl;
    gifLink.target = '_blank';
    gifLink.innerHTML = gifUrl;

    var closeButton = document.createElement('a');
    closeButton.href = 'javascript:void(0);';
    closeButton.className = CLOSE_BUTTON_CLASS;
    closeButton.onclick = function () {
      hideNotification(notification);
    };

    notification.appendChild(gifLink);
    notification.appendChild(closeButton);

    return notification;
  }

  function hideNotification(notification) {
    move(notification)
      .sub('margin-top', 2 * notification.clientHeight)
      .ease('out')
      .end(function () {
        notification.remove();
      });
  }

  function triggerNotificationAnimation(notification) {
    move(notification)
      .add('margin-top', 2 * notification.clientHeight)
      .ease('out')
      .end(function () {
        setTimeout(function () {
          hideNotification(notification);
        }, 8000);
      });
  }

  function showGifUrl(gifUrl) {
    var notification = createNotification(gifUrl);
    document.body.appendChild(notification);
    triggerNotificationAnimation(notification);
  }

  document.addEventListener('contextmenu', function (e) {
    foundGif = NOT_VIDEO_MESSAGE;
    for (var i = 0; i < e.path.length; i++) {
      var current_element = e.path[i];
      if (isMediaPost(current_element) && current_element.hasAttribute(GIF_CONTAINING_ATTRIBUTE)) {
        foundGif = e.path[i].getAttribute(GIF_CONTAINING_ATTRIBUTE);
        break;
      }
    }
  }, false);


  chrome.runtime.onMessage.addListener(
    function () {
      showGifUrl(foundGif);
    }
  );
})();

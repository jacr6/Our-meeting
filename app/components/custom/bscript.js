  var whiteboard = document.getElementById('whiteboard');
  var ratio = 4 / 3;

  function dynamicSize() {
    var meeting = document.getElementsByClassName('meeting')[0];

    if (whiteboard.childNodes.length > 0) {
      whiteboard.childNodes[0].style.height = (meeting.clientHeight - 146) + 'px';
    }

    if ((whiteboard.clientWidth / whiteboard.clientHeight) < ratio) {
      // height = (3 * width) / 4 /* keeps the video at a 4:3 ratio */
      whiteboard.childNodes[0].style.height = (3 * whiteboard.clientWidth) / 4;
    }

    document.getElementById('whiteboard').style.height = (meeting.clientHeight - 143) + 'px';
  }

  dynamicSize();
  window.onresize = function() {
    dynamicSize();
  };

  document.getElementById('userlist').addEventListener('click', function(event) {
    var meeting = document.getElementsByClassName('meeting')[0];

    // retrieve an event if it was called manually
    event = event || window.event;

    // retrieve the related element
    var el = event.target || event.srcElement;

    if (el.tagName === 'VIDEO' && el.parentNode.id !== 'my-video') {
      // Create temp element to hold video location and inner text
      var holder = document.createElement('div');
      holder.className = el.id + ' user-div';

      el.parentNode.insertBefore(holder, el);

      if (whiteboard.childNodes.length > 0) {
        whiteboard.childNodes[0].style.height = '125px';
        var oldVideo = whiteboard.childNodes[0];
        var elem = document.getElementsByClassName(oldVideo.id)[0];
        elem.parentNode.insertBefore(oldVideo, elem);
        oldVideo.play();
        elem.parentNode.removeChild(elem);
      }

      whiteboard.appendChild(el);
      whiteboard.childNodes[0].play();
      whiteboard.childNodes[0].style.height = (meeting.clientHeight - 146) + 'px';
    }
  }, false);

  
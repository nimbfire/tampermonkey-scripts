// Allow to download the audios from whatsapp web.

console.log('Loading');

// Get jQuery =P
var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);


setTimeout(addDownloadLinks, 2000);
addButtonns();

// Add a download link to each audio that has a src. It calls itself again.
function addDownloadLinks() {
  jQuery('.audio').each(function(){
    var currentElement = $(this);
    var src = currentElement.find('audio').attr('src');
    if (src) {
      if (currentElement.hasClass('download')) {
        
      }
      else {
        var el = '<a target="_blank"  href="' + src + '">Download</a>';
        currentElement.prepend(el);
        currentElement.addClass('download');
      }
    }
  });
  
  // Call again in 2 sec
  tid = setTimeout(addDownloadLinks, 2000);
}

// Add buttons
function addButtonns(){
  jQuery('.pane-chat-header').prepend('<div id="download-all">Download all audios</div>');
  jQuery('.pane-chat-header').prepend('<div id="get-all-chat">Get all chat</div>');

  jQuery('#get-all-chat').on('click', function(){
    getAllChat();
  });
  
}


// Roll the chat until the first ever.
function getAllChat() {
  jQuery('.pane-chat-tile-container .pane-chat-msgs').animate({scrollTop:0}, '500');
  setTimeout(getAllChat, 2000);
}

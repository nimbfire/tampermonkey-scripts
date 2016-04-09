// Allow to download the audios from whatsapp web.

console.log('Loading');

// Get jQuery =P
var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);


setTimeout(iterate, 2000);

function iterate() {
  addButtonns();
  addDownloadLinks();
  
    // Call again in 2 sec
  tid = setTimeout(iterate, 2000);
}
// Add a download link to each audio that has a src. It calls itself again.
function addDownloadLinks() {
  jQuery('.audio').each(function(){
    var currentElement = $(this);
    var src = currentElement.find('audio').attr('src');
    if (src) {
      if (currentElement.hasClass('processed')) {
        
      }
      else {
        var el = '<a target="_blank"  href="' + src + '">Download</a>';
        currentElement.prepend(el);
        currentElement.addClass('processed');
      }
    }
  });
  

}

// Add buttons and bind them
function addButtonns(){
  if (!jQuery('.pane-chat-header').hasClass('processed')) {
    // Add buttons
    jQuery('.pane-chat-header').prepend('<a href="#" id="download-all">Download all audios</a>');
    jQuery('.pane-chat-header').prepend('<a href="#" id="get-all-chat">Get all chat</a>');
  
    // Add processed class
    jQuery('.pane-chat-header').addClass('processed');
    
    // Bind buttons
    jQuery('#get-all-chat').on('click', function(){
      getAllChat();
    });
  }
}


// Roll the chat until the first ever.
function getAllChat() {
  jQuery('.pane-chat-tile-container .pane-chat-msgs').animate({scrollTop:0}, '500');
  setTimeout(getAllChat, 2000);
}

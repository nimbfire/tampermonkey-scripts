// Allow to download the audios from whatsapp web.

console.log('Loading');

// Get jQuery =P
var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);


setTimeout(addDownloadLinks, 2000);

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

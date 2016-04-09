// Allow to download the audios from whatsapp web.

console.log('Loading');

// Get jQuery =P
var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

var nfvars = {};
nfvars.getChat = false;
nfvars.downloadAudios = false;
nfvars.downloadAudiosIterator = 0;
nfvars.downloadAudiosInterval = 10;
nfvars.downloadAudiosArray = new Array();

setTimeout(iterate, 2000);

function iterate() {
  changedPane();
  addDownloadLinks();
  getAllChat();
  downloadAllAudios();
    // Call again in 2 sec
  tid = setTimeout(iterate, 2000);
}

function downloadNextAudio(){
  var src = nfvars.downloadAudiosArray.pop();
  console.log('downloadNextAudio');
  if (src) {
    saveFile(src); 
  }
};

function downloadAudiosPrepare() {
  jQuery('.audio').each(function(){
    var currentElement = $(this);
    var src = currentElement.find('audio').attr('src');
    if (src) {
      nfvars.downloadAudiosArray.push(src);
    }
  });
}

// Download a file form a url.
function saveFile(url) {
  // Get file name from url.
  var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function() {
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
    a.download = filename; // Set the file name.
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    delete a;
  };
  xhr.open('GET', url);
  xhr.send();
}

function downloadAllAudios() {
  if (nfvars.downloadAudios) {
    if (nfvars.downloadAudiosIterator == nfvars.downloadAudiosInterval) {
      nfvars.downloadAudiosIterator = 0;
      downloadNextAudio();
    }
    nfvars.downloadAudiosIterator++;
  }
}

function resetConfigs() {
  nfvars.getChat = false;
  nfvars.downloadAudios = false;
  nfvars.downloadAudiosArray = new Array();
}

// If chance panes, add the buttons and reset configs
function changedPane() {
  // Uses the buttons to know if the pane has changed
  if (!jQuery('.pane-chat-header').hasClass('processed')) {
    resetConfigs();
    addButtonns();
  }
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
    
    // Bind Get
    jQuery('#get-all-chat').on('click', function(){
      nfvars.getChat = true;
    });
    
    // Bind Download
    jQuery('#download-all').on('click', function(){
      nfvars.downloadAudios = true;
      downloadAudiosPrepare();
    });
  }
}


// Roll the chat until the first ever.
function getAllChat() {
  if (nfvars.getChat) {
    jQuery('.pane-chat-tile-container .pane-chat-msgs').animate({scrollTop:0}, '500');
  }
}

var ifrm = document.createElement('iframe');
ifrm.setAttribute('id', 'ifrm');
var el = document.getElementById('marker');
el.parentNode.insertBefore(ifrm, el);
ifrm.setAttribute('src', 'gallery.html');

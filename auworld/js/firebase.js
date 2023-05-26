
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return;
}

function updateCounter(id, act, del, callback) {
  var db = firebase.database().ref("rCounter/cookie_enabled").child(id).child(act);
  db.transaction(function(d) {
    // d = d || 0;
    d += del;
    return d;
  }, function(err, comm, sn) {
    callback(sn.val());
  });
}

var rCounters = document.querySelectorAll(".counter");
[].forEach.call(rCounters, function(rCounter) {
  var cId = rCounter.id;

  var els = rCounter.querySelectorAll("li");
  [].forEach.call(els, function(el) {
    // get firebase data initially
    updateCounter(cId, el.getAttribute("data-action"), 0, function(d) {
      el.querySelector(".count").innerHTML = d;
      if (el.getAttribute("data-action") == getCookie(cId)) {
        el.setAttribute("data-status", "voted");
      }
    });

    // update firebase data and get result
    el.addEventListener("click", function() {
      var _this = this,
          _act = _this.getAttribute("data-action");
      // if (_this.getAttribute("data-action") == getCookie(cId)) {
      if (_this.getAttribute("data-status") == "voted") {
        // un-vote
        updateCounter(cId, _act, -1, function(d) {
          _this.querySelector(".count").innerHTML = d;
          _this.setAttribute("data-status", "");
         
          // delete cookie
          setCookie(cId, _act, -1);
        });
      } else {
        // vote
        updateCounter(cId, _this.getAttribute("data-action"), 1, function(d) {
          _this.querySelector(".count").innerHTML = d;
          _this.setAttribute("data-status", "voted");

          // siblings
          var sibs = _this.parentNode.querySelectorAll('[data-status="voted"]');
          [].forEach.call(sibs, function(sib) {
            if (sib !== _this) {
              updateCounter(cId, sib.getAttribute("data-action"), -1, function(d) {
                sib.querySelector(".count").innerHTML = d;
                sib.setAttribute("data-status", "");
              });
            }
          });

          // set cookie
          setCookie(cId, _act, 7);
        });
      }
    });
  });
});

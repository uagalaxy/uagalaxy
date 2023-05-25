const themeToggler = document.querySelector(".theme-switch"),
 prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)"),
 mainTabs = document.querySelector(".main-tabs"),
 mainSliderCircle = document.querySelector(".main-slider-circle"),
 roundButtons = document.querySelectorAll(".round-button"),
 content = document.querySelector(".app"),
 tabHome = document.getElementById("tab-home"),
 tabPost = document.getElementById("tab-posts"),
 tabContact = document.getElementById("tab-contact"),
 tabAbout = document.getElementById("tab-about"),
 tabHomeBtn = document.getElementById("tab-1"),
 tabPostBtn = document.getElementById("tab-2"),
 tabContactBtn = document.getElementById("tab-3"),
 tabAboutBtn = document.getElementById("tab-4"),
 notifiContent = document.querySelector(".notifi-lists");

mainTabs.addEventListener("click", (event) => {
  if (event.target.classList.contains("round-button")) {
    mainSliderCircle.classList.remove("animate-jello");
    void mainSliderCircle.offsetWidth;
    mainSliderCircle.classList.add("animate-jello");
  }
});

if(prefersDarkScheme.matches){
    setNotify('your device is in DARK mode, open setting to make this web app in dark mode','setting')
}else{
    document.body.classList.remove("light-theme")
}

themeToggler.addEventListener("click", function () {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
  } else {
    document.body.classList.toggle("dark-theme");
  }
});
// store the relationship between hash & tab id
const hashes = new Map([
    ["/", "tab-1"],
    ["#posts", "tab-2"],
    ["#contact", "tab-3"],
    ["#about", "tab-4"],
]);

// store the relationship between tab id and contents
const data = new Map([
    [
        "tab-1",
        {
            url: "/"
        },
    ],
    [
        "tab-2",
        {
            url: "#posts",
        },
    ],
    [
        "tab-3",
        {
            url: "#contact",
        },
    ],
    [
        "tab-4",
        {
            url: "#about",
        },
    ],
]);

mainTabs.addEventListener("click", function (event) {
    if (!event.target.id) return;
    update(event.target.id);
});

const update = (tabId) => {
    // remove the active class of the previously selected tab
    const currentTab = mainTabs.querySelector(".active");

    if (currentTab.id != tabId) {
        currentTab.classList.remove("active");
        document.querySelectorAll(".input-radio").forEach(function (i) {i.removeAttribute("checked");});
    }
    // add active class to the selected tab
    const selectedTab = document.getElementById(tabId);
    selectedTab.classList.add("active");
    const entry = data.get(tabId);
        const  wit = selectedTab.getAttribute("for");
        document.getElementById(wit).setAttribute("checked", "");
  

    if (entry) {
         // update the URL
        history.pushState(null, "", entry.url);
    }
}; 
(() => {
    const tabId = hashes.get(window.location.hash);
    // update the tab
    if (tabId) update(tabId);
})(); 
//====================document title========================================
if (window.location == window.origin + "/#posts") {
    document.title = "posts | uagalaxy";
}
tabAboutBtn.addEventListener("click", function(){
    document.title = "about | uagalaxy";
})
tabPostBtn.addEventListener("click", function(){
    document.title = "posts | uagalaxy";
})
tabContactBtn.addEventListener("click", function(){
    document.title = "contact | uagalaxy";
})
tabHomeBtn.addEventListener("click", function(){
    document.title = "uagalaxy";
});
window.onload = function () {
  let pageTitle = document.title;
  let attentionMessage = "sleeping...";

  document.addEventListener("visibilitychange", function (e) {
    let isPageActive = !document.hidden;
    if (!isPageActive) {
      if (document.title === attentionMessage) {
          document.title = pageTitle;
         favicon.href = "auworld/img/favicon.png";
    } else {
        document.title = attentionMessage;
        favicon.href = "auworld/img/sleeping.png";
    }
    }else {
      document.title = pageTitle;
    }
  });
  document.addEventListener("visibilitychange", function (e) {
    if (!document.hidden) {
      document.title = pageTitle;
      favicon.href = "auworld/img/favicon.png";
    }
  });  
};

//========================system =========================================
document.querySelector(".fake-search-input").onkeyup = function(e){
   let userInput = document.querySelector(".fake-search-input").value;
   document.querySelector("#ua-search-box").value = userInput;
   searching(e);
   if (e.target.value) {
       document.querySelector(".fake-list").style.display = "flex"
   } else {
       document.querySelector(".fake-list").style.display = "none"
   }  
   document.querySelector(".search .autocom-box").style.display = "none";
   document.querySelector("label.placehoder").style.display = "none";

}

document.querySelector("#cursor").onclick = ()=> {
    if (document.querySelector("#user-custom-style").innerHTML === "") {
        document.querySelector("#user-custom-style").innerHTML = "html,html *,body,body * {cursor: none;}";
    } else {
        document.querySelector("#user-custom-style").innerHTML = "";
    }
    document.querySelector(".cursor-dot").classList.toggle("hide")
    document.querySelector(".cursor-dot-outline").classList.toggle("hide")
};
if (this.document.querySelector("#notification").hasAttribute("au-showNotification")) {
    document.querySelector(".is-notifi").style.display = "block";
} else {
    document.querySelector(".is-notifi").style.display = "none";
}

window.addEventListener("click",function(){
 if (this.document.querySelector("#notification").hasAttribute("au-showNotification")) {
    document.querySelector(".is-notifi").style.display = "block";
} else {
    document.querySelector(".is-notifi").style.display = "none";
}
})

if (document.getElementById("for-tab-3").hasAttribute("checked")) {
    $(tabContact).load('auworld/pages/contact.txt');
    tabContactBtn.removeAttribute("onclick")
} else {
    tabContact.innerHTML = "";
}
if (document.getElementById("for-tab-4").hasAttribute("checked")) {
    $(tabAbout).load('auworld/pages/about.txt');
    tabAboutBtn.removeAttribute("onclick")
} else {
    tabContact.innerHTML = "";
}
content.onclick =()=>{
    document.querySelector("#setting").checked = false;
    document.querySelector("#notification").checked = false;
}
mainTabs.onclick =()=>{
    document.querySelector("#setting").checked = false;
    document.querySelector("#notification").checked = false;
}

function checkInputs(e) {

const username = document.getElementById('name');
const massage = document.getElementById('message');
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const massageValue = massage.value.trim();
	
	if(massageValue === '') {
		setErrorFor(massage, 'message cannot be blank');
        document.getElementById('au_massagesubmit').setAttribute("disabled","")
	} else {
        if(usernameValue === '') {
		setErrorFor(username, 'name cannot be blank');
         document.getElementById('au_massagesubmit').setAttribute("disabled","")
	} else {
        document.getElementById('au_massagesubmit').removeAttribute("disabled")
	}
	}
	if(usernameValue === '') {
		setErrorFor(username, 'name cannot be blank');
         document.getElementById('au_massagesubmit').setAttribute("disabled","")
	} else {
        if(massageValue === '') {
		setErrorFor(massage, 'message cannot be blank');
	} else {
        document.getElementById('au_massagesubmit').removeAttribute("disabled")
	}
	}
}

function setErrorFor(i,message){
    document.querySelector(".error h2").innerHTML = "ERROR";
    document.getElementById("error").innerHTML = message;
    document.querySelector(".error").style.display = "flex";
}

//======================================//
const homeImg = document.querySelectorAll(".home-img-item")
 for(let i = 0; i < homeImg.length; i++){
   homeImg[i].onclick = () =>{
      let dataimage = homeImg[i].querySelector("img").getAttribute("src");
      document.querySelector(".home-img").setAttribute("src", dataimage);
      document.querySelector("#setting").checked = false;
      document.querySelector(".home-img").classList.remove("homeimgchange");
      void document.querySelector(".home-img").offsetWidth;
      document.querySelector(".home-img").classList.add("homeimgchange");
    }
}
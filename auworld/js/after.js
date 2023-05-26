const
previewBox = document.querySelector(".preview-box"),
previewimg = previewBox.querySelector("img"),
previewdetail= previewBox.querySelector(".img-detail"),
searchWrapper = document.querySelector(".search"),
inputBox = searchWrapper.querySelector("input"),
suggBox = searchWrapper.querySelector(".autocom-box"),
suggBoxFake = document.querySelector(".autocom-box.fake-list"),
 app = document.getElementById("darkmode"),
 image = document.querySelectorAll('.image'),
 postCard = document.querySelectorAll(".au-postcard"),
  cardImage = document.querySelectorAll(".au-card-img"),
  userImg = document.querySelectorAll(".au-user-img"),
  postTitle = document.querySelectorAll(".au-post-title"),
  cardLike = document.querySelectorAll(".au-card-like"),
  postDesc = document.querySelectorAll(".au-post-desc"),
  contentHided = document.querySelectorAll(".content-hide"),
  animated_bg = document.querySelectorAll(".animat-bg"),
  animated_bgs = document.querySelectorAll(".animated-bg"),
  animated_bg_texts = document.querySelectorAll(".animated-bg"),
  contextMenu = document.querySelector(".au-context-menu"),
  postMenu = document.querySelectorAll(".au-post-menu");

if (document.getElementById("for-tab-2").hasAttribute("checked")) {
  setTimeout(getcardData, 1500);
} else {
   document.querySelector("#tab-2").onclick = ()=>{
     setTimeout(getcardData, 1500);};
}

function getcardData() {
  cardImage.forEach((e) => {
    e.style.display = "block";
    let imgbg = e.getAttribute("src");
    e.parentElement.style.background = "url(" + imgbg + ")";
  });
  userImg.forEach((e) => {
    e.style.display = "block";
  });
  contentHided.forEach((e) => {
    e.classList.remove("content-hide");
  });
  animated_bg.forEach((e) => {
    e.classList.add("content-hide");
    e.remove();
  });
  animated_bgs.forEach((bgs) => {
    bgs.classList.remove("animated-bg");
  });
  animated_bg_texts.forEach((bgs) => {
    bgs.classList.remove("animated-bg-text");
  });
}

postMenu.forEach((menu) => {
  menu.setAttribute("onclick", "cardMenu(this)");
});


function cardMenu(au) {
  const card = au.parentElement.parentElement;
  let linkName = card.querySelector(".au-card-img").getAttribute("title");
  let linkUrl =  card.querySelector(".au-card-img").getAttribute("src");

  document.getElementById("share").setAttribute("data-name", linkName);
  document.getElementById("share").setAttribute("data-url", linkUrl);
  document.getElementById("copy").setAttribute("data-text", linkUrl);
  document
    .getElementById("post-download")
    .setAttribute(
      "href",
      card.querySelector(".au-card-img").getAttribute("src")
    );
  contextMenu.classList.toggle("menu-open");
  document.querySelector(".menufff").classList.toggle("menu-open")

  document.getElementById("hide-card").onclick = function () {
    document.querySelector(".confirm").style.display = "flex";
    contextMenu.classList.toggle("menu-open");
  };
  document.getElementById("au_confirmed").onclick = function () {
    card.remove();
    document.querySelector(".confirm").style.display = "none";
  };
}

const shareButton = document.getElementById("share");
const copyButton = document.getElementById("copy");

shareButton.addEventListener("click", (event) => {
  navigator.share({
    title: shareButton.getAttribute("data-name"),
    url: shareButton.getAttribute("data-url"),
  });
});
copyButton.addEventListener("click", (event) => {
  var copyText = copyButton.getAttribute("data-text");
  navigator.clipboard.writeText(copyText).then(() => {
    copyButton.querySelector("span").innerText = "copied!";
  });
});

const filterItem = document.querySelector(".filter-tabs");
const filterImg = document.querySelectorAll(".post .au-postcard ");


filterItem.onclick = (selectedItem)=>{ //if user click on filterItem div
    if(selectedItem.target.classList.contains("item")){ //if user selected item has .item class
      filterItem.querySelector(".active").classList.remove("active"); //remove the active class which is in first item
      selectedItem.target.classList.add("active"); //add that active class on user selected item
      let filterName = selectedItem.target.getAttribute("data-name"); //getting data-name value of user selected item and store in a filtername variable
      filterImg.forEach((image) => {
        let filterImges = image.getAttribute("data-name"); //getting image data-name value
        //if user selected item data-name value is equal to images data-name value
        //or user selected item data-name value is equal to "all"
        if((filterImges == filterName) || (filterName == "all")){
          image.classList.remove("hide"); //first remove the hide class from the image
          image.classList.add("show"); //add show class in image
        }else{
          image.classList.add("hide"); //add hide class in image
          image.classList.remove("show"); //remove show class from the image
        }
      });
    }
  }

function preview(element){ //adding onclick attribute in all available images
  //once user click on any image then remove the scroll bar of the body, so user can't scroll up or down
  let selectedPrevImg = element.querySelector("img"); 
  document.querySelector(".page2").style.overflow = "hidden";
  let selectedImgCategory = element.getAttribute("data-name"); //getting user clicked image data-name value
  previewImg.src = selectedPrevImg; //passing the user clicked image source in preview image source
  categoryName.textContent = selectedImgCategory; //passing user clicked data-name value in category name
  previewBox.classList.add("show"); //show the preview image box
  shadow.classList.add("show"); //show the light grey background
  closeIcon.onclick = ()=>{ //if user click on close icon of preview box
    previewBox.classList.remove("show"); //hide the preview box
    shadow.classList.remove("show"); //hide the light grey background
    document.querySelector(".page2").style.overflow = "auto"; //show the scroll bar on body
  }
}

(function(){
  
  var searchFilter = {
    options: { valueNames: ['name'] },
    init: function() {
      var userList = new List('tab-posts',this.options);
      var noItems = $(`<div class="error-page"><div><h1 data-h1="404">404</h1><p data-p="NOT FOUND">NOT FOUND</p><h3 style="margin: 0;color: #8f8f8f;">try another keyword</h3></div></div>`);
      userList.on('updated', function(list) {
        if (list.matchingItems.length === 0) {
          $(list.list).append(noItems);
        } else {
          noItems.detach();
        }
      });
    }
  };
  
  searchFilter.init();
  
})();



// if user press any key and release
inputBox.onkeyup = (e)=>{
    searching(e)
}
function searching(e) {
  let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
        allList[i].setAttribute("onclick", "select(this)")}
        let allListFake = suggBoxFake.querySelectorAll("li");
        for (let i = 0; i < allListFake.length; i++) {
        allListFake[i].setAttribute("onclick", "select(this)")}
    }else{
        searchWrapper.classList.remove("active");//hide autocomplete box
    }
}
function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    document.querySelector(".fake-search-input").value = selectData
    searchWrapper.classList.remove("active");
    document.querySelector(".fake-list").style.display = "none"
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
    suggBoxFake.innerHTML = listData;
}
$(".js-container-1 script").load('auworld/js/firebase.js');

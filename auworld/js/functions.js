function imageBig(au) {
    let dataimage = au.getAttribute("src");
      let imagedetail = au.getAttribute("title");
      // onclick="imageBig(this)"//

      document.querySelector(".preview-box img").setAttribute("src", dataimage);
      document.querySelector(".preview-box span").innerHTML = imagedetail;
      document.querySelector(".preview-box").classList.toggle("hide");
      document.querySelector(".close").classList.toggle("hide");
}
document.querySelector(".close").onclick = ()=>{
    document.querySelector(".close").classList.toggle("hide")
    document.querySelector(".preview-box").classList.toggle("hide");
}

function errorMsg(au){
    let message = au.getAttribute("data-errorMsg")
    let type = au.getAttribute("data-errorType");
    //data-errorMsg="trying error msg..." data-errorType="error" onclick="errorMsg(this)"//

    document.querySelector(".error h2").innerHTML = type;
    document.getElementById("error").innerHTML = message;
    document.querySelector(".error").style.display = "flex";
}

function setNotify(message,btn,funson){
    notifiContent.insertAdjacentHTML('afterbegin',`<li>
        <i class="hide-notifi" onclick="this.parentElement.remove()"><svg width="20" height="20" viewBox="0 0 512 512" style="transform: rotate(45deg);"><line x1="256" y1="112" x2="256" y2="400" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="400" y1="256" x2="112" y2="256" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg></i>
        <div class="notifi-content">`+message+`</div>
        <label for="`+btn+`" onclick="document.querySelector('#notification').checked = false;this.parentElement.style.display='none';`+funson+`">see this</label>
      </li>`);

      //onclick="setNotify('welcome','for-tab-4')"//setNotify('welcome','for-tab-4')//
    document.querySelector("#notification").setAttribute("au-showNotification","");
}


let btnHov = document.querySelectorAll(".au-btn-hover")
 for(let i = 0; i < btnHov.length; i++){
   btnHov[i].addEventListener("mouseover", function(e){
      btnHov[i].style.backgroundColor = "#8181816b"
   })
   btnHov[i].addEventListener("mouseleave", function(e){
       btnHov[i].style.backgroundColor = ""
   })
   //class="au-btn-hover"//
}


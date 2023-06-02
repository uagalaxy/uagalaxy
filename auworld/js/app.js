 function random(){
    return 'au_'+ Math.random().toString(36).substr(2,9);
    }
    document.getElementById('id').value = random();
    document.getElementById('id-2').value = random();

  
      var  date = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"),
            monthname = new Array("Jan", "Feb", "Mar", "Apr", "Mar", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"),
            today = new Date,
            i = today.getYear();
          1e3 > i && (i += 1900);
        var day = today.getDay(),
            month = today.getMonth(),
            s = today.getDate();
document.querySelector('#uploaddate').value = monthname[month] + " " + s + ", " + i;

 var firebaseConfig = {
    apiKey: "AIzaSyBr2Ld829X4fDpbTi-GKYFZVquPt5WklJ4",
  authDomain: "auworld.firebaseapp.com",
  databaseURL: "https://auworld-default-rtdb.firebaseio.com",
  projectId: "auworld",
  storageBucket: "auworld.appspot.com",
  messagingSenderId: "173892554240",
  appId: "1:173892554240:web:8aac5a987bae9c2e3a12e5",
  measurementId: "G-W0VYSQ7VL2"  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


firebase.auth().onAuthStateChanged((user)=>{
    if(!user){
        location.replace("index.html")
    }else{
        document.getElementById("user").innerHTML = "Hello, "+user
    }
})


function logout(){
    firebase.auth().signOut()
}
    
    function upload(){

    //get your image
    var image=document.getElementById('image').files[0];
    //get your blog text
    var posttitle=document.getElementById('title').value;
    var postdataname=document.getElementById('dataname').value;
    var postuploadate=document.getElementById('uploaddate').value;
    var postkeyowrds=document.getElementById('keywords').value;
    var postabout=document.getElementById('about').value;
    var postid=document.getElementById('id').value;
    var postid2=document.getElementById('id-2').value;
    //get image name
    var imageName=image.name;
    //firebase storage reference
    //it is the path where your image will be stored
    var storageRef=firebase.storage().ref('images/'+imageName);
    //upload image to selected storage reference
    //make sure you pass image here
    var uploadTask=storageRef.put(image);
    //to get the state of image uploading....
    uploadTask.on('state_changed',function(snapshot){
         //get task progress by following code
         var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
         console.log("upload is "+progress+" done");
    },function(error){
      //handle error here
      console.log(error.message);
    },function(){
        //handle successfull upload here..
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
           //get your image download url here and upload it to databse
           //our path where data is stored ...push is used so that every post have unique id
           firebase.database().ref('blogs/').push().set({
                 postaboutau:postabout,
                 postdatanameau:postdataname,
                 postdateau:postuploadate,
                 postidau:postid,
                  postid2au:postid2,
                 postkeyowrdsau:postkeyowrds,
                 posttitleau:posttitle,
                 imageURL:downloadURL
           },function(error){
               if(error){
                   document.getElementById("error").innerHTML = "error while posting, try again";
                   document.querySelector(".error").style.display = "flex"
               }else{
                   document.getElementById("error").innerHTML = "successfully posted"
                   document.querySelector(".error").style.display = "flex"
                   //now reset your form
                   document.getElementById('post-form').reset();
                   getdata();
               }
           });
        });
    });

}

window.onload=function(){
    this.getdata();
}


function getdata(){
    firebase.database().ref('blogs/').once('value').then(function(snapshot){
      //get your posts div
      var posts_div=document.getElementById('posts');
      //remove all remaining data in that div
      posts.innerHTML="";
      //get data from firebase
      var data=snapshot.val();
      console.log(data);
      //now pass this data to our posts div
      //we have to pass our data to for loop to get one by one
      //we are passing the key of that post to delete it from database
      for(let[key,value] of Object.entries(data)){
        posts_div.innerHTML="<div class='col-sm-4 mt-2 mb-1'>"+
        "<div class='card'>"+
        "<embed autoplay='off' src='"+value.imageURL+"'>"+
        "<div class='card-body'><p class='card-text'>"+value.posttitleau+"</p>"+
        "<button class='btn btn-danger' id='"+key+"' onclick='delete_post(this.id)'>Delete</button>"+
        "</div></div></div>"+posts_div.innerHTML;
      }
    
    });
}

function delete_post(key){
    firebase.database().ref('blogs/'+key).remove();
    getdata();

}










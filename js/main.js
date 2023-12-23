var siteNameInput= document.getElementById('siteName')
var siteUrlInput= document.getElementById('siteUrl')
var siteList=[]


if (localStorage.getItem('sites')!=null) {
     siteList=JSON.parse(localStorage.getItem('sites'))
     addSite()
}


function getInputValues() {
     var site={
          name: siteNameInput.value,
          url: siteUrlInput.value
     }
     var siteExists = siteList.some(existingSite =>existingSite.url === site.url);

    if (siteExists) {
        alert("Site already exists!");
        return;
    }
     
     if (validateName(siteNameInput.value)) {
          document.getElementById('alertName').style.display='none'
     }else{
          document.getElementById('alertName').style.display='block'
     }
     if (validateUrl(siteUrlInput.value)) {
          document.getElementById('alertUrl').style.display='none'
     }else{
          document.getElementById('alertUrl').style.display='block'
     }
     if (validateName(siteNameInput.value) && validateUrl(siteUrlInput.value)) {
          siteList.push(site)
          localStorage.setItem("sites" ,JSON.stringify(siteList))
          addSite()
          clearForm()
          siteNameInput.classList.remove('is-valid')
          siteUrlInput.classList.remove('is-valid')
     }
}

function clearForm() {
     siteNameInput.value=''
     siteUrlInput.value=''
}

function addSite() {
     var cartona=``
     for (var i = 0; i < siteList.length; i++) {
          cartona+=`
          <tr>
               <td>${i+1}</td>
               <td>${siteList[i].name}</td>
               <td><button onclick="visitSite(${i})" type="button" class="btn visit btn-outline-warning py-1 px-2"><i class="fa-solid fa-eye pe-1"></i>Visit</button></td>
               <td><button onclick="updateBtn(${i})" type="button" class="btn update btn-outline-secondary py-1 px-2"><i class="fa-solid fa-pen pe-1"></i>Update</button></td>
               <td><button onclick="deleteSite(${i})" id=deleteBtn class="btn btn-outline-danger py-1 px-2"><i class="fa-solid fa-trash-can pe-1"></i>Delete</button></td>
          </tr>
          `
     }
     document.getElementById("tbodyId").innerHTML = cartona
}

function clearList() {
     siteList=[]
     
     localStorage.setItem("sites" ,JSON.stringify(siteList))
     addSite()
}

function search(value){
     var cartona=``
     for (var i = 0; i < siteList.length; i++) {
          if (siteList[i].name.toLowerCase().includes(value.toLowerCase()) | siteList[i].url.toLowerCase().includes(value.toLowerCase())) {
               cartona+=`
          <tr>
              <td>${i+1}</td>
               <td>${siteList[i].name}</td>
               <td><button onclick="visitSite(${i+1})" type="button" class="btn visit btn-outline-warning py-1 px-2"><i class="fa-solid fa-eye pe-1"></i>Visit</button></td>
               <td><button onclick="updateBtn(${i+1})" type="button" class="btn update btn-outline-secondary py-1 px-2"><i class="fa-solid fa-pen pe-1"></i>Update</button></td>
               <td><button onclick="deleteSite(${i+1})" id=deleteBtn class="btn btn-outline-danger py-1 px-2"><i class="fa-solid fa-trash-can pe-1"></i>Delete</button></td>
          </tr>
          `
          }
          document.getElementById("tbodyId").innerHTML = cartona
     }
}

function validateName(name) {
     var regax1=/^\w{3,}$/
     if (regax1.test(name)) {
          siteNameInput.classList.replace('is-invalid' ,'is-valid')
          document.getElementById('alertName').style.display='none'
          return true
     }
     else{
          siteNameInput.classList.add('is-invalid')
     }
}
function validateUrl(url) {
     var regax2=/^(https:\/\/)?(www.)?(\w{1,7}\.)?\w{1,}(\.com|\.edu|\.bitnet|\.int|\.gov|\.mil|\.net|\.org)(\/)?$/
     if (regax2.test(url)) {
          siteUrlInput.classList.replace('is-invalid' ,'is-valid')
          document.getElementById('alertUrl').style.display='none'
          return true
     }
     else{
          siteUrlInput.classList.add('is-invalid')
     }
}


function visitSite(index) {
     if (siteList[index].url.includes("https://"||"www."||"https://www.")) {
          window.open(siteList[index].url, "_blank");
     } else {
          window.open("https://"+ siteList[index].url, "_blank");
     }
 }
 var deleteBtn = document.getElementById('deleteBtn');
//  var siteIndex=0
 function updateBtn(index) {
     siteIndex=index
     siteNameInput.value= siteList[index].name
     siteUrlInput.value= siteList[index].url
     window.scrollTo(0,50)
     document.getElementById('update').style.display="block"
     document.getElementById('add').style.display="none"
     disableBtn()
 
     
}
function updateSite() {
     document.getElementById('update').style.display="none"
     document.getElementById('add').style.display="block"
     enableBtn()

     // deleteBtn.classList.remove('disabled')
     siteList[siteIndex].name= siteNameInput.value
     siteList[siteIndex].url= siteUrlInput.value
     localStorage.setItem("sites" ,JSON.stringify(siteList))
     clearForm()
     addSite()
}


function disableBtn() {
     var deleteBtn = document.getElementById('deleteBtn');
     deleteBtn.disabled = true;
}
function enableBtn() {
     var deleteBtn = document.getElementById('deleteBtn');
     deleteBtn.disabled = false;
}

function deleteSite(index){
     siteList.splice(index,1)
     localStorage.setItem("sites" ,JSON.stringify(siteList))  
     addSite()  
}
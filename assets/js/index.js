// * HTML Elements
var nameInput = document.getElementById("bookmarkName");
var urlInput = document.getElementById("bookmarkUrl");
var bookmarksContainer = document.getElementById("bookmarksContainer");
var alertBox = document.getElementById("alertbox")
// * App Variables
var nameRegex  = /^\w{3,}(\s+\w+)*$/;
var urlRegex  = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;


var bookmarksList = [];
if (localStorage.getItem("stored bookmarks") !== null) {
  bookmarksList = JSON.parse(localStorage.getItem("stored bookmarks"));
  displayAllBookmarks()
}

// * Functions

function addBookmark() {
    if(validate(nameRegex, nameInput) &&  validate(urlRegex, urlInput)){
        var bookmark = {
            name: nameInput.value,
            url: urlInput.value,
          };
          bookmarksList.push(bookmark);
          localStorage.setItem("stored bookmarks", JSON.stringify(bookmarksList));
          displayBookmark(bookmarksList.length  - 1);
          clearForm();
          alertBox.classList.add("d-none")
    } else{
        alertBox.classList.remove("d-none")
    }
}

function displayBookmark(index) {
  var bookmarkHTML = `<tr class="border-white border-opacity-25">
        <td class="py-3">${index + 1}</td>
        <td class="py-3">${bookmarksList[index].name}</td>
        <td class="py-3">
        <a href="${bookmarksList[index].url}" target="_blank" class="btn btn-visit"><i class="fa-solid fa-eye pe-2"></i>Visit</a>
        </td>
        <td class="py-3">
        <button onclick="deleteBookmark(${index})" class="btn btn-delete btn-danger"><i class="fa-solid fa-trash pe-2"></i>Delete</button>
        </td>
    </tr>`;
    bookmarksContainer.innerHTML += bookmarkHTML;
}

function displayAllBookmarks(){
    for(var i=0;  i<bookmarksList.length; i++){
        displayBookmark(i)
    }
}

function clearForm() {
    nameInput.value = "";
    nameInput.classList.remove("is-invalid" , "is-valid");
    urlInput.value = "";
    urlInput.classList.remove("is-invalid" , "is-valid");
}

function deleteBookmark(deleteIndex){
    bookmarksList.splice(deleteIndex, 1)
    localStorage.setItem("stored bookmarks", JSON.stringify(bookmarksList));
    bookmarksContainer.innerHTML="";
    displayAllBookmarks()
}

function validate(regex, element){
    if(regex.test(element.value)){
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        return true
    } else {
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        return false
    }
}

function closeAlert(){
    alertBox.classList.add("d-none")
}
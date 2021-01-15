console.log("Welcome to notes app. This is app.js");
showNotes();// reloads the previous notes too

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  // console.log(notesObj);
  showNotes();
})

//function to show elements from local storage 
function showNotes() {
  let notes = localStorage.getItem('notes');
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
    <div class="noteCard my-3 mx-3 card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">Note ${index + 1}</h5>
        <p class="card-text">${element}</p>
        <button id="${index}" onclick=" deleteNode(this.id)" class="btn btn-primary">Delete Node</button>
    </div>
</div>`
  });
  let notesElm = document.getElementById('notes');
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  }
  else {
    notesElm.innerHTML = `Nothing to show! "Add a note" section above to proceed`
  }
}

//function to delete a node
function deleteNode(index) {
  // console.log('I am deleting', index);
  let notes = localStorage.getItem('notes');
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

//search function
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  // console.log("input event fired", inputVal);
  let noteCards = document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    // console.log(cardTxt);
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
  })
});





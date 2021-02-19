let modal = document.getElementById("modal");
let btn = document.getElementById("modalBtn");
let form = document.getElementById("modalForm");
let cardNumber = localStorage.getItem("totalCards");
let closeBtn = document.getElementById("closeBtn");

closeBtn.onclick = function (e) {
    modal.style.display = "none";
}

if (cardNumber === null) {
    localStorage.setItem("totalCards", "0");
}

btn.onclick = (event) => {
    // event.target;
    // alert("Modal Box triggered")
    modal.style.display = "block";
}

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

renderCard();

let submit = document.getElementById("submitBtn");
submit.onclick = function (e) {
    e.preventDefault();
    let title = htmlEntities(document.forms["modalForm"]["taskTitle"].value);
    let desc = htmlEntities(document.forms["modalForm"]["taskDescription"].value);
    let assignP = htmlEntities(document.forms["modalForm"]["assignedPerson"].value);
    let deadline = htmlEntities(document.forms["modalForm"]["expectedDeadline"].value);
    let totalCard = parseInt(localStorage.getItem("totalCards"));
    totalCard = totalCard + 1;
    localStorage.setItem("totalCards", "" + totalCard);
    localStorage.setItem("card" + totalCard + "title", title);
    localStorage.setItem("card" + totalCard + "desc", desc);
    localStorage.setItem("card" + totalCard + "deadline", deadline);
    localStorage.setItem("card" + totalCard + "assignP", assignP);
    console.log(totalCard);
    modal.style.display = "none";
    renderCard();
    document.forms["modalForm"].reset();
}

function renderCard() {
    let node = document.getElementById("cardContainer");
    node.innerHTML = "";
    let noCard = ` <div class="no-cards my-3 my-md-5" id="noCard">
                <h5>Task List is Empty</h5>
            </div>`;
  if(parseInt(localStorage.getItem("totalCards")) === 0 ) {
      node.innerHTML += noCard;
  }
    for (let i = 1; i <= parseInt(localStorage.getItem("totalCards")); i++) {
        let title = localStorage.getItem("card" + i + "title");
        let desc = localStorage.getItem("card" + i + "desc");
        let deadline = localStorage.getItem("card" + i + "deadline");
        let assignP = localStorage.getItem("card" + i + "assignP");
        let cardTemplate = `<div class="card col-md-12 p-3 my-3">
                <h2><span>Task Title:</span> ${title}</h2>
                <hr>
                <p><span>Task Desc:</span> ${desc}</p>
                <div class="row">
                <div class="col-md-6 d-inline-block">
                    <p class="d-inline-flex">Deadline : ${deadline}</p>
                </div>
                <div class="col-md-6">
                    <span>Assigned to ${assignP}</span>
                </div>
                </div>
            </div>`;

        node.innerHTML += cardTemplate;
    }
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}



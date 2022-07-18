const addTodo = document.querySelector(".add");
const list = document.querySelector(".list");
const search = document.querySelector(".search input");

let editItem;
let editFlag = false;

addTodo.addEventListener("submit", (e) => {
  e.preventDefault();
  let addText = addTodo.add.value;

  if (addText && !editFlag) {
    const element = document.createElement("li");
    element.classList.add("item");

    element.innerHTML = `
        <span>${addText}</span>
    
        <div class="btns">
          <i class="fas fa-edit edit"></i>
          <i class="far fa-trash-alt delete"></i>
        </div>
        `;
    const editBtn = element.querySelectorAll(".edit");
    editBtn.forEach((btn) => {
      btn.addEventListener('click', editFunc);
    });

    const delBtn = element.querySelectorAll('.delete');
    delBtn.forEach((btn) => {
      btn.addEventListener("click", delFunc);
    });

    list.appendChild(element);

    setDefault();
  }else if(addText && editFlag){

    editItem.innerHTML = addText;

    setDefault();
  }
});

search.addEventListener("keyup", () => {
  const term = search.value.toLowerCase().trim();

  searchBar(term);
});

function searchBar(term) {
  Array.from(list.children)
    .filter((text) => {
      return !text.textContent.toLowerCase().includes(term);
    })
    .forEach((move) => {
      move.classList.add("filtered");
    });

  Array.from(list.children)
    .filter((text) => {
      return text.textContent.toLowerCase().includes(term);
    })
    .forEach((move) => {
      move.classList.remove("filtered");
    });
}

function editFunc(e){
  editItem = e.currentTarget.parentElement.previousElementSibling;

  addTodo.add.value = editItem.innerHTML;

  editFlag = true;
}

function delFunc(e){
  e.target.parentElement.parentElement.remove();

  setDefault();
}

function setDefault() {
  addTodo.add.value = "";
  editFlag = false;
}
const addTodo = document.querySelector(".add");
const list = document.querySelector(".list");
const search = document.querySelector(".search input");

addTodo.addEventListener("submit", (e) => {
  e.preventDefault();
  let addText = addTodo.add.value;

  if (addText) {
    const element = document.createElement("li");
    element.classList.add("item");

    element.innerHTML = `
        <span>${addText}</span>
    
        <div class="btns">
          <i class="fas fa-edit edit"></i>
          <i class="far fa-trash-alt delete"></i>
        </div>
        `;

    list.appendChild(element);

    setDefault();
  }
});

list.addEventListener("click", (e) => {
  const element = e.target.classList;

  if (element.contains("delete")) {
    e.target.parentElement.parentElement.remove();
  }

  if (element.contains("edit")) {
    const editText = e.target.parentElement.parentElement.textContent.trim();
    addTodo.add.value = editText;
  }
});

search.addEventListener("keyup", () => {
  const term = search.value.toLowerCase().trim();

  searchBar(term);
});

function setDefault() {
  addTodo.add.value = "";
}

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

// if(list.children.length <= 1){
//   document.querySelector('.empty').style.display = 'block';
// }
// if(list.children.length > 1){
//   document.querySelector('.empty').style.display = 'none';
// }

const elProductTemplate = document.querySelector(".list__template");
const elList = document.querySelector(".list");
const elListItem = document.querySelector(".list__item")


const createProductRow = product => {
  
  const { title, id, price, model, addedDate, benefits} = product;

  const elProductRow = elProductTemplate.cloneNode(true).content;
  const elCardTitle = elProductRow.querySelector(".card-title");
  elCardTitle.textContent = title;

  const elCardId = elProductRow.querySelector(".card-id");
  elCardId.textContent = id
  
  const elProductMark = elProductRow.querySelector(".card-mark");
  elProductMark.textContent = price;

  const elCardModel = elProductRow.querySelector(".card-model");
  elCardModel.textContent = model;

  const elCardDate = elProductRow.querySelector(".card-date");
  elCardDate.textContent = addedDate;

  const elCardMemory = elProductRow.querySelector(".card-memory");
  elCardMemory.textContent = benefits;

  const elDeleteBtn = elProductRow.querySelector(".btn-danger");
  elDeleteBtn.dataset.id =  id;

  const elEditBtn = elProductRow.querySelector(".btn-secondary");
  elEditBtn.dataset.id = id;

  return elProductRow;
}

const renderProducts = () => {
  elList.innerHTML = "";

  products.forEach((product) => {
    const elProductRow = createProductRow(product);
    elList.appendChild(elProductRow);
  });
}

renderProducts();


const elAddForm = document.querySelector(".add-form");
const elSelect = document.querySelector(".form-select")
elAddForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const formElements = evt.target.elements;

  const titleInputValue = formElements[0].value;
  const priceValue = +formElements[1].value;
  const modelValue = formElements.value;
  const benefitsValue = +formElements[3].value;

  if(titleInputValue !== "" && priceValue > 0 && modelValue !== "" && benefitsValue > 0){
    const addingProduct = {
      id: Math.floor(Math.random() * 1000),
      title: titleInputValue,
      price: priceValue,
      model: modelValue,
      benefits: benefitsValue
    }

    products.unshift(addingProduct);
    const elNewProduct = createProductRow(addingProduct);
    elList.append(elNewProduct)
    elAddForm.reset();
  } 
 
});


elList.addEventListener("click", (evt) => {
  
  if(evt.target.matches(".btn-danger")){
    const clickedBtnId = +evt.target.dataset.id;
    const clickedBtnIndex = products.findIndex((product) => {
      return product.id == clickedBtnId;

    });
    products.splice(clickedBtnIndex, 1);


    renderProducts()
    
  }
  
})
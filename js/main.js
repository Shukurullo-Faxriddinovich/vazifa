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
const elCount = document.querySelector(".count-wrapper");

const renderProducts = () => {
  elList.innerHTML = "";

  products.forEach((product) => {
    const elProductRow = createProductRow(product);
    elList.appendChild(elProductRow);
  });
  elCount.textContent =`Count: ${products.length}`;
}

renderProducts();


const elAddForm = document.querySelector(".add-form");
const elSelect = document.querySelector(".form-select");
const elAddModal = new bootstrap.Modal("#add-product-modal");
elAddForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const formElements = evt.target.elements;

  const titleInputValue = formElements[0].value;
  const priceValue = +formElements[1].value;
  const modelValue = formElements[2].value;
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
    elAddModal.hide();
  } 
  elCount.textContent =`Count: ${products.length}`;
});

const elEditModal = new bootstrap.Modal("#edit-product-modal");
const elEditForm = document.querySelector("#edit-product-form");
const elEditTitle = elEditForm.querySelector("#edit-product-title");
const elEditPrice = elEditForm.querySelector("#edit-product-price");
const elEditManufacturer = elEditForm.querySelector("#edit-product-manufacturer")
const elEditBenefits = elEditForm.querySelector("#edit-product-benefits");

elList.addEventListener("click", (evt) => {
  
  if(evt.target.matches(".btn-danger")){
    const clickedBtnId = +evt.target.dataset.id;
    const clickedBtnIndex = products.findIndex((product) => {
      return product.id == clickedBtnId;

    });
    products.splice(clickedBtnIndex, 1);
    renderProducts();
  }
  if(evt.target.matches(".btn-secondary")){
    const clickedBtnId = +evt.target.dataset.id;
    const clickedBtnObj = products.find((product) => product.id == clickedBtnId)
    
    if(clickedBtnObj){
      elEditTitle.value = clickedBtnObj.title || ""; 
      elEditPrice.value = clickedBtnObj.price || "";
      elEditManufacturer.value = clickedBtnObj.model || ""; 
      elEditBenefits.value = clickedBtnObj.benefits || "";
      elEditForm.dataset.id = clickedBtnId;
    }
  }
});


elEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const submitItemId = +evt.target.dataset.id;

  const titleValue = elEditTitle.value.trim();
  const priceValue = elEditPrice.value;
  const benefitsValue = elEditBenefits.value;
  const manufacturerValue = elEditManufacturer.value;

  if(titleValue !== "" && benefitsValue !== "" && manufacturerValue !== "" && priceValue > 0){
    const submitItemIndex = products.findIndex(product => product.id === submitItemId);

    const submitItemObj = {
      id: submitItemId,
      title: titleValue,
      price: priceValue,
      model: manufacturerValue,
      benefits: benefitsValue
    }
    products.splice(submitItemIndex, 1, submitItemObj);
    renderProducts();
    elEditModal.hide();
  }
});


const elFilterForm = document.querySelector("#filter");


elFilterForm.addEventListener("submit", (evt) =>{
  evt.preventDefault()

  const elements = evt.target.elements;
  const searchValue = elements.search.value;
  const priceValue = elements.from.value;
  const priceToValue = +elements.to.value;
  const sortValue = elements.sortby.value;

  const filteredProducts = products.filter(function(element) {
    return element.title.toLowerCase().includes(searchValue.toLowerCase());
  }).filter(product =>{
    return product.price >= priceValue;
  }).filter(product =>{
    return priceToValue >= priceValue ? product.price <= priceToValue : true;
  })
  // .sort((a, b) => {
  //   if(sortValue == "1"){
  //     if(a.title > b.title){
  //       return 1;
  //     }else if(a.title == b.title){
  //       return 0;
  //     }
  //     return -1;
  //   }
  //   else if(sortValue == "2"){
  //     return b.price - a.price;
  //   }
  //   else if(sortValue == "3"){
  //     return a.price - b.price;
  //   }
  // });

  elList.innerHTML = "";
  filteredProducts.forEach(product => {
    const elCreatedProduct = createProductRow(product);
    elList.append(elCreatedProduct);
  });
});
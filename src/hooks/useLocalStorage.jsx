const addToDb = (id) => {
  let LikesCollection = {};

  //get the shopping cart from local storage
  const storedLikes = localStorage.getItem("likes-collection");
  if (storedLikes) {
    LikesCollection = JSON.parse(storedLikes);
  }

  // add quantity
  const quantity = LikesCollection[id];
  if (quantity) {
    const newQuantity = quantity + 1;
    LikesCollection[id] = newQuantity;
  } else {
    LikesCollection[id] = 1;
  }
  localStorage.setItem("likes-collection", JSON.stringify(LikesCollection));
};

const getStoredLikes = () => {
  let likesCollection = {};

  //get the shopping cart from local storage
  const storedLikes = localStorage.getItem("likes-collection");
  if (storedLikes) {
    likesCollection = JSON.parse(storedLikes);
  }
  return likesCollection;
};

const removeFromDb = (id) => {
  const storedCart = localStorage.getItem("likes-collection");
  if (storedCart) {
    const shoppingCart = JSON.parse(storedCart);
    if (id in shoppingCart) {
      delete shoppingCart[id];
      localStorage.setItem("likes-collection", JSON.stringify(shoppingCart));
    }
  }
};

const deleteShoppingCart = () => {
  localStorage.removeItem("likes-collection");
};

export {
  addToDb,
  deleteShoppingCart,
  getStoredLikes as getStoredCart,
  removeFromDb,
};

import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_PRODUCT = "GET_PRODUCT";
export const POST_PRODUCT = "POST_PRODUCT";
export const FILTER_BY_AGE = "FILTER_BY_AGE";
export const FILTER_BY_PRICE = "FILTER_BY_PRICE";
export const GET_PRODUCTS_NAME = "GET_PRODUCTS_NAME";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const FILTER_BY_BRAND = "FILTER_BY_BRAND";
export const ORDER_BY_PRICE = "ORDER_BY_PRICE";
export const ADD_TO_CART = "ADD_TO_CART";
export const GET_PRODUCTS_FILTERED = "GET_PRODUCTS_FILTERED";
export const GET_PRODUCTS_FILTERED_PAGE = "GET_PRODUCTS_FILTERED_PAGE";
export const COMBINED_FILTERS = "COMBINED_FILTERS";
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
export const DECREASE_PRODUCT_QUANTITY = "DECREASE_PRODUCT_QUANTITY";
export const INCREASE_PRODUCT_QUANTITY = "INCREASE_PRODUCT_QUANTITY";
export const ACTUALIZAR_FILTRO_PARA_PAGINADO =
  "ACTUALIZAR_FILTRO_PARA_PAGINADO";
export const CREATE_REVIEW = "CREATE_REVIEW";
export const FETCH_REVIEWS = "FETCH_REVIEWS";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

export const GET_ALL_ORDERS = "GET_ALL_ORDERS";
export const GET_ALL_USERS = "GET_ALL_USERS";
//export const POST_ORDER = "POST_ORDER";
//export const PUT_ORDER = "PUT_ORDER";
export const GET_ORDER_BY_ID = "GET_ORDER_BY_ID";
export const EMPTY_CART = "EMPTY_CART";
export const EMPTY_DETAIL = "EMPTY_DETAIL"
export const PRODUCTS_FILTER = "PRODUCTS_FILTER";

export const EMPTY_DETAIL_ORDERS_ID = "EMPTY_DETAIL_ORDERS_ID"

export const GET_ALL_DETAIL_ORDERS = "GET_ALL_DETAIL_ORDERS";
export const GET_DETAIL_ORDER_BY_ID = "GET_DETAIL_ORDER_BY_ID";
//export const POST_DETAIL_ORDER = "POST_DETAIL_ORDER";
//export const PUT_DETAIL_ORDER = "PUT_DETAIL_ORDER";
export const GET_DETAIL_ORDERS_USERS_ID = "GET_DETAIL_ORDERS_USERS_ID";
export const GET_ID_USER = "GET_ID_USER";
export const DELETE_CART = "DELETE_CART";
export const REDUCE_STOCK_QUANTITY = "REDUCE_STOCK_QUANTITY";
export const GET_ALL_USER_OBJECT = "GET_ALL_USER_OBJECT";
export const PURCHASE_HISTORY_STATE = "PURCHASE_HISTORY_STATE"

const GET_PRODUCTS_ALL = import.meta.env.VITE_GET_ALL_PRODUCTS;
const GET_PRODUCTS_ALL_DOS = import.meta.env.VITE_GET_ALL_PRODUCTS_DOS;
const GET_PRODUCT_BY_NAME = import.meta.env.VITE_GET_PRODUCT_BY_NAME;
const POST_NEW_PRODUCT = import.meta.env.VITE_POST_NEW_PRODUCT;
const PUT_PRODUCT_UPDATE = import.meta.env.VITE_PUT_PRODUCT_UPDATE;
const GET_PRODUCT_BY_NAME_VALUE = import.meta.env.VITE_GET_PRODUCT_BY_NAME_VALUE;
const GET_ORDERS = import.meta.env.VITE_GET_ORDERS;
const GET_USERS = import.meta.env.VITE_GET_USERS;
const PUT_ORDER_UPDATE = import.meta.env.VITE_PUT_ORDER_UPDATE;
const POST_NEW_ORDER = import.meta.env.VITE_POST_NEW_ORDER;
const GET_DETAIL_ORDERS = import.meta.env.VITE_GET_DETAIL_ORDERS;
const POST_NEW_DETAIL_ORDER = import.meta.env.VITE_POST_NEW_DETAIL_ORDER;
const POST_RATING = import.meta.env.VITE_POST_RATING;
const GET_RATINGS = import.meta.env.VITE_GET_RATINGS;

export const getProducts = () => {
  return async function (dispatch) {
    const dbData = await axios.get(GET_PRODUCTS_ALL);
    const products = dbData.data;
    dispatch({ type: GET_PRODUCTS, payload: products });
  };
};

export const getAllProducts = () => {
  return async function (dispatch) {
    const dbData = await axios.get(GET_PRODUCTS_ALL_DOS);
    const products = dbData.data;
    dispatch({ type: GET_ALL_PRODUCTS, payload: products });
  };
};

export const getProduct = (id) => {
  return async function (dispatch) {
    const dbData = await axios.get(`${GET_PRODUCTS_ALL}/${id}`);
    const product = dbData.data;
    dispatch({ type: GET_PRODUCT, payload: product });
  };
};

export const getProductsName = (names) => {
  return async function (dispatch) {
    const dbData = await axios.get(
      GET_PRODUCT_BY_NAME /*`http://localhost:3010/products/?name=${names}`*/
    );
    const filteredProducts = dbData.data;
    dispatch({ type: GET_PRODUCTS_NAME, payload: filteredProducts });
  };
};

export const postProduct = (payload) => {
  return async function (dispatch) {
    const response = await axios.post(POST_NEW_PRODUCT, payload);
    return response;
  };
};

export const putProduct = (id, payload) => {
  return async function (dispatch) {
    const response = await axios.put(`${PUT_PRODUCT_UPDATE}/${id}`, payload);
    return response;
  };
};

export const getProductsFiltered = (name, value) => {
  return async function (dispatch) {
    const response = await axios.get(GET_PRODUCT_BY_NAME_VALUE);
    const responseData = response.data;
    dispatch({ type: GET_PRODUCTS_FILTERED, payload: responseData });
  };
};

export const getProductsFilteredPage = (params) => {
  return async function (dispatch) {
    const response2 = await axios.get(GET_PRODUCTS_ALL, {
      params: params,
    });
    const responseData = response2.data;
    dispatch({ type: GET_PRODUCTS_FILTERED_PAGE, payload: responseData });
  };
};

export const filterByAge = (age) => {
  return {
    type: FILTER_BY_AGE,
    payload: age,
  };
};

export const filterByPrice = (price) => {
  return {
    type: FILTER_BY_PRICE,
    payload: price,
  };
};

export const filterByCategory = (category) => {
  return {
    type: FILTER_BY_CATEGORY,
    payload: category,
  };
};

export const filterByBrand = (brand) => {
  return {
    type: FILTER_BY_BRAND,
    payload: brand,
  };
};

export const orderByPrice = (method) => {
  return {
    type: ORDER_BY_PRICE,
    payload: method,
  };
};

export const addProductToCart = (cart) => {
  return {
    type: ADD_TO_CART,
    payload: cart,
  };
};

export const removeProductFromCart = (productID) => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload: productID,
  };
};

export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};

export const emptyDetailOrdersId = () => {
  return {
    type: EMPTY_DETAIL_ORDERS_ID,
  };
};

export const emptyDetail = () => {
  return {
    type: EMPTY_DETAIL,
  };
};

export const decreaseProductQuantity = (productID) => {
  return {
    type: DECREASE_PRODUCT_QUANTITY,
    payload: productID,
  };
};

export const increaseProductQuantity = (productID) => {
  return {
    type: INCREASE_PRODUCT_QUANTITY,
    payload: productID,
  };
};

export const getAllOrders = () => {
  return async function (dispatch) {
    const dbData = await axios.get(GET_ORDERS);
    const orders = dbData.data;
    dispatch({ type: GET_ALL_ORDERS, payload: orders });
  };
};

export const getAllUsers = () => {
  return async function (dispatch) {
    const dbData = await axios.get(GET_USERS);
    const users = dbData.data;
    dispatch({ type: GET_ALL_USERS, payload: users });
  };
};

export const getOrderById = (id) => {
  return async function (dispatch) {
    const dbData = await axios.get(`${GET_ORDERS}/${id}`);
    const order = dbData.data;
    dispatch({ type: GET_ORDER_BY_ID, payload: order });
  };
};

export const modifyOrder = (id, orderData) => {
  return async function () {
    try {
      await axios.put(`${PUT_ORDER_UPDATE}/${id}`, orderData);
    } catch (error) {
      alert(error.message);
    }
    // const updatedOrder = dbData.data;
    //dispatch({ type: PUT_ORDER, payload: updatedOrder });
  };
};

export const createOrder = (payload) => {
  return async function () {
    try {
      await axios.post(POST_NEW_ORDER, payload);
      alert("Order Created");
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getAllDetailOrders = () => {
  return async function (dispatch) {
    const dbData = await axios.get(GET_DETAIL_ORDERS);
    const details = dbData.data;
    dispatch({
      type: GET_ALL_DETAIL_ORDERS,
      payload: details,
    });
  };
};

export const getDetailOrderById = (id) => {
  return async function (dispatch) {
    const dbData = await axios.get(`${GET_DETAIL_ORDERS}/${id}`);
    const detail = dbData.data;
    dispatch({ type: GET_DETAIL_ORDER_BY_ID, payload: detail });
  };
};

export const productsFilter = (params) => {
  return {
    type: PRODUCTS_FILTER,
    payload: params,
  };
};

export const createDetailOrder = (payload) => {
  return async function () {
    try {
      await axios.post(POST_NEW_DETAIL_ORDER, payload);
      alert("Detail Order Created");
    } catch (error) {
      alert(error.message);
    }
  };
};

export const actualizarFiltroPaginado = (filterConfig) => {
  return {
    type: "ACTUALIZAR_FILTRO_PARA_PAGINADO",
    payload: filterConfig,
  };
};

export const createReview = (reviewData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(POST_RATING, reviewData);
      const review = response.data.review;
      dispatch({ type: "CREATE_REVIEW", payload: review });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchReviews = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(GET_RATINGS);
      const reviews = response.data;
      dispatch({ type: "FETCH_REVIEWS", payload: reviews });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDetailOrdersIDArray = (idDetailOrder) => {
  return {
    type: GET_DETAIL_ORDERS_USERS_ID,
    payload: idDetailOrder,
  };
};

export const getIdEmailUser = (idEmailUser) => {
  return {
    type: GET_ID_USER,
    payload: idEmailUser,
  };
};

export const deleteCart = () => {
  return {
    type: DELETE_CART,
    
  };
};

export const getUserObject = (userObject) => {
  return {
    type: GET_ALL_USER_OBJECT,
    payload: userObject,
  };
};

export const purchaseHistoryState = (purchaseHistory) => {
  return {
    type: PURCHASE_HISTORY_STATE,
    payload: purchaseHistory
  }
};

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const signup = async (formData) => {
  const response = await fetch(
    `${BASE_URL}/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    }
  );

  return response.json();
};


 

export const loginUser = async (formData) => {
  const response = await fetch(
    `${BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    }
  );

  return response.json();
};


 

export const getProducts = async () => {
  const response = await fetch(
    `${BASE_URL}/products`
  );

  return response.json();
};


 

export const addProduct = async (productData) => {
  const response = await fetch(
    `${BASE_URL}/products`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
      credentials: "include",
    }
  );

  return response.json();
};


 

export const getCart = async () => {
  const response = await fetch(
    `${BASE_URL}/cart`,
    {
      credentials: "include",
    }
  );

  return response.json();
};


 

export const addToCart = async (data) => {
  const response = await fetch(
    `${BASE_URL}/cart`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }
  );

  return response.json();
};

export const logoutUser = async () => {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  return response.json();
};
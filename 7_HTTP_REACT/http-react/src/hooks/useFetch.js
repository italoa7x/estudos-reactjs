import { useCallback, useEffect, useState } from "react";

const URL = "http://localhost:3000/products";
export const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const request = await fetch(URL);
      const productData = await request.json();
      setData(productData);
    } catch (error) {
      setError("Ocorreu um erro ao carregar os dados.");
    } finally {
      setLoading(false);
    }
  }, []);

  const postData = async (product) => {
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "Application/json",
      },
    });
    const responseData = await response.json();
    setData((current) => [...current, responseData]);
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });
      await getData();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return {
    getData,
    postData,
    deleteProduct,
    data,
    loading,
    error,
  };
};

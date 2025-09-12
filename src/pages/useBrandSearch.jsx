import { useState, React, useEffect } from "react";
import { useBrandInfo } from "./useBrandInfo";

export function useBrandSearch(apiKey) {
  const [brandInput, setBrandInput] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [productsList, setProductsList] = useState([]);
  const { fetchBrandInfo, data, loading, error } = useBrandInfo(apiKey);

  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    await fetchBrandInfo(brandInput);
  };

  // Update textarea when API data changes
  useEffect(() => {
    if (data && data.description !== undefined) {
      setTextareaValue(data.description);
      setProductsList(data.products);
    }
  }, [data]);

  return {
    brandInput,
    setBrandInput,
    textareaValue,
    setTextareaValue,
    handleBrandSubmit,
    loading,
    error,
  };
}

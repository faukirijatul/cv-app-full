import { useState } from "react";

export const useFormInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    setValue,
    onChange,
  };
};

export const useFormArray = (initialValue = []) => {
  const [value, setValue] = useState(initialValue);

  const addItem = (item) => {
    setValue([...value, item]);
  };

  const removeItem = (index) => {
    setValue(value.filter((_, i) => i !== index));
  };

  const updateItem = (index, updatedItem) => {
    setValue(value.map((item, i) => (i === index ? updatedItem : item)));
  };

  return {
    value,
    setValue,
    addItem,
    removeItem,
    updateItem,
  };
};

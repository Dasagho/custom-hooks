import { useState } from "react";

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const handleInputChange = ({ target }) => {
    const { value, name } = target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    handleInputChange,
    handleResetForm,
  };
};

import React, {useState } from "react";
import { ContactFormData, FormErrors, StoredMessage } from "../models/ContactModel";


export function useContactForm() {

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    reason: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [success, setSuccess] = useState(false);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = "Nombre obligatorio";
    if (!formData.email.trim()) {
      newErrors.email = "Email obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Formato inválido";
    }
    if (!formData.reason.trim()) newErrors.reason = "Motivo obligatorio";
    if (!formData.message.trim()) newErrors.message = "Mensaje obligatorio";

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      reason: "",
      message: "",
    });
    setErrors({});
    setSuccess(false);
  };

  const saveToLocalStorage = (data: ContactFormData) => {

    const newMessage: StoredMessage = {
      ...data,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };

    const stored = localStorage.getItem("bidaiaGoMessages");
    const messagesArray = stored ? JSON.parse(stored) : [];

    messagesArray.push(newMessage);

    localStorage.setItem("bidaiaGoMessages", JSON.stringify(messagesArray));
  };

const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      saveToLocalStorage(formData);
      resetForm();
      setSuccess(true);
      setIsSubmitting(false);
    }, 500);
  };

  return {
    formData,
    errors,
    isSubmitting,
    success,
    handleChange,
    resetForm,
    handleSubmit
  };
}
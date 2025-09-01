// src/utils/toast.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Success toast
export const successToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000, // 3 sec
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

// Error toast
export const errorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 4000, // 4 sec
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

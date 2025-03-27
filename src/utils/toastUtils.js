import { toast } from 'react-toastify';

// Storage for toast IDs to prevent duplicates
const toastIds = {
  error: null,
  success: null,
  info: null,
  warning: null
};

// Clear all active toasts
export const clearAllToasts = () => {
  toast.dismiss();
  Object.keys(toastIds).forEach(key => {
    toastIds[key] = null;
  });
};

// Show an error toast with duplication prevention
export const showErrorToast = (message, options = {}) => {
  if (toastIds.error) {
    toast.dismiss(toastIds.error);
  }
  
  // Use a small timeout to prevent flickering
  return setTimeout(() => {
    toastIds.error = toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
      onClose: () => {
        toastIds.error = null;
        if (options.onClose) options.onClose();
      }
    });
  }, 300);
};

// Show a success toast with duplication prevention
export const showSuccessToast = (message, options = {}) => {
  if (toastIds.success) {
    toast.dismiss(toastIds.success);
  }
  
  // Use a small timeout to prevent flickering
  return setTimeout(() => {
    toastIds.success = toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
      onClose: () => {
        toastIds.success = null;
        if (options.onClose) options.onClose();
      }
    });
  }, 300);
};

// Show an info toast with duplication prevention
export const showInfoToast = (message, options = {}) => {
  if (toastIds.info) {
    toast.dismiss(toastIds.info);
  }
  
  // Use a small timeout to prevent flickering
  return setTimeout(() => {
    toastIds.info = toast.info(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      ...options,
      onClose: () => {
        toastIds.info = null;
        if (options.onClose) options.onClose();
      }
    });
  }, 300);
};

// Show a custom toast with React components
export const showCustomToast = (content, type = 'info', options = {}) => {
  if (toastIds[type]) {
    toast.dismiss(toastIds[type]);
  }
  
  // Use a small timeout to prevent flickering
  return setTimeout(() => {
    toastIds[type] = toast[type](content, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      ...options,
      onClose: () => {
        toastIds[type] = null;
        if (options.onClose) options.onClose();
      }
    });
  }, 300);
}; 
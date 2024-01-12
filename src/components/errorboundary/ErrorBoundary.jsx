import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const componentDidCatch = (error, errorInfo) => {
    toast.error('An unexpected error occurred. Please try again.');
    setHasError(true);
  };

  return hasError ? null : children;
};

export default ErrorBoundary;

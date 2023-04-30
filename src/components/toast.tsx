import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number;
  type?: "success" | "error" | "info";
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  duration = 3000,
  type = "success",
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose && onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  if (!visible) return null;

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <div
      className={`fixed right-4 top-4 rounded p-4 text-white ${bgColor} shadow-md`}
    >
      {message}
    </div>
  );
};

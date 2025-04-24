import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-2
        rounded-full
        bg-red-600
        text-white
        font-bold
        text-lg
        tracking-wide
        shadow-md
        hover:bg-red-500
        disabled:bg-gray-400 disabled:cursor-not-allowed
        transition-all duration-200
        ${className}
      `}
    >
      ⚡ {children}
    </button>
  );
};

export default Button;

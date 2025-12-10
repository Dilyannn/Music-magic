import React from 'react';

const FormInput = React.forwardRef(({
  label,
  id,
  type = "text",
  placeholder,
  as = "input",
  rows,
  className = "",
  error,
  ...others
}, ref) => {
  const baseClass = "form-input";
  const errorClass = error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "";

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-400 mb-2"
        >
          {label}
        </label>
      )}
      {as === "textarea" ? (
        <textarea
          id={id}
          ref={ref}
          rows={rows}
          className={`${baseClass} resize-none ${errorClass} ${className}`}
          placeholder={placeholder}
          {...others}
        ></textarea>
      ) : (
        <input
          type={type}
          id={id}
          ref={ref}
          className={`${baseClass} ${errorClass} ${className}`}
          placeholder={placeholder}
          {...others}
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
});

export default FormInput;

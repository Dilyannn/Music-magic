const FormInput = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  as = "input",
  rows,
  className = "",
}) => {
  const baseClass = "form-input";

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
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          className={`${baseClass} resize-none ${className}`}
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`${baseClass} ${className}`}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default FormInput;

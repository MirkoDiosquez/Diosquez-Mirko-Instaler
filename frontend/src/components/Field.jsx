export default function Field({ label, name, error, multiline, ...props }) {
  const Element = multiline ? "textarea" : "input";
  return (
    <div className="field">
      <label htmlFor={name}>
        {label}
        {props.required && <span className="required"> *</span>}
      </label>
      <Element
        id={name}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      />
      {error && (
        <span className="field-error" id={`${name}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}

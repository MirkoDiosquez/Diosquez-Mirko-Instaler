import Icon from "./Icon";
export default function Button({
  children,
  icon,
  variant = "primary",
  className = "",
  ...props
}) {
  return (
    <button className={`button button-${variant} ${className}`} {...props}>
      {icon && <Icon name={icon} />}
      {children}
    </button>
  );
}

const Button = ({ title, type, disabled, active, className, onClick }) => {
  return (
    <button
      className={`position-relative ${className}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {
        active && 
        <div className="d-flex justify-content-center align-items-center w-100 h-100 position-absolute top-0 start-0">
          <span className="spinner-border spinner-border-sm" />
        </div>
      }
      <span className={`${active && 'invisible'}`}>{title}</span>
    </button>
  );
};

export default Button;
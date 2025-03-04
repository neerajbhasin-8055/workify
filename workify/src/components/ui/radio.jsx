const Radio = ({ name, options, value, onChange, className }) => {
    return (
      <div className={className}>
        {options.map((option) => (
          <label key={option.value} className="mr-4">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}  // Ensure correct selection
              onChange={onChange}  // Handle change event
              className="mr-1"
            />
            {option.label}
          </label>
        ))}
      </div>
    );
  };
  
  export default Radio;
  
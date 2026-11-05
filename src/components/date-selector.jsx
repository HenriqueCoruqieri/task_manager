import FieldError from "./field-error"

const DateSelector = ({ label, register, error, ...inputProps }) => {
    return (
      <div className="relative flex flex-col gap-1">
        <h3 className="card-title card-actions text-primary text-sm">
          {label}
        </h3>
        <input
          {...register}
          {...inputProps}
          type="date"
          className="input input-sm w-full border border-primary"
        />
        <FieldError error={error} />
      </div>
    )
  }
  
  export default DateSelector
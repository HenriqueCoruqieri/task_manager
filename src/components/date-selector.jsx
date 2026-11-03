import FieldError from "./field-error"

const DateSelector = ({ label, register, error }) => {
    return (
      <div className="relative flex flex-col gap-1">
        <h3 className="card-title card-actions text-emerald-500 text-sm">
          {label}
        </h3>
        <input
          {...register}
          type="date"
          className="input input-sm w-full border border-emerald-500"
        />
        <FieldError error={error} />
      </div>
    )
  }
  
  export default DateSelector
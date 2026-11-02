const DateSelector = ({ label, register, error }) => {
    return (
      <div className="space-y-1">
        <h3 className="card-title card-actions text-emerald-500 text-sm">
          {label}
        </h3>
        <input
          {...register}
          type="date"
          className="input input-sm w-full border border-emerald-500"
        />
        {error && <p className="text-error text-sm">{error.message}</p>}
      </div>
    )
  }
  
  export default DateSelector
const FieldError = ({error}) => {
    if(!error) return null
    
    return (
        <p className="absolute left-0 top-full text-error text-xs whitespace-nowrap">
            {error.message}
        </p>
    )
}

export default FieldError
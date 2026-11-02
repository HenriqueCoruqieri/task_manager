import { formatDisplayDate } from "../lib/dayjs"


const DateField = ({label, date}) => {
    return (
        <p className="text-xs text-base-content/60">
            <span>{label}: </span>
            {formatDisplayDate(date)}
        </p>
    )    
}

export default DateField
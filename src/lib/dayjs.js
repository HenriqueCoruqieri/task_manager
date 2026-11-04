import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

const INPUT_DATE_FORMAT = "YYYY-MM-DD"
const OUTPUT_DATE_FORMAT = "DD/MM/YYYY"

export const getToday = () => dayjs().format(INPUT_DATE_FORMAT)

export const isOverdue = (date) =>
    dayjs.utc(date).format(INPUT_DATE_FORMAT) < getToday()

export const isBeforeDate = (date, dateToCompare) => 
    dayjs(date).isBefore(dayjs(dateToCompare))

export const formatDisplayDate = (date) =>
    dayjs.utc(date).format(OUTPUT_DATE_FORMAT)

export const formatInputDate = (date) =>
    dayjs.utc(date).format(INPUT_DATE_FORMAT)
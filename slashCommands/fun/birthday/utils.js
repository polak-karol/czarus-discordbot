import { isLeapYear } from '../../../utils'

export const getYear = (day, month, year) => {
  if (day === 29 && month === 2) return isLeapYear(year) ? year : 2020

  return year
}

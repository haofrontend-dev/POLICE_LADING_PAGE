
export const getNameSeat = (value, nameAgency) => {
    return nameAgency.find((item) => item.seat_code == value)
}

export const isHasUserSeatCheckin = (value, nameAgency) => {
    return nameAgency.some((item) => item.seat_code == value && item.is_seated === 1)
}

export const isHasUserSeat = (value, nameAgency) => {
    return nameAgency.some((item) => item.seat_code == value && item.is_seated === 0)
}

export const getInfoUserSeat= (value, nameAgency) => {
    return nameAgency.find((item) => item.seat_code == value)
}
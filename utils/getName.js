import nameAgency from '~/assets/data/nameAgency.js'

export const getNameSeat = (value) => {
    return nameAgency.find((item) => item.value == value)
}

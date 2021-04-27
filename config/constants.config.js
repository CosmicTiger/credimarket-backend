const moment = require('moment')
const express = require('express')
const http = require('http')

/**
 * Constante que retorna la hora del servidor con la diferencia entre hora UTC y la hora local
 */
module.exports.NOW = () => {
    const now = new Date()

    // Constante que devuelve la diferencia horaria entre la hora UTC y la hora local, en minutos.
    // 360 min / en produccion no funciona el `getTimezoneOffset`
    // const timeMinutesOffset = 360
    const timeMinutesOffset = moment().toDate().getTimezoneOffset() * 2

    // convertimos en timestap el tiempo
    const timePast = moment(now).subtract(timeMinutesOffset, 'minutes').toDate()

    return timePast
}

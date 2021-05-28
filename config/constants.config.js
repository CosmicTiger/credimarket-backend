const moment = require('moment')
const express = require('express')
const morgan = require('morgan')
const http = require('http')
const jwt = require('jsonwebtoken')
const { SHA256: cryptoPassword } = require('crypto-js')

const {
    JWT_SECRET,
    JWT_SECRET_ADMIN,
    PRODUCTION,
} = require('./vars.config')

/**
 * Constante que retorna la hora del servidor con la diferencia entre hora UTC y la hora local
 */
const NOW = () => {
    const now = new Date()

    // Constante que devuelve la diferencia horaria entre la hora UTC y la hora local, en minutos.
    // 360 min / en produccion no funciona el `getTimezoneOffset`
    // const timeMinutesOffset = 360
    const timeMinutesOffset = moment().toDate().getTimezoneOffset() * 2

    // convertimos en timestap el tiempo
    const timePast = moment(now).subtract(timeMinutesOffset, 'minutes').toDate()

    return timePast
}

const generateRandomKey = () =>
    new Promise(resolve => {
        const str = Math.random().toString(36).substring(7)

        resolve(str)
    })

const EMAILS = {
    SUPPORT: 'luisangelmarcia@gmail.com',
}

const TLDS = [
    // By original top-level domains
    {
        entity: 'commercial',
        name: 'com'
    },
    {
        entity: 'organization',
        name: 'org'
    },
    {
        entity: 'network',
        name: 'net'
    },
    {
        entity: 'international',
        name: 'int'
    },
    {
        entity: 'education',
        name: 'edu'
    },
    {
        entity: 'government',
        name: 'gov'
    },
    {
        entity: 'military',
        name: 'mil'
    },
    // By countries top-level domains
    {
        entity: 'Ascenscion Island (UK)',
        name: 'ac'
    },
    {
        entity: 'Andorra',
        name: 'ad'
    },
    {
        entity: 'United Arab Emirates',
        name: 'ae'
    },
    {
        entity: 'Afghanistan',
        name: 'af'
    },
    {
        entity: 'Antigua and Barbuda',
        name: 'ag'
    },
    {
        entity: 'Anguilla (UK)',
        name: 'ai'
    },
    {
        entity: 'Albania',
        name: 'al'
    },
    {
        entity: 'Armenia',
        name: 'am'
    },
    {
        entity: 'Angola',
        name: 'ao'
    },
    {
        entity: 'Antarctica',
        name: 'aq'
    },
    {
        entity: 'Argentina',
        name: 'ar'
    },
    {
        entity: 'American Samoa (USA)',
        name: 'as'
    },
    {
        entity: 'Austria',
        name: 'at'
    },
    {
        entity: 'Australia',
        name: 'au'
    },
    {
        entity: 'Aruba (Kingdom of The Netherlands',
        name: 'aw'
    },
    {
        entity: 'Aland (Finland)',
        name: 'ax'
    },
    {
        entity: 'Azerbaijan',
        name: 'az'
    },
    {
        entity: 'Bosnia and Herzegovina',
        name: 'ba'
    },
    {
        entity: 'Barbados',
        name: 'bb'
    },
    {
        entity: 'Bangladesh',
        name: 'bd'
    },
    {
        entity: 'Belgium',
        name: 'be'
    },
    {
        entity: 'Burkina Faso',
        name: 'bf'
    },
    {
        entity: 'Bulgaria',
        name: 'bg'
    },
    {
        entity: 'Bahrain',
        name: 'bh'
    },
    {
        entity: 'Burundi',
        name: 'bi'
    },
    {
        entity: 'Benin',
        name: 'bj'
    },
    {
        entity: 'Bermuda (UK)',
        name: 'bm'
    },
    {
        entity: 'Brunei',
        name: 'bn'
    },
    {
        entity: 'Bolivia',
        name: 'bo'
    },
    {
        entity: 'Caribbean Netherlands (Bonaire, Saba, and Sint Eustatius)',
        name: 'bq'
    },
    {
        entity: 'Brazil',
        name: 'br'
    },
    {
        entity: 'Bahamas',
        name: 'bs'
    },
    {
        entity: 'Bhutan',
        name: 'bt'
    },
    {
        entity: 'Botswana',
        name: 'bw'
    },
    {
        entity: 'Belarus',
        name: 'by'
    },
    {
        entity: 'Belize',
        name: 'bz'
    },
    {
        entity: 'Canada',
        name: 'ca'
    },
    {
        entity: 'Cocos (Keeling) Islands (Australia)',
        name: 'cc'
    },
    {
        entity: 'Democratic Republic of the Congo',
        name: 'cd'
    },
    {
        entity: 'Central African Republic',
        name: 'cf'
    },
    {
        entity: 'Republic of the Congo',
        name: 'cg'
    },
    {
        entity: 'Switzerland',
        name: 'ch'
    },
    {
        entity: 'Ivory Coast',
        name: 'ci'
    },
    {
        entity: 'Cook Islands',
        name: 'ck'
    },
    {
        entity: 'Chile',
        name: 'cl'
    },
    {
        entity: 'Cameroon',
        name: 'cm'
    },
    {
        entity: "People's Republic of China",
        name: 'cn'
    },
    {
        entity: 'Colombia',
        name: 'co'
    },
    {
        entity: 'Costa Rica',
        name: 'cr'
    },
    {
        entity: 'Cuba',
        name: 'cu'
    },
    {
        entity: 'Cape Verde',
        name: 'cv'
    },
    {
        entity: 'Curacao (Kingdom of the Netherlands)',
        name: 'cw'
    },
    {
        entity: 'Christmas Island',
        name: 'cx'
    },
    {
        entity: 'Cyprus',
        name: 'cy'
    },
    {
        entity: 'Czech Republic',
        name: 'cz'
    },
    {
        entity: 'Germany',
        name: 'de'
    },
    {
        entity: 'Djibouti',
        name: 'dj'
    },
    {
        entity: 'Denmark',
        name: 'dk'
    },
    {
        entity: 'Dominica',
        name: 'dm'
    },
    {
        entity: 'Dominican Republic',
        name: 'do'
    },
    {
        entity: 'Algeria',
        name: 'dz'
    },
    {
        entity: 'Algeria',
        name: 'dz'
    },
    {
        entity: 'Ecuador',
        name: 'ec'
    },
    {
        entity: 'Estonia',
        name: 'ee'
    },
    {
        entity: 'Egypt',
        name: 'eg'
    },
    {
        entity: 'Western Sahara',
        name: 'eh'
    },
    {
        entity: 'Eritrea',
        name: 'er'
    },
    {
        entity: 'Spain',
        name: 'es'
    },
    {
        entity: 'Ethiopia',
        name: 'et'
    },
    {
        entity: 'European Union',
        name: 'eu'
    },
    {
        entity: 'Finland',
        name: 'fi'
    },
    {
        entity: 'Fiji',
        name: 'fj'
    },
    {
        entity: 'Falkland Islands (United Kingdom)',
        name: 'fk'
    },
    {
        entity: 'Federated States of Micronesia',
        name: 'fm'
    },
    {
        entity: 'Faroe Islands(Kingdom of Denmark)',
        name: 'fo'
    },
    {
        entity: 'France',
        name: 'fr'
    },
    {
        entity: 'Gabon',
        name: 'ga'
    },
    {
        entity: 'Grenada',
        name: 'gd'
    },
    {
        entity: 'Georgia',
        name: 'ge'
    },
    {
        entity: 'French Guiana (France)',
        name: 'gf'
    },
    {
        entity: 'Guernsey (UK)',
        name: 'gg'
    },
    {
        entity: 'Ghana',
        name: 'gh'
    },
    {
        entity: 'Gibraltar (UK)',
        name: 'gi'
    },
    {
        entity: 'Greenland (Kingdom of Denmark)',
        name: 'gl'
    },
    {
        entity: 'The Gambia',
        name: 'gm'
    },
    {
        entity: 'Guinea',
        name: 'gn'
    },
    {
        entity: 'Guadeloupe (France)',
        name: 'gp'
    },
    {
        entity: 'Equatorial Guinea',
        name: 'gq'
    },
    {
        entity: 'Greece',
        name: 'gr'
    },
    {
        entity: 'South Georgia and the South Sandwich Islands (UK)',
        name: 'gs'
    },
    {
        entity: 'Guatemala',
        name: 'gt'
    },
    {
        entity: 'Guam (USA)',
        name: 'gu'
    },
    {
        entity: 'Guinea-Bissau',
        name: 'gw'
    },
    {
        entity: 'Guyana',
        name: 'gy'
    },
    {
        entity: 'Hong Kong',
        name: 'hk'
    },
    {
        entity: 'Heard Island and McDonalds Islands',
        name: 'hm'
    },
    {
        entity: 'Honduras',
        name: 'hn'
    },
    {
        entity: 'Croatia',
        name: 'hr'
    },
    {
        entity: 'Haiti',
        name: 'ht'
    },
    {
        entity: 'Hungary',
        name: 'hu'
    },
    {
        entity: 'Indonesia',
        name: 'id'
    },
    {
        entity: 'Ireland',
        name: 'ie'
    },
    {
        entity: 'Israel',
        name: 'ii'
    },
    {
        entity: 'Isle of Man (UK)',
        name: 'im'
    },
    {
        entity: 'India',
        name: 'in'
    },
    {
        entity: 'British Indian Ocean Territory (UK)',
        name: 'io'
    },
    {
        entity: 'Iraq',
        name: 'iq'
    },
    {
        entity: 'Iran',
        name: 'ir'
    },
    {
        entity: 'Iceland',
        name: 'is'
    },
    {
        entity: 'Italy',
        name: 'it'
    },
    {
        entity: 'Jersey (UK)',
        name: 'je'
    },
    {
        entity: 'Jamaica',
        name: 'jm'
    },
    {
        entity: 'Jordan',
        name: 'jo'
    },
    {
        entity: 'Japan',
        name: 'jp'
    },
    {
        entity: 'Kenya',
        name: 'ke'
    },
    {
        entity: 'Kyrgyztan',
        name: 'kg'
    },
    {
        entity: 'Cambodia',
        name: 'kh'
    },
    {
        entity: 'Kiribati',
        name: 'ki'
    },
    {
        entity: 'Comoros',
        name: 'km'
    },
    {
        entity: 'Saint Kitts and Nevis',
        name: 'kn'
    },
    {
        entity: 'North Korea',
        name: 'kp'
    },
    {
        entity: 'South Korea',
        name: 'kr'
    },
    {
        entity: 'Kuwait',
        name: 'kw'
    },
    {
        entity: 'Cayman Islands (UK)',
        name: 'ky'
    },
    {
        entity: 'Kazakhstan',
        name: 'kz'
    },
    {
        entity: 'Laos',
        name: 'la'
    },
    {
        entity: 'Lebanon',
        name: 'lb'
    },
    {
        entity: 'Saint Lucia',
        name: 'lc'
    },
    {
        entity: 'Liechtenstein',
        name: 'li'
    },
    {
        entity: 'Sri Lanka',
        name: 'lk'
    },
    {
        entity: 'Liberia',
        name: 'lr'
    },
    {
        entity: 'Lesotho',
        name: 'ls'
    },
    {
        entity: 'Lithuania',
        name: 'lt'
    },
    {
        entity: 'Luxmbuorg',
        name: 'lu'
    },
    {
        entity: 'Latvia',
        name: 'lv'
    },
    {
        entity: 'Libya',
        name: 'ly'
    },
    {
        entity: 'Morocco',
        name: 'ma'
    },
    {
        entity: 'Monaco',
        name: 'mc'
    },
    {
        entity: 'Moldova',
        name: 'md'
    },
    {
        entity: 'Montenegro',
        name: 'me'
    },
    {
        entity: 'Madagascar',
        name: 'mg'
    },
    {
        entity: 'Marshall Islands',
        name: 'mh'
    },
    {
        entity: 'North Macedonia',
        name: 'mk'
    },
    {
        entity: 'Mali',
        name: 'ml'
    },
    {
        entity: 'Myanmar',
        name: 'mm'
    },
    {
        entity: 'Mongolia',
        name: 'mn'
    },
    {
        entity: 'Macau',
        name: 'mo'
    },
    {
        entity: 'Northern Mariana Islands (USA)',
        name: 'mp'
    },
    {
        entity: 'Martinique (France)',
        name: 'mq'
    },
    {
        entity: 'Mauritania',
        name: 'mr'
    },
    {
        entity: 'Montserrat (UK)',
        name: 'ms'
    },
    {
        entity: 'Malta',
        name: 'mt'
    },
    {
        entity: 'Mauritius',
        name: 'mu'
    },
    {
        entity: 'Maldives',
        name: 'mv'
    },
    {
        entity: 'Malawi',
        name: 'mw'
    },
    {
        entity: 'Mexico',
        name: 'mx'
    },
    {
        entity: 'Malaysia',
        name: 'my'
    },
    {
        entity: 'Mozambique',
        name: 'mz'
    },
    {
        entity: 'Namibia',
        name: 'na'
    },
    {
        entity: 'New Calcedonia (France)',
        name: 'nc'
    },
    {
        entity: 'Niger',
        name: 'ne'
    },
    {
        entity: 'Norfolk Island',
        name: 'nf'
    },
    {
        entity: 'Nigeria',
        name: 'ng'
    },
    {
        entity: 'Nicaragua',
        name: 'ni'
    },
    {
        entity: 'Netherlands',
        name: 'ni'
    },
    {
        entity: 'Norway',
        name: 'no'
    },
    {
        entity: 'Nepal',
        name: 'np'
    },
    {
        entity: 'Nauru',
        name: 'nr'
    },
    {
        entity: 'Niue',
        name: 'nu'
    },
    {
        entity: 'New Zealand',
        name: 'nz'
    },
    {
        entity: 'Oman',
        name: 'om'
    },
    {
        entity: 'Panama',
        name: 'pa'
    },
    {
        entity: 'Peru',
        name: 'pe'
    },
    {
        entity: 'French Polynesia (France)',
        name: 'pf'
    },
    {
        entity: 'Papua New Guinea',
        name: 'pg'
    },
    {
        entity: 'Philippines',
        name: 'ph'
    },
    {
        entity: 'Pakistan',
        name: 'pk'
    },
    {
        entity: 'Poland',
        name: 'pl'
    },
    {
        entity: 'Saint-Pierre and Miquelon (France)',
        name: 'pm'
    },
    {
        entity: 'Pitcaim Islands (UK)',
        name: 'pn'
    },
    {
        entity: 'Puerto Rico (USA)',
        name: 'pr'
    },
    {
        entity: 'Palestine',
        name: 'ps'
    },
    {
        entity: 'Portugal',
        name: 'pt'
    },
    {
        entity: 'Palau',
        name: 'pw'
    },
    {
        entity: 'Paraguay',
        name: 'py'
    },
    {
        entity: 'Qatar',
        name: 'qa'
    },
    {
        entity: 'Reunion (France)',
        name: 're'
    },
    {
        entity: 'Romania',
        name: 'ro'
    },
    {
        entity: 'Serbia',
        name: 'rs'
    },
    {
        entity: 'Russia',
        name: 'ru'
    },
    {
        entity: 'Rwanda',
        name: 'rw'
    },
    {
        entity: 'Saudi Arabia',
        name: 'sa'
    },
    {
        entity: 'Solomon Islands',
        name: 'sb'
    },
    {
        entity: 'Seychelles',
        name: 'sc'
    },
    {
        entity: 'Sudan',
        name: 'sd'
    },
    {
        entity: 'Singapore',
        name: 'sg'
    },
    {
        entity: 'Saint Helena, Ascension and Tristan da Cunha (UK)',
        name: 'sh'
    },
    {
        entity: 'Slovenia',
        name: 'si'
    },
    {
        entity: 'Slovakia',
        name: 'sk'
    },
    {
        entity: 'Sierra Leone',
        name: 'sl'
    },
    {
        entity: 'San Marino',
        name: 'sm'
    },
    {
        entity: 'Senegal',
        name: 'sn'
    },
    {
        entity: 'Somalia',
        name: 'so'
    },
    {
        entity: 'Suriname',
        name: 'sr'
    },
    {
        entity: 'South Sudan',
        name: 'ss'
    },
    {
        entity: 'Sao Tome and Principe',
        name: 'st'
    },
    {
        entity: 'Soviet Union',
        name: 'su'
    },
    {
        entity: 'El Salvador',
        name: 'sv'
    },
    {
        entity: 'Sint Maarten (Kingdom of the Netherlands)',
        name: 'sx'
    },
    {
        entity: 'Syria',
        name: 'sy'
    },
    {
        entity: 'Eswatini',
        name: 'sz'
    },
    {
        entity: 'Turks and Caicos Islands (UK)',
        name: 'tc'
    },
    {
        entity: 'Chad',
        name: 'td'
    },
    {
        entity: 'French Southern and Antarctic Lands',
        name: 'tf'
    },
    {
        entity: 'Togo',
        name: 'tg'
    },
    {
        entity: 'Thailand',
        name: 'th'
    },
    {
        entity: 'Tajikistan',
        name: 'tj'
    },
    {
        entity: 'Tokelau',
        name: 'tk'
    },
    {
        entity: 'East Timor',
        name: 'tl'
    },
    {
        entity: 'Turkmenistan',
        name: 'tm'
    },
    {
        entity: 'Tunisia',
        name: 'tn'
    },
    {
        entity: 'Tonga',
        name: 'to'
    },
    {
        entity: 'Turkey',
        name: 'tr'
    },
    {
        entity: 'Trinidad and Tobago',
        name: 'tt'
    },
    {
        entity: 'Tuvalu',
        name: 'tv'
    },
    {
        entity: 'Taiwan',
        name: 'tw'
    },
    {
        entity: 'Tanzania',
        name: 'tz'
    },
    {
        entity: 'Ukraine',
        name: 'ua'
    },
    {
        entity: 'Uganda',
        name: 'ug'
    },
    {
        entity: 'United Kingdom',
        name: 'uk'
    },
    {
        entity: 'United States of America',
        name: 'us'
    },
    {
        entity: 'Uruguay',
        name: 'uy'
    },
    {
        entity: 'Uzbekistan',
        name: 'uz'
    },
    {
        entity: 'Vatican City',
        name: 'va'
    },
    {
        entity: 'Saint Vincent and the Grenadines',
        name: 'vc'
    },
    {
        entity: 'Venezuela',
        name: 've'
    },
    {
        entity: 'British Virgin Islands (UK)',
        name: 'vg'
    },
    {
        entity: 'United States Virgin Islands (USA)',
        name: 'vi'
    },
    {
        entity: 'Vietnam',
        name: 'vn'
    },
    {
        entity: 'Vanuatu',
        name: 'vu'
    },
    {
        entity: 'Wallis and Futuna',
        name: 'wf'
    },
    {
        entity: 'Samoa',
        name: 'ws'
    },
    {
        entity: 'Yemen',
        name: 'ye'
    },
    {
        entity: 'Mayotte',
        name: 'yt'
    },
    {
        entity: 'South Africa',
        name: 'za'
    },
    {
        entity: 'Zambia',
        name: 'zm'
    },
    {
        entity: 'Zimbabwe',
        name: 'zw'
    },
]

/**
 * @description Initialization of express
 */
const app = express()

/**
 * @description Initialization for accepting http methods
 */
const server = http.createServer(app)

/**
 * @description Función base para decofidicación de token de acceso
 * @param {*} token
 * @param {*} key
 * @returns
 */
const baseDecodeToken = (token, key) =>
    new Promise((resolve, reject) => {
        try {
            if (!token) {
                throw String('Token id es requerido')
            }


        } catch (error) {
            console.log(`token decode error: ${error}`)
            reject('Token id es requerido')
        }
    })

const decodeUserToken = accessToken =>
    new Promise(async (resolve, reject) => {
        try {
            const decodeToken = await baseDecodeToken(accessToken, JWT_SECRET)
            resolve(decodeToken)
        } catch (error) {
            reject(error)
        }
    })

const decodeAdminToken = accessToken =>
    new Promise(async (resolve, reject) => {
        try {
            const decodeToken = await baseDecodeToken(accessToken, JWT_SECRET_ADMIN)
            resolve(decodeToken)
        } catch (error) {
            reject(error)
        }
    })

const decodeMixedToken = (...decodePromise) =>
    new Promise(async (resolve, reject) => {
        try {
            const promises = decodePromises.map(promise =>
                promise
                    .then(decoded => ({ status: 'resolved', decoded }))
                    .catch(_ => ({ status: 'rejected', decoded: null }))
            )

            const result = await Promise.all(promises)

            const resolvedPromises = result.filter(
                item => item.status === 'resolved'
            )

            if (resolvedPromises.length === 0) {
                throw String('Token mixto inválido')
            }

            resolve(resolvedPromises[0].decoded)
        } catch (error) {
            reject(error)
        }
    })

const encodePassword = (_password, _salt) =>
    cryptoPassword(_password, _salt).toString()

const encodeToNumber = (str = '') =>
    str.replace(/./g, c => ('00' + c.charCodeAt(0)).slice(-3))

const decodeNumber = (str = '') =>
    str.replace(/.{3}/g, c => String.fromCharCode(c))

const morganDeployment = () => {
    if (!PRODUCTION) {
        app.use(morgan('dev'))
    }
}

module.exports = {
    app,
    decodeUserToken,
    decodeAdminToken,
    decodeMixedToken,
    decodeNumber,
    EMAILS,
    encodeToNumber,
    encodePassword,
    generateRandomKey,
    morganDeployment,
    NOW,
    TLDS,
    server,
}

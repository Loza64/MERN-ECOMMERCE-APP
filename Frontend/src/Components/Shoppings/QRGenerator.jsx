import QRCode from 'qrcode.react'
import PropTypes from 'prop-types'

QRGenerator.propTypes = {
    data: PropTypes.string.isRequired
}

export default function QRGenerator({ data }) {
    return <QRCode value={data} />
}
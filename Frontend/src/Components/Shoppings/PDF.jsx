import { Document, Page, View, StyleSheet, Text, Image } from '@react-pdf/renderer'
import PropTypes from 'prop-types'

PDF.propTypes = {
    products: PropTypes.array.isRequired,
    subtotal: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    usuario: PropTypes.string.isRequired,
    factura: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
    Header: {
        backgroundColor: '#010854',
        borderBottom: '3px solid greenyellow',
        width: '100%',
        height: 'auto',
        padding: '10px 10px'
    },
    FlexGap: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '3px',
    },
    Logo: {
        width: '36rem',
        height: '36rem',
        borderRadius: '100%'
    },
    Container: {
        width: '100%',
        height: 'auto',
        display: 'flex',
        margin: '5px 0',
        alignItems: 'center',
        flexDirection: 'column',
    },
    Font: {
        fontSize: '11px',
        margin: '5px 0',
        fontWeight: 'black'
    },
    ContentFactura: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '530rem',
        margin: '27px 0'
    },
    table: {
        width: '100%',
        maxWidth: '570rem',
        borderRadius: '5px',
        overflow: 'hidden'
    },
    thead: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#010854',
        borderBottom: '2.5px solid greenyellow',
        color: 'white',
        fontWeight: 'bold',
        padding: '6.5px 0',
        fontSize: '12px',
    },
    tbody: {
        width: '100%',
        backgroundColor: 'white',
        color: 'black',
        fontSize: '9.5px',
    },
    tr: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: 'black',
        margin: '0px',
        padding: '6px 0',
        fontWeight: 'demibold',
    },
    td_md_300_left: {
        width: '340%',
        textAlign: 'left',
        margin: '0px',
        padding: '0px 4px'
    },
    td_center: {
        width: '100%',
        textAlign: 'center',
        margin: '0px',
        padding: '0px 4px'
    },
    SubTotalContent: {
        width: '100%',
        maxWidth: '570rem',
        margin: '15px 0'
    },
    Footer: {
        textAlign: 'center',
        color: 'blue',
        margin: '22px 0'
    }
});

export default function PDF({ products, subtotal, total, usuario, factura, date }) {
    return (
        <Document>
            <Page>
                <View style={styles.Header}>
                    <View style={styles.FlexGap}>
                        <Image style={styles.Logo} src={"https://res.cloudinary.com/ufostart-development/image/upload/v1703298450/ECOMMERCE/u2xrv5s6jojcpda1wkub.png"} />
                        <Text style={{ color: 'white' }}>Ecommerce</Text>
                    </View>
                </View>
                <View style={styles.Container}>{/*Body*/}
                    <View style={styles.ContentFactura}>
                        <View>
                            <View style={{ ...styles.FlexGap, ...styles.Font }}>
                                <Text>Vendido a:</Text>
                                <Text style={{ color: '#9D9D9D' }}>{usuario}</Text>
                            </View>
                            <View style={{ ...styles.FlexGap, ...styles.Font }}>
                                <Text>Metodo de pago:</Text>
                                <Text style={{ color: '#9D9D9D' }}>Transferencia bancaria</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{ textAlign: 'center', backgroundColor: '#010854', padding: '4px 8px', color: 'white', fontSize: '12px', overflow: 'hidden', borderRadius: '3px' }}>
                                <Text>Recibo de compra</Text>
                            </View>
                            <View style={{ ...styles.FlexGap, ...styles.Font, padding: '4px 8px' }}>
                                <Text>Fecha:</Text>
                                <Text style={{ color: '#9D9D9D' }}>{date}</Text>
                            </View>
                            <View style={{ ...styles.FlexGap, ...styles.Font, padding: '4px 8px' }}>
                                <Text>Codigo de factura:</Text>
                                <Text style={{ color: '#9D9D9D' }}>{factura}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.thead}>
                            <View style={styles.td_md_300_left}>
                                <Text>Producto</Text>
                            </View>
                            <View style={styles.td_center}>
                                <Text>Precio</Text>
                            </View>
                            <View style={styles.td_center}>
                                <Text>Cantidad</Text>
                            </View>
                            <View style={styles.td_center}>
                                <Text>SubTotal</Text>
                            </View>
                            <View style={styles.td_center}>
                                <Text>Descuento</Text>
                            </View>
                        </View>
                        <View style={styles.tbody}>
                            {
                                products.map(
                                    ({ name, price, discount, quantity }, index) => (
                                        <View style={{ ...styles.tr, backgroundColor: (index + 1) % 2 ? '#E6E6E6' : 'white' }} key={index}>
                                            <View style={styles.td_md_300_left}>
                                                <Text>{name}</Text>
                                            </View>
                                            <View style={styles.td_center}>
                                                <Text>${price}</Text>
                                            </View>
                                            <View style={styles.td_center}>
                                                <Text>{quantity}</Text>
                                            </View>
                                            <View style={styles.td_center}>
                                                <Text>${(quantity * price - (quantity * price) * discount).toFixed(2)}</Text>
                                            </View>
                                            <View style={styles.td_center}>
                                                <Text>{Math.round(discount * 100)}%</Text>
                                            </View>
                                        </View>
                                    )
                                )
                            }
                        </View>
                    </View>
                    <View style={styles.SubTotalContent}>
                        <View style={{ ...styles.FlexGap, ...styles.Font, padding: '2px 8px', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: '13px' }}>SubTotal:</Text>
                            <Text style={{ color: 'green' }}>${subtotal}</Text>
                        </View>
                        <View style={{ ...styles.FlexGap, ...styles.Font, padding: '2px 8px', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: '13px' }}>Impuesto:</Text>
                            <Text style={{ color: 'green' }}>${(total - subtotal).toFixed(2)}</Text>
                        </View>
                        <View style={{ ...styles.FlexGap, ...styles.Font, padding: '2px 8px', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: '13px' }}>Total:</Text>
                            <Text style={{ color: 'green' }}>${total}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.Footer}>{/*Footer*/}
                    <Text>Gracias por su compra</Text>
                </View>
            </Page>
        </Document>
    )
}
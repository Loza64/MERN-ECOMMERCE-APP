import { Document, Page, View, StyleSheet, Text } from '@react-pdf/renderer'
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
    page: {
        backgroundColor: 'white',
        width: '100%'
    },
    Container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        margin: '4px 0',
        alignItems: 'center',
        flexDirection: 'column',
    },
    TotalWidth: {
        width: '100%',
        maxWidth: '585rem'
    },
    table: {
        width: '100%'
    },
    thead: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'blue',
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
    td_md_200_left: {
        width: '270%',
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
    flexSpace: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    flexText: {
        display: 'flex',
        flexDirection: 'row',
        width: 'auto',
        margin: '4px 4px'
    },
    ContentTotals: {
        color: 'green',
        borderBottom: '1.5px solid green',
        margin: '10px 0px'
    },
    Grey: {
        color: '#A6ACAF',
        margin: '0 3px'
    },
    infoFactura: {
        fontSize: '10px',
        border: '1px solid blue',
    },
    header: {
        backgroundColor: 'blue',
        padding: '7px 0',
        color: 'white',
        textAlign: 'center',
        fontSize: '13px',
        marginBottom: '10px'
    },
    footer: {
        backgroundColor: 'black',
        padding: '7px 0',
        color: 'white',
        textAlign: 'center',
        fontSize: '13px',
        position: 'absolute',
        bottom: 4.5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default function PDF({ products, subtotal, total, usuario, factura, date }) {
    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.Container}>
                    <View style={{ ...styles.TotalWidth, ...styles.header }}> {/*Head*/}
                        <Text>Factura</Text>
                    </View>
                    <View style={styles.TotalWidth}>{/*Body*/}
                        <View style={styles.TotalWidth}> {/*Info Factura*/}
                            <View style={{ ...styles.flexSpace, margin: '10px 0' }}>
                                <View>
                                    <Text>Ecommerce</Text>
                                </View>
                                <View style={styles.infoFactura}>
                                    <View style={{ color: 'white', backgroundColor: 'blue', padding: '5px' }}>
                                        <Text>Datos de factura</Text>
                                    </View>
                                    <View style={styles.flexText}>
                                        <Text>Usuario:</Text>
                                        <Text style={styles.Grey}>{usuario}</Text>
                                    </View>
                                    <View style={styles.flexText}>
                                        <Text>Codigo de factura:</Text>
                                        <Text style={styles.Grey}>{factura}</Text>
                                    </View>
                                    <View style={styles.flexText}>
                                        <Text>Fecha de compra:</Text>
                                        <Text style={styles.Grey}>{date}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ ...styles.TotalWidth, margin: '10px 0' }}> {/*Details Factura*/}
                            <View style={styles.table}>
                                <View style={styles.thead}>
                                    <View style={styles.td_md_200_left}>
                                        <Text>Producto</Text>
                                    </View>
                                    <View style={styles.td_center}>
                                        <Text>Precio</Text>
                                    </View>
                                    <View style={styles.td_center}>
                                        <Text>Cantidad</Text>
                                    </View>
                                    <View style={styles.td_center}>
                                        <Text>Descuento</Text>
                                    </View>
                                </View>
                                <View style={styles.tbody}>
                                    {
                                        products.map(
                                            ({ name, price, discount, quantity }, index) => (
                                                <View style={{ ...styles.tr, backgroundColor: (index + 1) % 2 ? '#D5DBDB' : 'white' }} key={index}>
                                                    <View style={styles.td_md_200_left}>
                                                        <Text>{name}</Text>
                                                    </View>
                                                    <View style={styles.td_center}>
                                                        <Text>${price}</Text>
                                                    </View>
                                                    <View style={styles.td_center}>
                                                        <Text>{quantity}</Text>
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
                        </View>
                        <View style={{ ...styles.TotalWidth, ...styles.ContentTotals }}> {/*Totals Factura*/}
                            <View style={{ ...styles.flexSpace, marginBottom: '10px' }}>
                                <View>
                                    <Text>Subtotal:</Text>
                                </View>
                                <View>
                                    <Text>${subtotal}</Text>
                                </View>
                            </View>
                            <View style={styles.flexSpace}>
                                <View>
                                    <Text>Total:</Text>
                                </View>
                                <View>
                                    <Text>${total}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ ...styles.TotalWidth, ...styles.footer }}> {/*Footer*/}
                        <Text>Made by ufostart</Text><Text style={{ color: 'red', marginLeft: '4px' }}>development</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}
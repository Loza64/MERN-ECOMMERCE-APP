/* eslint-disable react/prop-types */
import { Document, Page, View, StyleSheet, Text } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    page: {
        backgroundColor: 'white',
        width: '100%'
    },
    center: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    table: {
        width: '100%',
        maxWidth: '500rem'
    },
    thead: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'blue',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '12px'
    },
    tbody: {
        width: '100%',
        backgroundColor: 'white',
        color: 'black',
        fontSize: '10px',
    },
    td: {
        width: '100%',
        textAlign: 'center',
        margin: '0px',
        padding: '5px 0'
    },
    tr: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: 'black',
        margin: '0px',
        fontWeight: 'demibold',
    },
    flexSpace: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        margin: '10px 0px',
        color: 'green'
    },
    totalsContainer: {
        width: '100%',
        maxWidth: '500rem',
        borderBottom: '1px solid green'
    }
});

export default function PDF({ products, subtotal, total, usuario, factura, date }) {
    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.center}>
                    <View style={styles.table}>
                        <View style={styles.thead}>
                            <View style={styles.td}>
                                <Text>Item</Text>
                            </View>
                            <View style={styles.td}>
                                <Text>Producto</Text>
                            </View>
                            <View style={styles.td}>
                                <Text>Precio</Text>
                            </View>
                            <View style={styles.td}>
                                <Text>Cantidad</Text>
                            </View>
                            <View style={styles.td}>
                                <Text>Descuento</Text>
                            </View>
                        </View>
                        <View style={styles.tbody}>
                            {
                                products.map(
                                    ({ name, price, discount, quantity }, index) => (
                                        <View style={styles.tr} key={index}>
                                            <View style={styles.td}>
                                                <Text>{index + 1}</Text>
                                            </View>
                                            <View style={styles.td}>
                                                <Text>{name}</Text>
                                            </View>
                                            <View style={styles.td}>
                                                <Text>${price}</Text>
                                            </View>
                                            <View style={styles.td}>
                                                <Text>{quantity}</Text>
                                            </View>
                                            <View style={styles.td}>
                                                <Text>{Math.round(discount * 100)}%</Text>
                                            </View>
                                        </View>
                                    )
                                )
                            }
                        </View>
                    </View>
                    <View style={styles.totalsContainer}>
                        <View style={styles.flexSpace}>
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
            </Page>
        </Document>
    )
}
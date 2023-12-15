import { ContextProvider } from '../Context/ContextConsumer';
export default function Pago() {

  const { clearCart, SubTotal, Tax, Total } = ContextProvider();
  return (
    <div className='pay-container'>
      <label className='subtotal'>SubTotal</label>
      <label className='subtotalmoney'>${SubTotal}</label>
      <label className='task'>Tax</label>
      <label className='taskmoney'>${Tax}</label>
      <label className='pay'>Total</label>
      <label className='paymoney'>${Total}</label>
      <button className='buttom-clear' onClick={() => { clearCart() }}>Clear my cart</button>
      <button className='buttom-pay'>Proceed to Checkout</button>
    </div>
  );
}
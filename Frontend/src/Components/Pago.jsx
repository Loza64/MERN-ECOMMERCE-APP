import { React } from 'react';

export default function Pago() {
  return (
    <div className='pay-container'>
      <label className='subtotal'>SubTotal</label>
      <label className='subtotalmoney'>$1223</label>
      <label className='task'>Task</label>
      <label className='taskmoney'>$1223</label>
      <label className='pay'>Total</label>
      <label className='paymoney'>$1223</label>
      <button className='buttom-clear'>Clear my cart</button>
      <button className='buttom-pay'>Proceed to payment</button>
    </div>
  );
}
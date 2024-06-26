import React from 'react'
import MetaTags from '../components/MetaTags'
import BreadCrumb from '../components/BreadCrumb'
import Watch from '../images/watch.jpg'
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import Container from '../components/Container';

const Cart = () => {
    return (
        <div>
            <MetaTags title="Cart" />
            <BreadCrumb title="Cart" />
            <Container class1='cart-wrapper home-wrapper-2 py-5'>
                <div className="row">
                    <div className="col-12">
                        <div className="cart-header d-flex justify-content-between align-items-center py-3">
                            <h4 className='cart-col-1'>Product</h4>
                            <h4 className='cart-col-2'>Price</h4>
                            <h4 className='cart-col-3'>Quantity</h4>
                            <h4 className='cart-col-4'>Total</h4>
                        </div>
                        <div className="cart-data d-flex justify-content-between align-items-center py-3 mb-2">
                            <div className='cart-col-1 d-flex align-items-center gap-15'>
                                <div className='w-25'>
                                    <img src={Watch} alt="Product" className='img-fluid' />
                                </div>
                                <div className='w-75'>
                                    <p>Watch 6</p>
                                    <p>Size : XL</p>
                                    <p>Color: Red</p>
                                </div>
                            </div>
                            <div className='cart-col-2'>
                                <h5 className="price">$399</h5>
                            </div>
                            <div className='cart-col-3 d-flex align-items-center gap-15'>
                                <div>
                                    <input type="number" className='form-control' min={1} max={10} defaultValue={1} />
                                </div>
                                <div>
                                    <MdDelete className='text-danger fs-4' />
                                </div>
                            </div>
                            <div className='cart-col-4'>
                                <h5 className="price">$399</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 py-2 mt-4">
                        <div className="d-flex justify-content-between align-items-baseline">
                            <Link to='/store' className='button'>Continue Shopping</Link>
                            <div className='d-flex flex-column align-items-end'>
                                <h4>Subtotal: $399</h4>
                                <p>Taxes and shipping calculated at checkout</p>
                                <Link to='/checkout' className='button'>Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Cart

import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from 'react-router-dom';
import Wish from '../images/wish.svg'
import Watch from '../images/watch.jpg'
import Watch2 from '../images/watch2.avif'
import ProdCompare from '../images/prodcompare.svg'
import View from '../images/view.svg'
import AddToCart from '../images/add-cart.svg'

const ProductCard = (props) => {

    let location = useLocation()
    const { grid } = props

    return (
        <>
            <div className={`${location.pathname === "/store" ? `gr-${grid}` : "col-3"}`}>
                <Link to='/product/:id' className="product-card position-relative">
                    <div className="wishlist-icon position-absolute">
                        <button className='border-0 bg-transparent'>
                            <img src={Wish} alt="wishlist" />
                        </button>
                    </div>
                    <div className="product-image">
                        <img src={Watch} className='img-fluid' alt="product" />
                        <img src={Watch2} className='img-fluid' alt="product" />
                    </div>
                    <div className="product-details">
                        <h6 className="brand">
                            Havells
                        </h6>
                        <h5 className="product-title">
                            Kids headphone bulk 10 pack mutli colored for students
                        </h5>
                        <ReactStars count={5} size={24} value={3} edit={false} activeColor="#ffd700" />
                        <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
                            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt...
                        </p>
                        <p className="price">
                            $100.00
                        </p>
                    </div>
                    <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                            <button className='border-0 bg-transparent'>
                                <img src={ProdCompare} alt="compare" />
                            </button>
                            <button className='border-0 bg-transparent'>
                                <img src={View} alt="view" />
                            </button>
                            <button className='border-0 bg-transparent'>
                                <img src={AddToCart} alt="add-to-cart" />
                            </button>
                        </div>
                    </div>
                </Link>
            </div>
            {/* <div className={`${location.pathname === "/store" ? `gr-${grid}` : "col-3"}`}>
                <Link to='/product/:id' className="product-card position-relative">
                    <div className="wishlist-icon position-absolute">
                        <button className='border-0 bg-transparent'>
                            <img src={Wish} alt="wishlist" />
                        </button>
                    </div>
                    <div className="product-image">
                        <img src={Watch} className='img-fluid' alt="product" />
                        <img src={Watch2} className='img-fluid' alt="product" />
                    </div>
                    <div className="product-details">
                        <h6 className="brand">
                            Havells
                        </h6>
                        <h5 className="product-title">
                            Kids headphone bulk 10 pack mutli colored for students
                        </h5>
                        <ReactStars count={5} size={24} value={3} edit={false} activeColor="#ffd700" />
                        <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
                            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt...
                        </p>
                        <p className="price">
                            $100.00
                        </p>
                    </div>
                    <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                            <button className='border-0 bg-transparent'>
                                <img src={ProdCompare} alt="compare" />
                            </button>
                            <button className='border-0 bg-transparent'>
                                <img src={View} alt="view" />
                            </button>
                            <button className='border-0 bg-transparent'>
                                <img src={AddToCart} alt="add-to-cart" />
                            </button>
                        </div>
                    </div>
                </Link>
            </div> */}
        </>
    )
}

export default ProductCard

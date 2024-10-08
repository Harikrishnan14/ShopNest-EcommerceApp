import React, { useEffect, useState } from 'react'
import MetaTags from '../components/MetaTags'
import BreadCrumb from '../components/BreadCrumb'
import ProductCard from '../components/ProductCard';
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from 'react-image-zoom';
import Color from '../components/Color'
import { IoShuffle } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosLink } from "react-icons/io";
import Container from '../components/Container';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAProduct } from '../features/products/productsSlice';
import { addProdToCart, getUserCart } from '../features/user/userSlice';
import { toast } from "react-toastify";

const SingleProduct = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [orderedProduct, setOrderedProduct] = useState(true);
    const [color, setColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [alreadyInCart, setAlreadyInCart] = useState(false);

    const productId = location.pathname.split('/')[2]

    useEffect(() => {
        dispatch(getAProduct(productId))
        dispatch(getUserCart())
    }, [])

    const productState = useSelector((state) => state.product.product)
    const cartState = useSelector((state) => state.auth.userCart)

    const props = {
        width: 400,
        height: 600,
        zoomWidth: 600,
        img: productState?.images[0]?.url ? productState?.images[0]?.url : "https://media.wired.com/photos/6511aab1189c419c40374c92/1:1/w_1358,h_1358,c_limit/Apple-Watch-Ultra-2-Alt-Gear.jpg"
    };

    const copyToClipboard = (text) => {
        console.log('text', text)
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }

    const addToCart = () => {
        if (color === null) {
            toast.error("Please choose a color")
        } else {
            dispatch(addProdToCart({
                productID: productState?._id,
                quantity: Number(quantity),
                color: color,
                price: productState?.price
            }))
            navigate('/cart')
        }
    }

    useEffect(() => {
        for (let index = 0; index < cartState?.length; index++) {
            if (productId === cartState[index]?.productID?._id) {
                setAlreadyInCart(true)
            }
        }
    }, [])

    return (
        <div>
            <MetaTags title="Product Name" />
            <BreadCrumb title="Product Name" />
            <Container class1='main-product-wrapper home-wrapper-2 py-5'>
                <div className="row main-product-inner-wrapper">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div>
                                <ReactImageZoom {...props} />
                            </div>
                        </div>
                        <div className="other-product-images d-flex justify-content-between flex-wrap gap-15 py-4">
                            {productState?.images.map((item, index) => (
                                <div>
                                    <img src={item?.url} alt="" className='img-fluid' />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main-product-details">
                            <div className='border-bottom'>
                                <h3 className='title'>{productState?.title}</h3>
                            </div>
                            <div className="border-bottom py-3">
                                <p className="price">${productState?.price}</p>
                                <div className='d-flex align-items-center gap-10'>
                                    <ReactStars count={5} size={24} value={Number(productState?.totalrating)} edit={false} activeColor="#ffd700" />
                                    <p className='mb-0 t-review'>(2 reviews)</p>
                                </div>
                                <a className='review-btn' href="#review">Write a Review</a>
                            </div>
                            <div className="border-bottom py-3">
                                <div className="d-flex align-items-center gap-10 my-2">
                                    <h3 className='product-heading'>Type :</h3>
                                    <p className='product-data'>Watch</p>
                                </div>
                                <div className="d-flex align-items-center gap-10 my-2">
                                    <h3 className='product-heading'>Brand :</h3>
                                    <p className='product-data'>{productState?.brand}</p>
                                </div>
                                <div className="d-flex align-items-center gap-10 my-2">
                                    <h3 className='product-heading'>Categories :</h3>
                                    <p className='product-data'>{productState?.category}</p>
                                </div>
                                <div className="d-flex align-items-center gap-10 my-2">
                                    <h3 className='product-heading'>Tags :</h3>
                                    <p className='product-data'>{productState?.tags}</p>
                                </div>
                                <div className="d-flex align-items-center gap-10 my-2">
                                    <h3 className='product-heading'>Availability :</h3>
                                    <p className='product-data'>In Stock</p>
                                </div>
                                <div className="d-flex flex-column gap-10 mt-2 mb-3">
                                    <h3 className='product-heading'>Size :</h3>
                                    <div className="d-flex flex-wrap gap-10">
                                        <span className="badge border border-1 bg-white text-dark border-secondary">S</span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">M</span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">L</span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">XL</span>
                                        <span className="badge border border-1 bg-white text-dark border-secondary">XXL</span>
                                    </div>
                                </div>
                                {alreadyInCart === false && <>
                                    <div className="d-flex flex-column gap-10 mt-2 mb-3">
                                        <h3 className='product-heading'>Color :</h3>
                                        <Color colorData={productState?.color} setColor={setColor} />
                                    </div>
                                </>}
                                <div className="d-flex align-items-center flex-row gap-15 mt-2 mb-3">
                                    {alreadyInCart === false && <>
                                        <h3 className='product-heading'>Quantity :</h3>
                                        <div className=''>
                                            <input type="number" value={quantity} min={1} max={10} style={{ width: "70px" }} className='form-control' onChange={(e) => setQuantity(e.target.value)} />
                                        </div>
                                    </>}
                                    <div className={`${alreadyInCart ? "ms-0" : "ms-5"} d-flex align-items-center gap-30`}>
                                        <button className='button border-0' onClick={() => { alreadyInCart ? navigate('/cart') : addToCart() }}>
                                            {alreadyInCart ? "Go to Cart" : "Add to Cart"}
                                        </button>
                                        {!alreadyInCart && <button className='button signup border-0'>Buy Now</button>}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-30 pb-3">
                                    <div>
                                        <a href=""><IoShuffle className='fs-5 me-2' /> Add to Compare</a>
                                    </div>
                                    <div>
                                        <a href=""><AiOutlineHeart className='fs-5 me-2' /> Add to Wishlist</a>
                                    </div>
                                </div>
                                <div className="d-flex flex-column gap-10 mt-5 mb-3">
                                    <h3 className='product-heading'>Shipping & Returns :</h3>
                                    <p className='product-data'>Free shipping and returns available on all orders! <br />
                                        We ship all US domestic orders within <br /> 5-10 business days!</p>
                                </div>
                                <div className="d-flex align-items-center gap-15 my-3">
                                    <a href="javascript:void(0)" onClick={() => copyToClipboard(window.location.href)} style={{ backgroundColor: "#c6c6c6", color: "white", padding: "8px", borderRadius: "10px" }} >
                                        <IoIosLink className='fs-6 me-1' />Copy Link
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1='description-wrapper home-wrapper-2 py-5'>
                <div className="row">
                    <div className="col-12">
                        <h4>Description</h4>
                        <div className="description-inner-wrapper">
                            <p className='mb-0' dangerouslySetInnerHTML={{ __html: productState?.description }}></p>
                        </div>
                    </div>
                </div>
            </Container >
            <Container id='review' class1='reviews-wrapper home-wrapper-2'>
                <div className="row">
                    <div className="col-12">
                        <h3>Reviews</h3>
                        <div className="review-inner-wrapper">
                            <div className="review-head d-flex justify-content-between align-items-end">
                                <div>
                                    <h4 className='mb-2'>Customer Reviews</h4>
                                    <div className='d-flex align-items-center gap-10'>
                                        <ReactStars count={5} size={24} value={3} edit={false} activeColor="#ffd700" />
                                        <p className='mb-0'>Based on 2 reviews</p>
                                    </div>
                                </div>
                                {orderedProduct && <div>
                                    <a className='text-dark text-decoration-underline' href="">Write a Review</a>
                                </div>}
                            </div>
                            <div className="review-form py-4">
                                <h4>Write A Review</h4>
                                <form action="" className='d-flex flex-column gap-15'>
                                    <div>
                                        <ReactStars count={5} size={24} value={0} edit={true} activeColor="#ffd700" />
                                    </div>
                                    <div>
                                        <textarea name="" id="" className='w-100 form-control' cols="30" rows="5" placeholder='Write your comments here' style={{ resize: "none" }}></textarea>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button className='button border-0 mt-3'>Submit Review</button>
                                    </div>
                                </form>
                            </div>
                            <div className="reviews mt-4">
                                <div className="review mt-3">
                                    <div className='d-flex align-items-center gap-10'>
                                        <h6 className='mb-0'>Sandeep</h6>
                                        <ReactStars count={5} size={24} value={4} edit={false} activeColor="#ffd700" />
                                    </div>
                                    <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto consequuntur alias doloremque harum suscipit quos illo doloribus rerum, fugiat ipsa reprehenderit pariatur repellendus. Sed dolore ab animi omnis, excepturi necessitatibus!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1='popular-wrapper home-wrapper-2 py-5'>
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">
                            Our Popular Products
                        </h3>
                    </div>
                </div>
                <div className="row">
                    <ProductCard />
                </div>
            </Container>
        </div >
    )
}

export default SingleProduct

import React from 'react'
import MetaTags from '../components/MetaTags'
import BreadCrumb from '../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs";
import Blog1 from '../images/blog-1.jpg'
import Container from '../components/Container';

const SingleBlog = () => {
    return (
        <div>
            <MetaTags title="Blog" />
            <BreadCrumb title="Blog" />
            <Container class1='blog-wrapper home-wrapper-2 py-5'>
                <div className="row">
                    <div className="col-12">
                        <div className="single-blog-card">
                            <Link to='/blogs' className='d-flex align-items-center gap-10'>
                                <BsArrowLeft className='fs-5' />
                                Back to Blogs
                            </Link>
                            <h3 className="title">A Beautiful Sunday Morning Renaissance</h3>
                            <img src={Blog1} className='img-fluid w-100 my-4' alt="Blog" />
                            <p>You’re only as good as your last collection, which is an enormous pressure. I think there is something about luxury – it’s not something people need, but it’s what they want. It really pulls at their heart. I have a fantastic relationship with money.Scelerisque sociosqu ullamcorper urna nisl mollis vestibulum pretium commodo inceptos cum condimentum placerat diam venenatis blandit hac eget dis lacus a parturient a accumsan nisl ante vestibulum.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default SingleBlog

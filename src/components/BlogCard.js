import React from 'react'
import { Link } from 'react-router-dom'
import Blog1 from '../images/blog-1.jpg'

const BlogCard = () => {
    return (
        <div className="blog-card">
            <div className="card-image">
                <img className='img-fluid w-100' src={Blog1} alt="blog" />
            </div>
            <div className="blog-content">
                <p className='date'>11 June, 2024</p>
                <h5 className="title">A Beautiful Sunday Morning Renaissance</h5>
                <p className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe beatae non quasi est ratione, minima sit iste</p>
                <Link className='button' to='/blog/:id'>Read More</Link>
            </div>
        </div>
    )
}

export default BlogCard

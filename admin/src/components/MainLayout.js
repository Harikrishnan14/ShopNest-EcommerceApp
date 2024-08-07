import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import {
    AiOutlineBook,
    AiOutlineDashboard,
    AiOutlineShoppingCart,
    AiOutlineUnorderedList,
    AiOutlineUser,
    AiOutlineBgColors,
    AiOutlinePlusCircle,
    AiOutlinePlusSquare,
    AiOutlineQuestionCircle,
    AiOutlineBell
} from "react-icons/ai";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { LuClipboardCheck } from "react-icons/lu";
import { RiBloggerLine, RiCouponLine } from "react-icons/ri";
import { GoGraph } from "react-icons/go";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { Header, Sider, Content } = Layout;


const MainLayout = () => {

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate()

    return (
        // <Layout onContextMenu={(e) => e.preventDefault()}>
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <h2 className='text-white fs-5 text-center py-3 mb-0'>
                        <span className='sm-logo'>SN</span>
                        <span className='lg-logo'>ShopNest</span>
                    </h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    onClick={({ key }) => {
                        if (key === 'signout') {
                        } else {
                            navigate(key)
                        }
                    }}
                    items={[
                        {
                            key: '',
                            icon: <AiOutlineDashboard className='fs-5' />,
                            label: 'Dashboard',
                        },
                        {
                            key: 'customers',
                            icon: <AiOutlineUser className='fs-5' />,
                            label: 'Customers',
                        },
                        {
                            key: 'catalog',
                            icon: <AiOutlineBook className='fs-5' />,
                            label: 'Catalog',
                            children: [
                                {
                                    key: 'product',
                                    icon: <AiOutlineShoppingCart className='fs-5' />,
                                    label: 'Add Product',
                                },
                                {
                                    key: 'product-list',
                                    icon: <AiOutlineUnorderedList className='fs-5' />,
                                    label: 'Product List',
                                },
                                {
                                    key: 'brand',
                                    icon: <SiBrandfolder className='fs-5' />,
                                    label: 'Add Brand',
                                },
                                {
                                    key: 'brand-list',
                                    icon: <AiOutlineUnorderedList className='fs-5' />,
                                    label: 'Brand List',
                                },
                                {
                                    key: 'category',
                                    icon: <BiCategoryAlt className='fs-5' />,
                                    label: 'Add Category',
                                },
                                {
                                    key: 'category-list',
                                    icon: <AiOutlineUnorderedList className='fs-5' />,
                                    label: 'Category List',
                                },
                                {
                                    key: 'color',
                                    icon: <AiOutlineBgColors className='fs-5' />,
                                    label: 'Add Color',
                                },
                                {
                                    key: 'color-list',
                                    icon: <AiOutlineUnorderedList className='fs-5' />,
                                    label: 'Color List',
                                },
                            ]
                        },
                        {
                            key: 'orders',
                            icon: <LuClipboardCheck className='fs-5' />,
                            label: 'Orders',
                        },
                        {
                            key: 'Marketing',
                            icon: <GoGraph className='fs-5' />,
                            label: 'Marketing',
                            children: [
                                {
                                    key: 'coupon',
                                    // icon: <AiOutlinePlusCircle className='fs-5' />,
                                    icon: <RiCouponLine className='fs-5' />,
                                    label: 'Add Coupon'
                                },
                                {
                                    key: 'coupon-list',
                                    icon: <AiOutlineUnorderedList className='fs-5' />,
                                    label: 'Coupon List'
                                },
                            ]
                        },
                        {
                            key: 'blogs',
                            icon: <RiBloggerLine className='fs-5' />,
                            label: 'Blogs',
                            children: [
                                {
                                    key: 'blog',
                                    icon: <AiOutlinePlusCircle className='fs-5' />,
                                    label: 'Add Blog'
                                },
                                {
                                    key: 'blog-list',
                                    icon: <AiOutlineUnorderedList className='fs-5' />,
                                    label: 'Blog List'
                                },
                                {
                                    key: 'blog-category',
                                    icon: <AiOutlinePlusSquare className='fs-5' />,
                                    label: 'Add Blog Category'
                                },
                                {
                                    key: 'blog-category-list',
                                    icon: <AiOutlineUnorderedList className='fs-5' />,
                                    label: 'Blog Category List'
                                },
                            ]
                        },
                        {
                            key: 'enquiries',
                            icon: <AiOutlineQuestionCircle className='fs-5' />,
                            label: 'Enquiries',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    className='d-flex justify-content-between ps-1 pe-5'
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className='d-flex gap-4 align-items-center'>
                        <div className='position-relative'>
                            <AiOutlineBell className='fs-4' />
                            <span className='badge bg-warning rounded-circle p-1 position-absolute'>3</span>
                        </div>
                        <div className='d-flex gap-3 align-items-center dropdown'>
                            <div>
                                <img width={35} height={35} src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg" alt="UserProfile" />
                            </div>
                            <div role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                <h5 className='mb-0'>Username</h5>
                                <p className='mb-0'>test@gmail.com</p>
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li>
                                    <Link className="dropdown-item py-1 mb-1" style={{ height: "auto", lineHeight: "20px" }} to="/">View Profile</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item py-1 mb-1" style={{ height: "auto", lineHeight: "20px" }} to="/">Signout</Link>
                                </li>
                            </div>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar={true}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        theme="light"
                    />
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;





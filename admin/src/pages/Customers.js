import { Table } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/customers/customerSlice';

const Customers = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, []);

    const customerState = useSelector((state) => state.customer.customers)

    const columns = [
        {
            title: 'No.',
            dataIndex: 'key',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
        },
    ];

    const data1 = [];
    for (let i = 0; i < customerState.length; i++) {
        if (customerState[i].role !== 'admin') {
            data1.push({
                key: i,
                name: customerState[i].firstname + " " + customerState[i].lastname,
                email: customerState[i].email,
                mobile: customerState[i].mobile,
            });
        }
    }

    return (
        <div>
            <h3 className='mb-4 title'>Customers</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Customers

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/shared/Spinner';
import Layout from '../components/shared/Layout/Layout';
import Modal from '../components/shared/modal/Modal';
import API from '../services/api';
import moment from 'moment';
import '../index.css';

const HomePage = () => {
    const { loading, error, user } = useSelector((state) => state.auth);
    // console.log(loading, error, user);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const getBloodRecords = async () => {
        try {
            const { data } = await API.get('/inventory/get-inventory');
            console.log("transaction ", data.inventory);
            if (data?.success) {
                setData(data?.inventory);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBloodRecords();
    }, []);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.filter((record) =>
        record.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            {user?.role === "admin" && navigate('/admin')}
            {error && <span>{alert(error)}</span>}
            {loading ? (
                <Spinner />
            ) : (
                <div style={{ marginLeft: "10px", marginRight: "40px" }}>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h4
                            className='ms-0'
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            style={{ cursor: "pointer", fontWeight: "bold", marginBottom: 0 }}
                        >
                            <i className='fa-solid fa-plus text-success py-4'></i>
                            Add Inventory
                        </h4>
                        <div className="mb-3" style={{ paddingRight: "40px", marginTop: "20px" }}>
                            <label htmlFor="search" className="form-label" style={{ fontWeight: "bold" }}>
                                Search Donor:
                            </label>
                            <input
                                type="text"
                                id="search"
                                className="form-control"
                                value={searchTerm}
                                onChange={handleSearchTermChange}
                                placeholder="Enter donor email..."
                            />
                        </div>
                    </div>

                    <table className="table table-info table-striped tableClass">
                        <thead>
                            <tr className="table-warning" style={{ border: "1px solid gray" }}>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Blood Group</th>
                                <th scope="col">Inventory Type</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Time & Date</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((record) => (
                                <tr key={record._id}>
                                    <td>
                                        {record.inventoryType === "out" ? record.hospital.hospitalName : record.donar.name}
                                    </td>
                                    <td>{record.email}</td>
                                    <td>{record.bloodGroup}</td>
                                    <td>{record.inventoryType}</td>
                                    <td>{record.quantity} (ML)</td>
                                    <td>
                                        {moment(record.createdAt).format("DD/MM/YYYY hh:mm:ss A")}
                                    </td>
                                    <td>{record.action}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Modal />
                </div>
            )}
        </Layout>
    );
};

export default HomePage;

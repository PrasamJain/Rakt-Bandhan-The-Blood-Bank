import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/shared/Spinner';
import Layout from '../../components/shared/Layout/Layout';
import Modal from '../../components/shared/modal/Modal';
import API from '../../services/api';
import moment from 'moment';
import '../../index.css';

const Transaction = () => {
    const { loading, error, user } = useSelector((state) => state.auth);
    // console.log(loading, error, user);
    const [data, setData] = useState([]);
    // const [searchTerm, setSearchTerm] = useState('');
    const [organisations, setOrganisations] = useState([]);
    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [selectedInventoryType, setSelectedInventoryType] = useState('');


    const navigate = useNavigate();

    const getBloodRecords = async () => {
        try {
            const { data } = await API.get('/admin/transaction');
            console.log("transaction ", data);
            if (data?.success) {
                setData(data?.inventory);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getOrganisations = async () => {
        try {
            const { data } = await API.get("/inventory/get-all-organisations");
            console.log("all registered org: ", data.organisations);
            if (data?.success) {
                setOrganisations(data?.organisations);
            }

        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getBloodRecords();
        getOrganisations();
    }, []);

    const handleOrganizationChange = (event) => {
        setSelectedOrganization(event.target.value);
    };

    const handleInventoryTypeChange = (event) => {
        setSelectedInventoryType(event.target.value);
    };


    const filteredData = data.filter((record) =>
        (record.organisation._id.toLowerCase().includes(selectedOrganization.toLowerCase())) &&
        (record.inventoryType.toLowerCase().includes(selectedInventoryType.toLowerCase()))
    );


    return (
        <Layout>
            {user?.role === "admin" && navigate('/transaction')}
            {error && <span>{alert(error)}</span>}
            {loading ? (
                <Spinner />
            ) : (
                <div style={{ marginLeft: "10px", marginRight: "40px" }}>
                    <div className="d-flex align-items-center justify-content-between mb-3">

                        <h4
                            className='ms-0'
                            style={{ fontWeight: "bold", paddingLeft: "9px" }}
                        >
                            <i className='fa-sharp fa-solid fa-building-ngo text-success py-4'></i>
                            Transactions
                        </h4>
                        <div className="mb-3" style={{ paddingRight: "40px", marginTop: "20px" }}>
                            <label htmlFor="organization" className="form-label" style={{ fontWeight: "bold" }}>
                                Select Organization:
                            </label>
                            <select
                                id="organization"
                                className="form-select"
                                value={selectedOrganization}
                                onChange={handleOrganizationChange}
                            >
                                <option value="">All</option>
                                {organisations.map((org) => (
                                    <option key={org._id} value={org._id}>
                                        {org.organisationName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3" style={{ paddingRight: "40px", marginTop: "20px" }}>
                            <label htmlFor="inventoryType" className="form-label" style={{ fontWeight: "bold" }}>
                                Select Inventory Type:
                            </label>
                            <select
                                id="inventoryType"
                                className="form-select"
                                value={selectedInventoryType}
                                onChange={handleInventoryTypeChange}
                            >
                                <option value="">ALL</option>
                                <option value="in">In</option>
                                <option value="out">Out</option>
                            </select>
                        </div>
                    </div>

                    <table className="table table-info table-striped tableClass">
                        <thead>
                            <tr className="table-warning" style={{ border: "1px solid gray" }}>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Blood Group</th>
                                <th scope="col">Organisation</th>
                                <th scope="col">Inventory Type</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Time & Date</th>
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
                                    <td>{record.organisation.organisationName}</td>
                                    <td>{record.inventoryType}</td>
                                    <td>{record.quantity} (ML)</td>
                                    <td>
                                        {moment(record.createdAt).format("DD/MM/YYYY A")}
                                    </td>
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

export default Transaction;

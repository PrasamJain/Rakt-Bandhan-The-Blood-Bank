import React, { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout/Layout';
import API from '../../services/api';
import moment from 'moment';
import '../../index.css';

const Donar = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const getDonars = async () => {
        try {
            const { data } = await API.get("/inventory/get-donars");
            console.log("Prasam : ", data?.donars);
            if (data?.success) {
                setData(data?.donars);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDonars();
    }, []);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleStatusChange = async (event, donorId) => {
        const newStatus = event.target.value;
        // console.log("Status : ", newStatus);
        try {
            const response = await API.put(`/inventory/update-donor-status`, { id: donorId ,status: newStatus });
            // console.log("R : ",response);
            if (response.data.success) {
                // Update the status in the local data state
                const updatedData = data.map(donor => {
                    if (donor._id === donorId) {
                        donor.status = newStatus;
                    }
                    return donor;
                });
                setData(updatedData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const filteredDonars = data.filter((donor) =>
        donor.donorEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h4 className='ms-1' style={{ fontWeight: "bold", paddingLeft: "30px", marginBottom: 0 }}>
                    <i className="fa-solid fa-hand-holding-medical text-success py-4"></i>
                    Donors Request
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

            <div style={{ marginLeft: "40px", marginRight: "40px" }}>
                <table className="table table-info table-striped tableClass">
                    <thead>
                        <tr className="table-warning" style={{ border: "1px solid gray" }}>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Blood Group</th>
                            <th scope="col">Request Type</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDonars.map((record) => (
                            // Check if requestType is "donate"
                            record.requestType === "donate" ? (
                                <tr key={record._id}>
                                    <td>{record.donorName || record.organisation + " (ORG)"}</td>

                                    {/* To highlinght the email wehn search */}
                                    <td>
                                        {record.donorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                                            <>
                                                {record.donorEmail.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, index) => (
                                                    part.toLowerCase() === searchTerm.toLowerCase() ? (
                                                        <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
                                                    ) : (
                                                        <span key={index}>{part}</span>
                                                    )
                                                ))}
                                            </>
                                        ) : (
                                            record.donorEmail
                                        )}
                                    </td>

                                    <td>{record.donorPhone}</td>
                                    <td>{record.bloodGroup}</td>
                                    <td>{record.requestType}</td>
                                    <td>{moment(record.createdAt).format("DD/MM/YYYY")}</td>
                                    <td>
                                        {/* Dropdown menu for accept or reject */}
                                        <select
                                            value={record.status}
                                            onChange={(e) => handleStatusChange(e, record._id)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="accepted">Accepted</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </td>
                                </tr>
                            ) : null // Don't render if requestType is not "donate"
                        ))}

                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Donar;

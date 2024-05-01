import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import moment from 'moment'
import API from '../../services/api';
import "../../index.css"
const Hospitals = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    // find hospitals records
    const getHospitals = async () => {
        try {
            const { data } = await API.get('/inventory/get-hospitals');
            console.log("recipent org : ", data.hospitals);
            // setData(data);
            if (data?.success) {
                setData(data?.hospitals);
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getHospitals();
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
                    <i className="fa-solid fa-hospital text-success py-4"></i>
                    Recipient Request
                </h4>
                <div className="mb-3" style={{ paddingRight: "40px", marginTop: "20px" }}>
                    <label htmlFor="search" className="form-label" style={{ fontWeight: "bold" }}>
                        Search Recipient:
                    </label>

                    <input
                        type="text"
                        id="search"
                        className="form-control"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        placeholder="Enter recipient email..."
                    />
                </div>
            </div>
            <div style={{ marginLeft: "10px", marginRight: "40px" }}>
                <table class="table table-info table-striped tableClass">
                    <thead>
                        <tr class="table-warning" style={{ border: "1px solid gray" }}>
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
                            // Check if requestType is "receive"
                            record.requestType === "receive" ? (
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
                            ) : null // Don't render if requestType is not "receive"
                        ))}

                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Hospitals;

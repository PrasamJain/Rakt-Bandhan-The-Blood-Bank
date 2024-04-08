import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import moment from 'moment'
import { useSelector } from 'react-redux';
import API from '../../services/api';
import "../../index.css";
import InputType from '../../components/shared/Form/InputType';


const Consumer = () => {
    const { user } = useSelector((state) => state.auth);
    // console.log("u detail ", user);
    const [data, setData] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const donorName = user.hospitalName;
    const requestType = "receive";
    const recipient = user?._id;
    const [status, setStatus] = useState('pending');
    const donorEmail = user?.email;
    const donorPhone = user?.phone;
    const [bloodGroup, setBloodGroup] = useState('');
    const [organisation, setOrganisation] = useState('');
    const [organisations, setOrganisations] = useState([]);

    //find donar records
    const getDonars = async () => {
        try {
            const { data } = await API.post("/inventory/get-inventory-hospital", {
                filters: {
                    inventoryType: "out",
                    hospital: user?._id,
                },
            });
            if (data?.success) {
                setData(data?.inventory);
                console.log("D-Data", data);
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

    const handleDonationSubmit = async () => {
        try {
            if (!donorName || !donorEmail || !donorPhone || !bloodGroup) {
                return alert("Please provide all donor details");
            }
            // console.log("reuqst : ", requestType);
            const { data } = await API.post("/inventory/submit-donation", {
                status,
                requestType,
                donorName,
                donorEmail,
                donorPhone,
                bloodGroup,
                organisation,
                recipient,
            });
            console.log("request status : ", data);
            if (data?.success) {
                // alert("Recipients Request submitted successfully!");
                window.location.reload();
                setShowForm(false);
                // getDonars();  

            }
        } catch (error) {
            console.log("error in consumer",error);
            alert("Error submitting donation details. Please try again.");
        }
    };

    useEffect(() => {
        getOrganisations();
        getDonars();
    }, []);
    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4
                    className='ms-0'
                    style={{ fontWeight: "bold", paddingLeft: "9px" }}
                >
                    <i class="fa-solid fa fa-users text-success py-4"></i>
                    Recipient Page
                </h4>

                <button
                    className="btn btn-success"
                    onClick={() => setShowForm(true)}
                >
                    Request Blood
                </button>
            </div>

            {showForm && (
                <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Request for Blood</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowForm(false)}></button>
                            </div>
                            <div className="modal-body">
                            <div className='d-flex' >
                                    <label htmlFor="donorName" className="form-label">
                                        <strong>Recipient Name : </strong>
                                        <span>{user.hospitalName}</span>
                                    </label>
                                </div>

                                <div>
                                    <label htmlFor="donorEmail" className="form-label">
                                        <strong>Recipient Email : </strong>
                                        <span>{user?.email}</span>
                                    </label>
                                </div>

                                <div>
                                    <label htmlFor="donorEmail" className="form-label">
                                        <strong>Recipient Phone : </strong>
                                        <span>{user?.phone}</span>
                                    </label>
                                </div>
                                {/* <InputType
                                    labelText=""
                                    labelFor="donorName"
                                    inputType="text"
                                    placeholder={}
                                    value={donorName}
                                    onChange={(e) => setDonorName(user.hospitalName)}


                                />

                                <InputType
                                    labelText=""
                                    labelFor="donorEmail"
                                    inputType="text"
                                    placeholder={user.email}
                                    value={donorEmail}
                                    onChange={(e) => setDonorEmail(user.email)}

                                />

                                <InputType
                                    labelText="Recipient Phone"
                                    labelFor="donorPhone"
                                    inputType="tel"
                                    placeholder={user.phone}
                                    value={donorPhone}
                                    onChange={(e) => setDonorPhone(user.phone)}

                                /> */}

                                <div className='form-group'>
                                    <label htmlFor="organisation" className="form-label" style={{ fontWeight: "bold" }}>
                                        Recipient Blood Group
                                    </label>
                                    <select
                                        id="organisation"
                                        className="form-select input-type-color"
                                        value={bloodGroup}
                                        onChange={(e) => setBloodGroup(e.target.value)}
                                        style={{ backgroundColor: "#e7ffff", border: "1px solid black" }}
                                    >
                                        <option value="">Select Blood Group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>


                                <div className='form-group'>
                                    <label htmlFor="organisation" className="form-label" style={{ fontWeight: "bold" }}>
                                        Select Organisation
                                    </label>
                                    <select
                                        id="organisation"
                                        className="form-select input-type-color"
                                        value={organisation}
                                        onChange={(e) => setOrganisation(e.target.value)}
                                        style={{ backgroundColor: "#e7ffff", border: "1px solid black" }}
                                    >
                                        <option value="">Select an organisation</option>
                                        {organisations.map((org) => (
                                            <option key={org._id} value={org._id}>
                                                {org.organisationName}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleDonationSubmit}>Submit Donation</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ marginLeft: "10px", marginRight: "40px" }}>
                <table class="table table-info table-striped tableClass">
                    <thead>
                        <tr class="table-warning" style={{ border: "1px solid gray" }}>
                            <th scope="col">Recipient Name</th>
                            <th scope="col">Blood Group</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Organisation</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data?.map((record) => (
                            <tr key={record._id}>
                                <td>{record.hospital.hospitalName}</td>
                                <td>{record.bloodGroup}</td>
                                <td>{record.quantity} ml</td>
                                <td>{record.organisation.organisationName}</td>
                                <td>{record.organisation.email}</td>
                                <td>{record.organisation.address}</td>
                                <td> {
                                    moment(record.createdAt).format("DD/MM/YYYY A")
                                }
                                </td>
                                <td>{record.action}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Consumer

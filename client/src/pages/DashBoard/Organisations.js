import React, { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout/Layout';
import moment from 'moment';
import API from '../../services/api';
import { useSelector } from 'react-redux';
import "../../index.css";

const Organisations = () => {
    const { user } = useSelector(state => state.auth);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const getOrg = async () => {
        try {
            const { data } = await API.get("/inventory/pending-request");
            console.log("pending request", data);
            if (data?.success) {
                const donar = data.donars;
                let combinedData = [];

                donar.forEach(donar => {
                    const organizationId = donar.organisation;
                    const correspondingOrg = data.organisation.find(org => org._id === organizationId);

                    if (correspondingOrg) {
                        const combinedEntity = {
                            ...donar,
                            organisation: correspondingOrg
                        };
                        combinedData.push(combinedEntity);
                    }
                });

                console.log("combinedData", combinedData);
                setData(combinedData);
            }
        } catch (error) {
            console.log("error",error);
        }
    };

    useEffect(() => {
        getOrg();
    }, [user]);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.filter(record =>
        record.donorName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h4 className='ms-1' style={{ fontWeight: "bold", paddingLeft: "30px", marginBottom: 0 }}>
                    <i className='fa-sharp fa-solid fa-building-ngo text-success py-4'></i>
                    Pending Request
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
                        placeholder="Enter donor name..."
                    />
                </div>
            </div>
            <div style={{ marginLeft: "10px", marginRight: "40px" }}>
                <table className="table table-info table-striped tableClass">
                    <thead>
                        <tr className="table-warning" style={{ border: "1px solid gray" }}>
                            <th scope="col">Donor Name</th>
                            <th scope="col">Organisation Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Blood Group</th>
                            <th scope="col">Date & Time</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((record) => (
                            <tr key={record._id}>
                                <td>{record.donorName}</td>
                                <td>{record.organisation.organisationName}</td>
                                <td>{record.organisation.email}</td>
                                <td>{record.organisation.phone}</td>
                                <td>{record.bloodGroup}</td>
                                <td>{moment(record.createdAt).format("DD/MM/YYYY A")}</td>
                                <td>{record.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Organisations;

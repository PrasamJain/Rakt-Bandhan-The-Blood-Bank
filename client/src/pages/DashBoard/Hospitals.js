import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import moment from 'moment'
import API from '../../services/api';
import "../../index.css"
const Hospitals = () => {
    const [data, setData] = useState([]);
    // find hospitals records
    const getHospitals = async () => {
        try {
            const { data } = await API.get('/inventory/get-hospitals');
            console.log("recipent org : ",data.hospitals);
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

    return (
        <Layout>
            <h4
                className='ms-0'

                style={{ fontWeight: "bold", paddingLeft: "9px" }}
            >
                <i className='fa-solid fa-hospital text-success py-4'></i>
                Hospitals Org
            </h4>
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
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((record) => (
                            <tr key={record._id}>
                                <td>{record.donorName || record.organisation + " (ORG)"}</td>
                                <td>{record.donorEmail}</td>
                                <td>{record.donorPhone}</td>
                                <td>{record.bloodGroup}</td>
                                <td>{record.requestType}</td>
                                <td> {
                                    moment(record.createdAt).format("DD/MM/YYYY")
                                }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Hospitals;

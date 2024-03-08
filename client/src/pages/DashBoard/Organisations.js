import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import moment from 'moment';
import API from '../../services/api';
import { useSelector } from 'react-redux';
import "../../index.css"
const Organisations = () => {
    // get current use
    const { user } = useSelector(state => state.auth);

    const [data, setData] = useState([]);
    // find Organisations records
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
                    // console.log("correspondingOrg",correspondingOrg);

                    if (correspondingOrg) {
                        const combinedEntity = {
                            ...donar,
                            organisation: correspondingOrg
                        };
                        combinedData.push(combinedEntity);
                    }
                });

                console.log("combinedData",combinedData);
                setData(combinedData);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getOrg();
    }, [user]);

    return (
        <Layout >
            <h4
                className='ms-0'
                style={{ fontWeight: "bold", paddingLeft: "9px" }}
            >
                <i className='fa-sharp fa-solid fa-building-ngo text-success py-4'></i>
                Pending Request
            </h4>
            <div style={{ marginLeft: "10px", marginRight: "40px" }}>
                <table class="table table-info table-striped tableClass">
                    <thead>
                        <tr class="table-warning" style={{ border: "1px solid gray" }}>
                            <th scope="col">Donar Name</th>
                            <th scope="col">Organisation Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Blood Group</th>
                            <th scope="col">Date & Time</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((record) => (
                            <tr key={record._id}>
                                <td>{record.donorName}</td>
                                <td>{record.organisation.organisationName}</td>
                                <td>{record.organisation.email}</td>
                                <td>{record.organisation.phone}</td>
                                <td>{record.bloodGroup}</td>
                                <td> {
                                    moment(record.createdAt).format("DD/MM/YYYY A")
                                }
                                </td>
                                <td>{record.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout >
    )
}

export default Organisations;

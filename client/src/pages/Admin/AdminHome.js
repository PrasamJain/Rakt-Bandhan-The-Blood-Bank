import React from 'react';
import Layout from '../../components/shared/Layout/Layout';
import { useSelector } from 'react-redux';

const AdminHome = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <Layout>
            <div className='container'>
                <div className='d-flex flex-column mt-4'>
                    <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>
                        Welcome Admin <span style={{ color: '#27ae60' }}>{user?.name}</span>
                    </h1>
                    <h3 style={{ color: '#2980b9', marginBottom: '10px' }}>Manage Blood Bank App</h3>
                    <hr style={{ marginBottom: '20px' }} />
                    <p style={{ color: '#34495e' }}>
                        The blood bank website project developed by Palash, Prasam, and Rahul Bairagi is built on the MERN stack,
                        which stands for MongoDB, Express.js, React, and Node.js. This technology stack is widely used for building
                        robust and scalable web applications.
                    </p>
                    <hr style={{ marginBottom: '20px' }} />
                    <p style={{ color: '#34495e' }}>
                        A blood bank website is an online platform that serves as a centralized resource for connecting blood donors
                        with recipients in need. It is designed to facilitate the process of blood donation, streamline communication,
                        and ensure efficient management of the blood supply. The website acts as a bridge between donors and healthcare
                        institutions, providing valuable information, online registration, scheduling, and other essential features.
                    </p>
                    <hr style={{ marginBottom: '20px' }} />
                    <p style={{ color: '#34495e', fontStyle: 'italic' }}>
                        "The gift of blood is the gift of life."
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default AdminHome;

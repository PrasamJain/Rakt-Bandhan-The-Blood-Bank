import React, { useState, useEffect } from 'react';
import Form from '../../components/shared/Form/Form';
import { BiDonateBlood, } from "react-icons/bi";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Spinner from '../../components/shared/Spinner';
import "../../index.css";
import emailjs from 'emailjs-com';




const Login = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [showLoginForm, setShowLoginForm] = useState(false);


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // EmailJS parameters
        const templateParams = {
            name: name,
            email: email,
            phone: phone,
            message: message,
        };

        const serviceID = 'service_f55l2ma';
        const templateID = 'template_ovsg1n9';
        const userID = 'upUaRef23ckzGtiej';

        // Send email using EmailJS
        emailjs.send(serviceID, templateID, templateParams, userID)
            .then((response) => {
                console.log('Email sent successfully!', response);
                // Reset form fields after sending email
                setName('');
                setEmail('');
                setPhone('');
                setMessage('');
            })
            .catch((error) => {
                console.error('Email sending failed!', error);
            });
    }


    const toggleLoginForm = () => {
        setShowLoginForm(!showLoginForm);
    };
    const images = [
        './assets/images/img.jpg',
        './assets/images/img2.jpg',
        './assets/images/img3.jpg'
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage(prevImage => (prevImage + 1) % images.length);
        }, 4000);

        return () => clearInterval(intervalId);
    }, []);

    const { loading, error } = useSelector(state => state.auth);

    return (
        <>

            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    &nbsp;&nbsp;&nbsp;
                    <BiDonateBlood color="red" fontSize={"25px"} />
                    &nbsp;
                    <a className="navbar-brand" href="/">Rakt Bandhan: The Blood Bank</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                {/* <button onClick={toggleLoginForm}>Login</button> */}
                                <a className="nav-link" href="#" onClick={toggleLoginForm}>Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/register">Register</a>

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>




            <div className='col-md-22 form-banner bg-illustration' style={{ width: "100%", height: "50vh", overflow: "hidden" }}>
                <div className='col-md-22 form-banner bg-illustration' style={{ width: "100%", height: "50vh", overflow: "hidden" }}>
                    <img src={images[currentImage]} alt='loginImage' style={{ width: "100%", height: "50vh", objectFit: "cover", borderRadius: "2px", border: "1px solid black" }} />
                </div>
            </div>


            {error && <span>{alert(error)}</span>}
            {loading ? (
                <Spinner />
            ) : (
                <div className='row g-0' style={{ backgroundColor: "rgba(128, 128, 255, .5)" }}>
                    <div className='col-md-12 form-banner bg-illustration'>
                        <img src="./assets/images/img4.jpg" alt='loginImage' style={{ border: "2px solid black" }} />
                    </div>
                    {/* {showLoginForm && (
                            <div className="login-popup">
                                <div className="login-popup-inner">
                                    <Form
                                        formTitle={"Login Page"}
                                        submitBtn={"Login"}
                                        formType={"login"}
                                    />
                                    <button onClick={toggleLoginForm}>Close</button>
                                </div>
                            </div>
                        )} */}

                    {showLoginForm && (
                        <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                            <div className="modal-dialog">
                                <div className="modal-content">

                                    <div style={{ borderRadius: "10px", border: "1px solid black", backgroundColor: "lightcoral", padding: "30px" }}>
                                        <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "8px" }}>
                                            <Form
                                                formTitle={"Login Page"}
                                                submitBtn={"Login"}
                                                formType={"login"}
                                            />
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowLoginForm(false)}>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Additional HTML content */}
            <div className="row" style={{ paddingTop: "4px" }}>
                <div className="row text-center">
                    <div className="col-md-12 typeHeading">
                        <h1 style={{ fontFamily: "oswald", fontSize: '35px', color: '#8B0000' }}>LEARN ABOUT DONATION</h1>
                    </div>
                    <br></br>
                    <br></br>
                    <br /><br />
                    <div className="wow col-sm-6 rotateInDownRight text-center animated" data-wow-delay="0ms" data-wow-duration="1000ms" style={{ visibility: "visible", animationDuration: "1000ms", animationDelay: "0ms", animationName: "rotateInDownRight" }}>
                        <picture>
                            <source srcset="./assets/images/blood.jpg" type="image/webp" />
                            <source srcset="./assets/images/blood.jpg" type="image/jpeg" />
                            <img src="./assets/images/blood.jpg" alt="One Donation Can save upto three lives" />
                        </picture>
                        <blockquote>
                            <p style={{ fontFamily: "oswald", fontSize: '18px', }}>After donating blood, the body works to replenish the blood loss. This stimulates the production of new blood cells and in turn, helps in maintaining good health.</p>
                        </blockquote>
                        <button className="btn btn-danger svcNearBy hvr-sweep-to-right" onClick={toggleLoginForm}><i className="fa fa-tint" aria-hidden="true"></i>&nbsp; Donate Now</button>
                        <br /><br />
                    </div>
                    <div className="col-sm-5" align="center" style={{ fontSize: "0.9 rem", marginLeft: "auto" }}>
                        <table className="table table-responsive">
                            <tbody>
                                <tr>
                                    <th colspan="3" style={{ color: "white", backgroundColor: "red" }}>Compatible Blood Type Donors</th>
                                </tr>
                                {/* Replace the following rows with your data */}
                                {/* Example rows provided */}
                                <tr>
                                    <td><b>Blood Type</b></td>
                                    <td><b>Donate Blood To</b></td>
                                    <td><b>Receive Blood From</b></td>
                                </tr>
                                <tr>
                                    <td><span style={{ color: "#961e1b" }}><b>A+</b></span></td>
                                    <td>A+ AB+</td>
                                    <td>A+ A- O+ O-</td>
                                </tr>
                                <tr>
                                    <td><span style={{ color: "#961e1b" }}><b>O+</b></span></td>
                                    <td>O+ A+ B+ AB+</td>
                                    <td>O+ O-</td>
                                </tr>
                                <tr>
                                    <td><span style={{ color: "#961e1b" }}><b>B+</b></span></td>
                                    <td>B+ AB+</td>
                                    <td>B+ B- O+ O-</td>
                                </tr>
                                <tr>
                                    <td><span style={{ color: "#961e1b" }}><b>AB+</b></span></td>
                                    <td>AB+</td>
                                    <td>Everyone</td>
                                </tr>
                                <tr>
                                    <td><span style={{ color: "#961e1b" }}><b>A-</b></span></td>
                                    <td>A+ A- AB+ AB-</td>
                                    <td>A- O-</td>
                                </tr>
                                <tr>
                                    <td><span style={{ color: "#961e1b" }}><b>O-</b></span></td>
                                    <td>Everyone</td>
                                    <td>O-</td>
                                </tr>
                                <tr>
                                    <td><span style={{ color: "#961e1b" }}><b>B-</b></span></td>
                                    <td>B+ B- AB+ AB-</td>
                                    <td>B- O-</td>
                                </tr>
                                <tr>
                                    <td><span style={{ color: "#961e1b" }}><b>AB-</b></span></td>
                                    <td>AB+ AB-</td>
                                    <td>AB- A- B- O-</td>
                                </tr>
                                {/* Add more rows as needed */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <hr></hr>
            {/* Our team section */}
            <div className="our-team-section" style={{ marginTop: '3rem' }}>
                    <h2 style={{ textAlign: 'center' }}>Our Team</h2>
                    <div className="row justify-content-center">
                        {/* Prasam Jain Card */}
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <img
                                    src="./assets/images/prasam.jpg"
                                    className="card-img-top rounded-circle"
                                    alt="Prasam Jain"
                                    style={{
                                        width: '130px',
                                        height: '130px',
                                        margin: 'auto', // Center horizontally
                                        display: 'block',
                                        marginTop: '20px' // Ensures proper alignment
                                    }}
                                />

                                <div className="card-body" >
                                    <h5 style={{ textAlign: 'center' }}>Prasam Jain </h5>
                                    <p className="card-text" style={{ textAlign: 'center' }}>Full Stack Developer</p>
                                    <ul className="list-unstyled">
                                        <li><em>I am a quick learner and problem solver & I believe that
                                            I can contribute to your team by bringing fresh perspectives,
                                            and a willingness to learn and grow.</em></li>
                                    </ul>
                                </div>
                                <div className="card-footer text-center">
                                    <a href="mailto:prasamjain294@gamil.com"><i className="fa-solid fa-envelope text-success me-3"></i></a>
                                    <a href="https://github.com/prasamjain"><i className="fa-brands fa-github text-success me-3"></i></a>
                                    <a href="https://www.linkedin.com/in/prasam-jain-59a45a191"><i className="fa-brands fa-linkedin text-success me-3"></i></a>
                                    <span>Phone: +91-6265973186</span>
                                </div>
                            </div>
                        </div>

                        {/* Palash Mishra Card */}
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <img
                                    src="./assets/images/Rahul.jpg"
                                    className="card-img-top rounded-circle"
                                    alt="Prasam Jain"
                                    style={{
                                        width: '130px',
                                        height: '130px',
                                        margin: 'auto', // Center horizontally
                                        display: 'block',
                                        marginTop: '20px' // Ensures proper alignment
                                    }}
                                />
                                <div className="card-body">
                                    <h5 style={{ textAlign: 'center' }}>Rahul Bairagi</h5>
                                    <p className="card-text" style={{ textAlign: 'center' }}>Full Stack Developer</p>
                                    <ul className="list-unstyled">
                                        <li><em>I am excited about the opportunity to work as an intern 
                                            at your company and I am confident that I can make valuable 
                                            contributions to your projects.</em></li>
                                    </ul>
                                </div>
                                <div className="card-footer text-center">
                                    <a href="mailto:rahulbairagiofficial@gmail.com"><i className="fa-solid fa-envelope text-success me-3"></i></a>
                                    <a href="https://github.com/rahulcode751"><i className="fa-brands fa-github text-success me-3"></i></a>
                                    <a href="https://www.linkedin.com/in/rahul3008/"><i className="fa-brands fa-linkedin text-success me-3"></i></a>
                                    <span>Phone: +91-6264959991</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            <footer style={{ backgroundColor: "#333", color: "#fff", padding: "20px", textAlign: "center" }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="row">
                        <div className="contact-us" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                            <h4>Contact Us</h4>
                            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px", marginTop: "20px", height: "40px" }}>
                                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ marginRight: "50px", border: "1px solid #ccc", borderRadius: "5px", padding: "5px" }} />
                                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ marginRight: "50px", border: "1px solid #ccc", borderRadius: "5px", padding: "5px" }} />
                                    <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "5px" }} />
                                </div>

                                <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required style={{ width: "100%", height: "100px", marginBottom: "20px" }}></textarea>
                                <button type="submit" style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Send Message</button>

                            </form>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <a href="https://www.linkedin.com/in/prasam-jain-59a45a191" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", marginRight: "30px", fontSize: "24px" }}>
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a href="https://github.com/prasamjain" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", marginRight: "30px", fontSize: "24px" }}>
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="mailto:prasamjain294@gmail.com" style={{ color: "#fff", fontSize: "24px" }}>
                                <i className="fas fa-envelope"></i>
                            </a>
                        </div>

                    </div>
                </div>
                <p className="text-center" style={{ marginTop: '20px', color: 'white', fontSize: "18px" }}>
                    © 2024 | Designed and Developed by Prasam Jain and Palash Mishra
                </p>
            </footer>



        </>
    );
}

export default Login;

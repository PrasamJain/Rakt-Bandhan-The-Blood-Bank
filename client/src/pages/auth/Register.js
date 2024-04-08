import React from 'react'
import Form from '../../components/shared/Form/Form'
import { useSelector } from 'react-redux'
import Spinner from '../../components/shared/Spinner';

const Register = () => {
    const { loading, error } = useSelector((state) => state.auth);
    return (
        <>
            {error && <span>{alert(error)}</span>}
            {loading ? (<Spinner />) : (
                <div className='row g-0' style={{ backgroundColor: "rgba(128, 128, 255, .5)" }}>
                    <div className='col-md-8 form-banner'>
                        <img src='./assets/images/banner2.jpg' alt='registerImage' style={{ border: "2px solid black" }} />
                    </div >
                    <div className='col-md-4 form-container' style={{ borderRadius: "10px", border: "1px solid black", backgroundColor: "lightcoral", padding: "30px" }}>
                        <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "8px" }}>
                            <Form
                                formTitle={"Register"}
                                submitBtn={"Register"}
                                formType={"register"}
                            />
                        </div>
                    </div>
                </div >
            )}
        </>
    )
}

export default Register;

import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, email, password, role) => {
    e.preventDefault();
    try {
        if (!role || !email || !password) {
            return alert("Please Privde All Feilds");
        }
        store.dispatch(userLogin({ email, password, role }));
    } catch (error) {
        console.log(error);
    }
};

export const handleRegister = (e,
    name,
    role,
    email,
    password,
    organisationName,
    hospitalName,
    address,
    phone,
    website) => {
    e.preventDefault();
    try {
        // console.log("Register =>", name,
        //     role,
        //     email,
        //     password,
        //     organisationName,
        //     hospitalName,
        //     address,
        //     phone,
        //     website)
        store.dispatch(userRegister({
            name,
            role,
            email,
            password,
            organisationName,
            hospitalName,
            address,
            phone,
            website
        }));
    } catch (error) {
        console.log(error);
    }
};

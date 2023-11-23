import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const UseAdmin = () => {
    const [user] = useAuthState(auth);
    const [admin , setAdmin] = useState(false);
    const [adminLoading , setAdminLoading] = useState(true);
 
//   console.log(admin);
    useEffect( () => {
        const email = user?.email; 
        fetch(`http://localhost:5000/api/v1/users/isAdmin/${email}`, {
            method: 'GET',
            headers: {
                'content-type' : 'application/json',
                authorization : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            setAdmin(data?.role === true);
            setAdminLoading(false);
        })

    },[user]);


    return [admin, adminLoading];
};

export default UseAdmin;
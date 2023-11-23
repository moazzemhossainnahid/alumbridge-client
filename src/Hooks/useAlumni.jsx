import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const UseAlumni = () => {
    const [user] = useAuthState(auth);
    const [alumni , setAlumni] = useState(false);
    const [alumniLoading , setAlumniLoading] = useState(true);
 
//   console.log(admin);
    useEffect( () => {
        const email = user?.email; 
        fetch(`http://localhost:5000/api/v1/users/${email}`, {
            method: 'GET',
            headers: {
                'content-type' : 'application/json',
                authorization : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            setAlumni(data?.accType === "Alumni");
            setAlumniLoading(false);
        })

    },[user]);


    return [alumni, alumniLoading];
};

export default UseAlumni;
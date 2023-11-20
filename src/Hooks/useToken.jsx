import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const UseToken = (user) => {
    // const [user] = useAuthState(auth);
    const [token, setToken] = useState('');
    console.log(user);
    useEffect(() => { 
        const email = user?.user?.email;
        const displayName = user?.user?.displayName;

        const currentUser = {
            displayName: displayName,
            email: email
        }


        if (email) {
            fetch(`http://localhost:5000/api/v1/users/${email}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    const accessToken = data?.data?.accessToken;
                    localStorage.setItem('accessToken', accessToken);
                    setToken(accessToken);
                })
        }

    }, [user]);
    return [token];
};

export default UseToken;
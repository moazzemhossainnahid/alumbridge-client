import { useEffect, useState } from 'react';

const useSocializations = () => {
    const [socializations, setSocializations] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/socializations`, {
            method: "GET",
            headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
            }
        }) 
            .then(res => res.json())
            .then(data => setSocializations(data?.data?.result))
    }, []);

    // console.log(socializations);

    return [socializations];
};

export default useSocializations;
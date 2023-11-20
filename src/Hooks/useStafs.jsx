import { useEffect, useState } from 'react';

const useStafs = () => {
    const [stafs, setStafs] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/stafs`, {
            method: "GET",
            headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
            }
        })
            .then(res => res.json())
            .then(data => setStafs(data?.data?.result))
    }, []);

    // console.log(stafs);

    return [stafs];
};

export default useStafs;
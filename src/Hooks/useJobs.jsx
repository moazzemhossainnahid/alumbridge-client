import { useEffect, useState } from 'react';

const useJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch(`https://alumbridge-server.vercel.app/api/v1/jobs`, {
            method: "GET",
            headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
            }
        }) 
            .then(res => res.json())
            .then(data => setJobs(data?.data?.result))
    }, []);

    // console.log(jobs);

    return [jobs];
};

export default useJobs;
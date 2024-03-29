import { useEffect, useState } from 'react';

const useBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch(`https://alumbridge-server.vercel.app/api/v1/blogs`, {
            method: "GET",
            headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
            }
        })
            .then(res => res.json())
            .then(data => setBlogs(data?.data?.result))
    }, []);

    // console.log(blogs);

    return [blogs];
};

export default useBlogs;
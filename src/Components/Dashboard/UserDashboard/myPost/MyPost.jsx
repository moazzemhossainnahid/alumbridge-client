import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../../firebase.init';

const MyPost = () => {
    const [user] = useAuthState(auth);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://abc-publications-server-ii.vercel.app/api/v1/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [])

    const myPosts = posts && posts.filter(p => p?.authorEmail === user?.email);

    // console.log(myPosts);

    return (
        <div className='container'>
            <div className="py-7">
                <h3 className="text-3xl dark:text-white font-bold">My Posts - {`${myPosts?.length}`}</h3>
                <div className="w-full px-3 md:px-7 grid grid-cols-1 md:grid-cols-2 gap-3 justify-center items-center py-10 mx-auto h-full">
                    {
                        myPosts?.map(post => (
                            
                            <div key={post?._id} className="flex flex-col md:flex-row gap-2 items-center md:h-72 bg-[#EBEFEE] w-full h-fit rounded-lg bg-red shadow-lg">
                                <div className="w-4/5 p-5 md:w-2/5 mx-auto">
                                    <img className=" object-cover rounded-full" src={post?.cover} alt="" />
                                </div>
                                <div className="p-6 w-full md:w-3/5 mx-auto flex flex-col justify-start text-left">
                                    <h5 className="text-gray-900 text-xl font-semibold mb-2">Title: <span className="text-green-700">{post?.title}</span></h5>
                                    <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Status: <span className=" text-xs md:text-base px-3 py-1 rounded-full bg-rose-700 text-white">{post?.status}</span></p>
                                    <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Author: {post?.authorName}</p>
                                    <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Category: {post?.category}</p>
                                    <p className="text-gray-700 text-xs md:text-base font-semibold mb-4">Email: {post?.authorEmail}</p>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    );
};

export default MyPost;
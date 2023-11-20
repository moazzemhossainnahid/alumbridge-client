import React from 'react';
import { GridLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <GridLoader color="#00C2FF" />
        </div>
    );
};

export default Loading;
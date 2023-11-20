import React from 'react';

const ManageStafsRow = ({ staf, index, setDeleteStaf}) => {

    const { name, image, age, experience } = staf;

    return (
        <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-2 text-sm text-gray-800 text-center border border-b block font-semibold lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Index</span>
                {index + 1}
            </td>
            <td className="w-full lg:w-auto p-2 text-sm text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Staf Image</span>
                <img src={image} alt="" className="w-12 h-12 rounded-full p-1" />
            </td>
            <td className="w-full lg:w-auto p-2 text-sm text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Staf Name</span>
                {name} <br />
            </td>
            <td className="w-full lg:w-auto p-2 text-sm text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Staf Age</span>
                {age}
            </td>
            <td className="w-full lg:w-auto p-2 font-bold text-green-700 text-sm text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Experience</span>
                {experience}
            </td>
            <td className="w-full lg:w-auto text-xs p-2 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <div className="flex justify-between px-3 pb-1 gap-2 items-center">
                    <label htmlFor="delete-staf-modal" onClick={() => setDeleteStaf(staf)} className="btn text-white btn-secondary btn-xs">Delete Staf</label>
                </div>

            </td>
        </tr>
    );
};

export default ManageStafsRow;
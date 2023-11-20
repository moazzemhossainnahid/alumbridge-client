import React, { useEffect, useState } from 'react';

const ManageJobsRow = ({ job, index, setDeleteJob }) => {

    const { companyName, positionName, description, skills, vacancy } = job;
    const [formattedDate, setFormattedDate] = useState('');

  
    useEffect(() => {
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      const date = new Date(job?.createdAt);
      const formattedDate = date.toLocaleDateString('en-US', options);
      setFormattedDate(formattedDate);
    }, [job?.createdAt]);


    return (
        <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto text-sm text-gray-800 text-center border border-b block font-semibold lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Index</span>
                {index + 1}
            </td>
            <td className="w-full lg:w-auto text-sm text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">CompanyName</span>
                {companyName} <br />
            </td>
            <td className="w-full lg:w-auto text-sm text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">PositionName</span>
                {positionName} <br />
            </td>
            <td className="w-full lg:w-auto text-sm text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Vacancy</span>
                {vacancy}
            </td>
            <td className="w-full lg:w-auto font-bold text-green-700 text-sm text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Publised</span>
                {formattedDate}
            </td>
            <td className="w-full lg:w-auto text-xs p-2 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <div className="flex justify-center pb-1 items-center">
                    <label htmlFor="delete-job-modal" onClick={() => setDeleteJob(job)} className="text-black rounded shadow px-1 py-1 cursor-pointer text-xs bg-secondary ">Delete Job</label>
                </div>

            </td>
        </tr>
    );
};

export default ManageJobsRow;
import React from 'react';

const ViewJobApplicationsModal = ({ application }) => {
    const { name, phone, address, email, message, jobTitle, jobPosition, companyName } = application;

    return (
        <div>
            <input type="checkbox" id="view-jobapplication-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="view-jobapplication-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-3">
                        <div className="">
                            <h3 class="text-lg font-bold italic underline">Job Information:</h3>
                            <div className="py-3 space-y-3">
                                <h3 className="text-2xl font-bold">{jobTitle}</h3>
                                <h3 className="text-xl font-semibold">{jobPosition}</h3>
                                <h3 className="text-md font-normal">{companyName}</h3>
                            </div>
                            <h3 class="text-lg font-bold italic underline">Applicant's Information:</h3>
                            <div className="py-3 space-y-3">
                                <h3 className="text-2xl font-bold">{name}</h3>
                                <h3 className="text-xl font-semibold">{phone}</h3>
                                <h3 className="text-md font-semibold">{email}</h3>
                                <h3 className="text-md font-normal">{address}</h3>
                                <h3 className="text-md font-normal">{message}</h3>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default ViewJobApplicationsModal;
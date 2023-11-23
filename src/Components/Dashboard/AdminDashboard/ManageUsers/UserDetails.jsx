
import { toast } from 'react-toastify';
import UseAdmin from '../../../../Hooks/useAdmin';

const UserDetails = ({ user, index }) => {
    const { _id, email, role } = user;
    const [admin] = UseAdmin();

    console.log(admin);

    const handleMakeAdmin = () => {
        if (admin) {
            fetch(`http://localhost:5000/api/v1/users/admin/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    // console.log(data);
                    if (data.modifiedCount > 0) {
                        toast('Successfully Make an Admin')
                    }
                })
        }
    }

    const handleRemoveAdmin = () => {
        if (admin) {
            fetch(`http://localhost:5000/api/v1/users/admin/remove/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        toast('Successfully Remove an Admin');
                        window.location.reload();
                    }
                })
        }

    }

    const handleRemoveUser = (id) => {
        if (admin) {
            fetch(`http://localhost:5000/api/v1/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.deletedCount > 0) {
                        toast('Successfully Remove an User')
                    }
                })
        }
    }

    return (

        <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block font-semibold lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Index</span>
                {index + 1}
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center md:text-left border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Email</span>
                {email}
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Status</span>
                {(role === 'admin' || role === "superadmin") ? <div className="badge text-xs text-blue-700 badge-outline">{`${(role === "superadmin" && "Super Admin") || (role === "admin" && "Admin")}`}</div> : <button onClick={handleMakeAdmin} className="btn capitalize btn-xs btn-outline btn-primary">Make Admin</button>}
            </td>
            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
                {(role !== 'admin' && role !== "superadmin") ? <button onClick={() => handleRemoveUser(_id)} className="btn btn-xs capitalize btn-outline btn-natural">Remove User</button> : <button disabled={role === "superadmin"} onClick={handleRemoveAdmin} className={` ${role === "superadmin" ? "disabled text-xs" : "btn btn-xs capitalize btn-outline btn-secondary"}`}>{`${role === "superadmin" ? "SuperAdmin Can't Deleted" : "Remove Admin"}`}</button>}
            </td>
        </tr>

    );
};

export default UserDetails;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser, deleteUser, fetchAllUsers, updateUser } from "../../redux/slices/adminSlice";
import { BsEye, BsEyeSlash } from "react-icons/bs";

function UserManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false)
  const {users, loading, error} = useSelector((state) => state.admin);
  const {user} = useSelector((state) => state.auth);

  const toggleShow = () => {
    setShow(!show)
  }


  useEffect(() => {
    if(user && user.role !== "admin") {
      navigate("/")
    }
  },[user, navigate]);

  useEffect(() => {
    if(user && user.role === "admin"){
          dispatch(fetchAllUsers())
    }
  },[dispatch, user])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(formData))
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleRoleChange = (userId, value) => {
    dispatch(updateUser({id:userId, role: value}))
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure want to delete the user?")) {
       dispatch(deleteUser(userId))
    };
  }
  return (
    <div className="max-w-7xl p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      {/*add new user */}
      <div className="p-6 mb-6">
        <h3 className="text-lg mb-4 font-bold">Add New USer</h3>
        <form onSubmit={handleSubmit} action="">
          <div className="mb-4">
            <label htmlFor="name" className="text-gray-700 block">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="text-gray-700 block">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="name" className="text-gray-700 block">
              Password
            </label>
            <input
              type={show? "text":"password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <div className="absolute text-xl top-8.75 right-2.5" onClick={toggleShow}>
                {show? <BsEyeSlash />:<BsEye />}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="text-gray-700 block">
              Role
            </label>
            <select
              name="role"
              id=""
              className="w-full p-2 border rounded cursor-pointer"
              onChange={handleChange}
              value={formData.role}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 rounded hover:bg-green-600 py-2 px-4 text-white cursor-pointer"
          >
            Add User
          </button>
        </form>
      </div>

      {loading? <p>Loading</p>: (error? <p>Error: {error}</p>:
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        
        <table className="w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Activity</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => {
                      handleRoleChange(user._id, e.target.value);
                    }}
                    className="p-2 border rounded"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                    <button className="bg-red-500 rounded px-4 py-2 hover:bg-red-600 text-white cursor-pointer" onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       )}
    </div>
  );
}


export default UserManagement

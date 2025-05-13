import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const MyProfile = () => {
    const { user } = useAuthContext();

    const [userData, setUserData] = useState(null); // User data
    const [isEditing, setIsEditing] = useState(false); // Edit mode
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
    });

    const [error, setError] = useState(null)

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/myUser`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const data = await response.json();
            console.log("User data:", data);
            if (response.ok) {
                
                setUserData(data);
                setFormData({
                    name: data.name,
                    address: data.address,
                    phone: data.phone,
                });
            } else {
                console.error("Failed to fetch user data");
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle update
    const handleUpdate = async () => {


        if (formData.name.trim().length < 3) {
            setError("Name must be at least 3 characters long");
            return;
        }
        if (formData.address.trim().length < 3) {
            setError("Address must be at least 3 characters long");
            return;
        }
        if (formData.phone.trim().length < 10) {
            setError("Phone number must be at least 10 characters long");
            return;
        }
        setError(null)

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/updateUser`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const updatedData = await response.json()
            console.log("Updated data:", updatedData);
            setUserData(updatedData)
            setIsEditing(false)
        } else {
            console.error("Failed to update user data")
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ width: "50%", margin: "0 auto", textAlign: "left" }}>
            <h2 style={{textAlign: "center"}}>My Profile</h2>
            <br />

            {error && <div className="alert alert-danger">{error}</div>}
 <table className="table table-striped">
                <tbody>
                    {/* Name */}
                    <tr>
                        <th>Name</th>
                        <td>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    minLength={3}
                                />
                            ) : (
                                userData.name
                            )}
                        </td>
                    </tr>

                    {/* Address */}
                    <tr>
                        <th>Address</th>
                        <td>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    minLength={3}
                                />
                            ) : (
                                userData.address
                            )}
                        </td>
                    </tr>

                    {/* Phone Number */}
                    <tr>
                        <th>Phone Number</th>
                        <td>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    minLength={10}
                                />
                            ) : (
                                userData.phone
                            )}
                        </td>
                    </tr>

                    {/* Email */}
                    <tr>
                        <th>Email</th>
                        <td>{userData.email}</td>
                    </tr>

                    {/* National ID */}
                    <tr>
                        <th>National ID</th>
                        <td>{userData.nationalId}</td>
                    </tr>

                    {/* Date of Birth */}
                    <tr>
                        <th>Date of Birth</th>
                        <td>{new Date(userData.dob).toISOString().split("T")[0]}</td>
                    </tr>
                </tbody>
            </table>


            {isEditing ? (
                <button className="btn btn-success" onClick={handleUpdate}>
                    Update
                </button>
            ) : (
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                    Edit
                </button>
            )}
        </div>
    );
};

export default MyProfile;
import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Edit, Save, X } from "lucide-react";

import "./Profile.css";

function Profile() {

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Kabilan",
    email: "kabilan@gmail.com",
    phone: "9876543210",
    address: "Neyveli, Tamil Nadu, India",
    city: "Neyveli",
    pincode: "607801",
  });

  const [formData, setFormData] = useState(profile);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setProfile(formData);
    setIsEditing(false);

    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData(profile);
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="profile-page">

      <div className="profile-heading">
        <h1>My Profile</h1>
        <p>Manage your personal information and account details.</p>
      </div>

      <div className="profile-container">

        {/* Profile Sidebar */}

        <div className="profile-sidebar">

          <div className="profile-avatar">
            <User size={55} />
          </div>

          <h2>{profile.name}</h2>

          <p>{profile.email}</p>

          <span className="profile-badge">
            Customer Account
          </span>

        </div>

        {/* Profile Details */}

        <div className="profile-details">

          <div className="profile-details-header">

            <div>
              <h2>Personal Information</h2>
              <p>Update your personal details.</p>
            </div>

            {!isEditing && (
              <button
                className="profile-edit-btn"
                onClick={() => {
                  setFormData(profile);
                  setIsEditing(true);
                }}
              >
                <Edit size={17} />
                Edit Profile
              </button>
            )}

          </div>

          <form onSubmit={handleSave}>

            <div className="profile-form-grid">

              {/* Name */}

              <div className="profile-field">
                <label>Full Name</label>

                <div className="profile-input">
                  <User size={18} />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    disabled={!isEditing}
                    onChange={handleChange}
                  />
                </div>

                {errors.name && (
                  <span className="profile-error">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email */}

              <div className="profile-field">
                <label>Email Address</label>

                <div className="profile-input">
                  <Mail size={18} />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled={!isEditing}
                    onChange={handleChange}
                  />
                </div>

                {errors.email && (
                  <span className="profile-error">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Phone */}

              <div className="profile-field">
                <label>Phone Number</label>

                <div className="profile-input">
                  <Phone size={18} />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    disabled={!isEditing}
                    onChange={handleChange}
                  />
                </div>

                {errors.phone && (
                  <span className="profile-error">
                    {errors.phone}
                  </span>
                )}
              </div>

              {/* City */}

              <div className="profile-field">
                <label>City</label>

                <div className="profile-input">
                  <MapPin size={18} />

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    disabled={!isEditing}
                    onChange={handleChange}
                  />
                </div>

                {errors.city && (
                  <span className="profile-error">
                    {errors.city}
                  </span>
                )}
              </div>

              {/* Address */}

              <div className="profile-field full-width">
                <label>Address</label>

                <textarea
                  name="address"
                  rows="3"
                  value={formData.address}
                  disabled={!isEditing}
                  onChange={handleChange}
                />

                {errors.address && (
                  <span className="profile-error">
                    {errors.address}
                  </span>
                )}
              </div>

              {/* Pincode */}

              <div className="profile-field">
                <label>PIN Code</label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  disabled={!isEditing}
                  onChange={handleChange}
                  maxLength="6"
                />

                {errors.pincode && (
                  <span className="profile-error">
                    {errors.pincode}
                  </span>
                )}
              </div>

            </div>

            {isEditing && (
              <div className="profile-actions">

                <button
                  type="button"
                  className="profile-cancel-btn"
                  onClick={handleCancel}
                >
                  <X size={17} />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="profile-save-btn"
                >
                  <Save size={17} />
                  Save Changes
                </button>

              </div>
            )}

          </form>

        </div>

      </div>

    </div>
  );
}

export default Profile;
// NewCompanyForm.js
import React,{useState} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewCompanyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  
  const handleAddCompany=  (e) => {


    

   

  }



  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const onSubmit = async (data) => {
    console.log({ data });
  
    // Access selectedImage within the function's scope (assuming it's defined elsewhere)
    if (!selectedImage) {
      console.error('Please select an image to upload');
      return; // Prevent unnecessary processing if no image is selected
    }
  
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("employeeNo", data.employeeNo);
    formData.append("email", data.email);
    formData.append("industry", data.industry);
    formData.append("phoneNo", data.phoneNo);
    formData.append("state", data.state);
    formData.append("website", data.website);
    formData.append('profilePicture', selectedImage);

    
  
  
  
    try {
      const response = await axios.post("http://localhost:7000/api/user/updateCompanyProfile", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
  
      console.log('Success:', response.data); 
      
      // Show success toast message
      toast.success(response.data.message || "Profile updated successfully");
  
      // Navigate to the company profile form page after a short delay to allow the toast to be displayed
      setTimeout(() => {
        navigate('/CompanyDashboard');
      }, 2000); // Adjust the delay time as needed
    } catch (error) {
      console.error("Error updating company profile:", error);
      toast.error(error.response?.data?.message || "An error occurred while updating your profile."); 
    }
  };
  
  return (
    <div
      style={{
        maxWidth: "800px",
        backgroundColor: "white",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "black",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
       Update Company Details
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            color: "black",
            gap: "15px",
          }}
        >
          <div style={{ flex: "1 1 45%" }}>
            <label
              htmlFor="name"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Company Name
            </label>
            <input
              id="name"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                outline: "none",
                boxSizing: "border-box",
              }}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>

          <div style={{ flex: "1 1 45%"  }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                color:"color",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Email
            </label>
            <input
              id="email"
              color="black"
              type="email"
              style={{
                width: "100%",
                padding: "8px",
                
                border: "1px solid #ccc",
                borderRadius: "5px",
                outline: "none",
                boxSizing: "border-box",
              }}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>

          <div style={{ flex: "1 1 45%" }}>
            <label
              htmlFor="phoneNo"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Phone
            </label>
            <input
              id="phoneNo"
              type="tel"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                outline: "none",
                boxSizing: "border-box",
              }}
              {...register("phoneNo", { required: true })}
            />
            {errors.phoneNo && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>

          <div style={{ flex: "1 1 45%" }}>
            <label
              htmlFor="website"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Website
            </label>
            <input
              id="website"
              type="url"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                outline: "none",
                boxSizing: "border-box",
              }}
              {...register("website", { required: true })}
            />
            {errors.website && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>

          <div style={{ flex: "1 1 45%" }}>
            <label
              htmlFor="industry"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Industry
            </label>
            <input
              id="industry"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                outline: "none",
                boxSizing: "border-box",
              }}
              {...register("industry", { required: true })}
            />
            {errors.industry && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>
          <div style={{ flex: "1 1 45%" }}>
            <label
              htmlFor="address"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Address
            </label>
            <input
              id="address"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                outline: "none",
                boxSizing: "border-box",
              }}
              {...register("address", { required: true })}
            />
            {errors.address && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>

          <div style={{ flex: "1 1 45%" }}>
            <label
              htmlFor="description"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Description
            </label>
            <textarea
              id="description"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                outline: "none",
                boxSizing: "border-box",
                resize: "vertical",
                minHeight: "100px",
              }}
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>

          <div style={{ flex: "1 1 45%" }}>
            <label
              htmlFor="employeeNo"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Number of Employees
            </label>
            <input
              id="employeeNo"
              type="number"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                outline: "none",
                boxSizing: "border-box",
              }}
              {...register("employeeNo", { required: true })}
            />
            {errors.employeeNo && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>

          <div style={{ flex: "1 1 45%" }}>
            <label
              htmlFor="country"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Country
            </label>
            <input
              id="country"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                outline: "none",
                boxSizing: "border-box",
              }}
              {...register("country", { required: true })}
            />
            {errors.country && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>

          <div style={{ flex: "1 1 45%" }}>
            <label
              htmlFor="state"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              State/Province
            </label>
            <input
              id="state"
              style={{
                width: "100%",
                color: "black",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                outline: "none",
                boxSizing: "border-box",
              }}
              {...register("state", { required: true })}
            />
            {errors.state && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>

          <div style={{ flex: "1 1 45%" }}>
            <label
              htmlFor="city"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              City
            </label>
            <input
              id="city"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                outline: "none",
                boxSizing: "border-box",
              }}
              {...register("city", { required: true })}
            />
            {errors.city && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>

          <div style={{ flex: "1 1 45%" }}>
            <label
              htmlFor="profilePicture"
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Profile Picture
            </label>
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                outline: "none",
                boxSizing: "border-box",
              }}
              onChange={handleImageChange}
            />
            {errors.profilePicture && (
              <span style={{ color: "red", fontSize: "12px" }}>
                This field is required
              </span>
            )}
          </div>
       
        </div>

        <button type="submit" style={{
          justifyItems:'center',
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s',
          marginTop: '20px',
        }} onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
           onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}>
          Update 
        </button>

        {/* <button
          onClick={handleAddCompany}
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Company
        </button> */}
      </form>
    </div>
  );
};

export default NewCompanyForm;

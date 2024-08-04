import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const CompanyProfile = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get("https://smartjobseeker-fe218b533e4f.herokuapp.com/api/user/companyUser",{
          headers: {
            'Content-Type': 'multipart/form-data', // Use multipart/form-data for image uploads
            'Authorization': `Bearer ${token}`
          }
        });
        
        setCompany(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!company) {
    return <div>No company data available.</div>;
  }

  return (
    <div style={{
      marginTop: '20px',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      background: '#fff',
      margin: '0 auto'
    }}>
      <div style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'block' }}>
          {company.profilePicture && (
            <img
              src={`https://smartjobseeker-fe218b533e4f.herokuapp.com/${company.profilePicture}`}
              alt="Company Profile"
              style={{ maxWidth: '450px', maxHeight: '150px', borderRadius: '100%' }}
            />
          )}
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'blue',
            margin: '0 0 10px 0'
          }}>{company.name}</h2>
          <p style={{ fontSize: '18px', color: 'gray', margin: '0' }}>{company.industry}</p>

          <button className="rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <a href="/AddCompany">Update Profile</a>
          </button>
        </div>
        <div className="flex font-sans text-red-600 flex-wrap justify-center items-center gap-x-12">
          <div>
            <FontAwesomeIcon icon={faPhoneAlt} color="lightblue" flip="horizontal" />
            <span className="font-sans text-md font-semibold text-gray-400 text-left ml-3">
              {company.phoneNo}
            </span>
          </div>
          <div>
            <FontAwesomeIcon icon={faEnvelope} color="lightblue" flip="horizontal" />
            <span className="font-sans text-md font-semibold text-black text-left ml-3">
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </span>
          </div>
          <div>
            <FontAwesomeIcon icon={faMapMarkerAlt} color="lightblue" />
            <span className="font-sans text-md font-semibold text-gray-400 text-left ml-3">
              {company.country}
            </span>
          </div>
        </div>
      </div>

      <hr className="mt-6  text-xl" />

      <div className="text-left py-2 text-black text-xl">
        <h4 className="font-sans font-bold text-start text-gray-500">Address:</h4>
        <p className="text-start font-sans text-md mt-2">{company.address}</p>
      </div>

      <div className="text-left py-2  text-blue text-xl">  
        <h4 className="font-sans font-bold text-start text-gray-500">Website:</h4>
        <p className="text-start text-blue-600 font-sans  mt-2">
          <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a>
        </p>
      </div>

      <div className="text-left py-2 text-black text-xl">
        <h4 className="font-sans font-bold text-start text-gray-500">Industry:</h4>
        <p className="text-start font-sans text-md mt-2">{company.industry}</p>
      </div>

      <div className="text-left py-2 text-black text-xl">
        <h4 className="font-sans font-bold text-start text-gray-500">Description:</h4>
        <p className="text-start font-sans text-md mt-2">{company.description}</p>
      </div>

      <div className="text-left py-2 text-black text-xl">
        <h4 className="font-sans font-bold text-start text-gray-500">Number of Employees:</h4>
        <p className="text-start  font-sans text-md mt-2">{company.employeeNo}</p>
      </div>
    </div>
  );
};

export default CompanyProfile;

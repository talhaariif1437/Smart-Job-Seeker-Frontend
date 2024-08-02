import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Companies() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/user/CompanyList');
        console.log('CompanyList response:', response.data); // Log the response to check the structure

        // Access the array of activities
        const data = response.data.users.map(activity => ({
          profilePicture: activity.profilePicture, 
          jobSeekerName: activity.name,
          id: activity._id  // Assuming _id is the correct field
        }));

        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError('Failed to fetch activities. Please try again later.');
      }
    };

    fetchData();
  }, []);

  const viewCompanyProfile = async (userId) => {
    console.log("User ID in viewCompanyProfile:", userId); // Log the userId to check if it is defined
    try {
      const response = await axios.get(`http://localhost:7000/api/user/singleUser/${userId}`);
      console.log('Company profile response:', response.data);
    } catch (error) {
      console.log('Error while fetching details:', error);
    }
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
      <div className="rounded-t mb-0 px-0 border-0">
        <div className="flex flex-wrap items-center px-4 py-2">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">Companies that Hiring</h3>
          </div>
          <div className="relative w-full max-w-full flex-grow flex-1 text-right">
            <button className="bg-blue-500 dark:bg-gray-100 text-white active:bg-blue-600 dark:text-gray-800 dark:active:text-gray-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
          </div>
        </div>
        <div className="block w-full">
          {activities.map((activity, index) => (
            <ul className="my-1" key={index}>
              <li className="flex px-4">
                <div className="w-9 h-9 rounded-full flex-shrink-0 my-2 mr-3">
                  <img src={`http://localhost:7000/${activity.profilePicture}`} alt="Profile" className="w-full h-full rounded-full" />
                </div>
                <div className="flex-grow flex items-center border-b border-gray-100 dark:border-gray-400 text-sm text-gray-600 dark:text-gray-100 py-2">
                  <div className="flex-grow flex justify-between items-center">
                    <div className="self-center">
                      {activity.jobSeekerName}
                    </div>
                    <div className="flex-shrink-0 ml-2">
                      <button
                        style={{ color: '#60A5FA', fontSize: '14px' }}
                        onClick={() => viewCompanyProfile(activity.id)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Companies;

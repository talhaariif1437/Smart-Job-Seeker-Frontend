import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TimeExchangePerson() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://smartjobseeker-fe218b533e4f.herokuapp.com/api/user/timeExchangeUsers'); // Replace with your actual API endpoint
        console.log(response.data); // Log the response to check the structure

        // Access the array of activities
        const data = response.data.result.data.map(activity => ({
          profilePicture: activity.profilePicture, // Ensure these fields exist in your API response
          jobSeekerName: activity.name
        }));

        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError('Failed to fetch activities. Please try again later.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
      <div className="rounded-t mb-0 px-0 border-0">
        <div className="flex flex-wrap items-center px-4 py-2">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">Time Exchange Job Seekers</h3>
          </div>
          <div className="relative w-full max-w-full flex-grow flex-1 text-right">
            <button className="bg-blue-500 dark:bg-gray-100 text-white active:bg-blue-600 dark:text-gray-800 dark:active:text-gray-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={()=> alert("Please Login first to check details !")}>See all</button>
          </div>
        </div>
        <div className="block w-full">
          {activities.map((activity, index) => (
            <ul className="my-1" key={index}>
              <li className="flex px-4">
                <div className="w-9 h-9 rounded-full flex-shrink-0 my-2 mr-3">
                  <img src={`https://smartjobseeker-fe218b533e4f.herokuapp.com/${activity.profilePicture}`} alt="Profile" className="w-full h-full rounded-full" />
                </div>
                <div className="flex-grow flex items-center border-b border-gray-100 dark:border-gray-400 text-sm text-gray-600 dark:text-gray-100 py-2">
                  <div className="flex-grow flex justify-between items-center">
                    <div className="self-center">
                      {activity.jobSeekerName}
                    </div>
                    <div className="flex-shrink-0 ml-2">
                      <a href="#" className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500" style={{ outline: 'none' }}>
                        View
                        <span>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="transform transition-transform duration-500 ease-in-out">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                          </svg>
                        </span>
                      </a>
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

export default TimeExchangePerson;

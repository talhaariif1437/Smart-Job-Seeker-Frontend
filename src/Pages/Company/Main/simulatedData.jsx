import React, { useState, useEffect } from 'react';

function RecentActivitiesComponent() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Simulated activities data
    const simulatedData = [
      {
        id: 1,
        type: 'today',
        iconColor: 'indigo-500',
        icon: (
          <svg className="w-9 h-9 fill-current text-indigo-50" viewBox="0 0 36 36">
            <path d="M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z"></path>
          </svg>
        ),
        postedJob: 'Nick Mark mentioned Sara Smith in a new post',
        action: 'View'
      },
      {
        id: 2,
        type: 'yesterday',
        iconColor: 'red-500',
        icon: (
          <svg className="w-9 h-9 fill-current text-red-50" viewBox="0 0 36 36">
            <path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z"></path>
          </svg>
        ),
        postedJob: 'The post Post Name was removed by Nick Mark',
        action: 'View'
      },
      // More activities...
    ];

    setActivities(simulatedData);
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
      <div className="rounded-t mb-0 px-0 border-0">
        <div className="flex flex-wrap items-center px-4 py-2">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">Recent Post Jobs</h3>
          </div>
          <div className="relative w-full max-w-full flex-grow flex-1 text-right">
            <button className="bg-blue-500 dark:bg-gray-100 text-white active:bg-blue-600 dark:text-gray-800 dark:active:text-gray-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
          </div>
        </div>
        <div className="block w-full">
          {activities.map(activity => (
            <React.Fragment key={activity.id}>
              <div className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                {activity.type === 'today' ? 'Today' : 'Yesterday'}
              </div>
              <ul className="my-1">
                <li className="flex px-4">
                  <div className={`w-9 h-9 rounded-full flex-shrink-0 bg-${activity.iconColor} my-2 mr-3`}>
                    {activity.icon}
                  </div>
                  <div className="flex-grow flex items-center border-b border-gray-100 dark:border-gray-400 text-sm text-gray-600 dark:text-gray-100 py-2">
                    <div className="flex-grow flex justify-between items-center">
                      <div className="self-center">
                        {activity.postedJob}
                      </div>
                      <div className="flex-shrink-0 ml-2">
                        <a href="#0" className="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500" style={{ outline: 'none' }}>
                          {activity.action}
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
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentActivitiesComponent;

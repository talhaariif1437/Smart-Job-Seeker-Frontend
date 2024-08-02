import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import StatisticsCards from './StatisticsCards';
import SocialTraffic from './SocialTraffic';
import RecentActivitiesComponent from './simulatedData';
// import TaskComponent from './simulatedData';


const Main = () => {
     const [isDark, setIsDark] = useState(false);
   
     const toggleTheme = () => {
       setIsDark(!isDark);
     };
   
     return (
       <div className={`min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white ${isDark ? 'dark' : ''}`}>
         
         
         <Header isDark={isDark} toggleTheme={toggleTheme} />
         <Sidebar />
            <div className=' h-full ml-14 mt-14 mb-10 md:ml-64'>
                <StatisticsCards />
                  <div className='grid grid-cols-1 lg:grid-cols-2 p-4 gap-4'>
                  <SocialTraffic/>
                  <RecentActivitiesComponent/> 
                  </div>

            </div>
         {/* Main content */}
       </div>
     );
   };
   
   export default Main;
import React, { Suspense } from 'react';
import 'regenerator-runtime/runtime';
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UseContextProvider } from "./contexts/StepperContext";

// Dynamic imports using React.lazy
const RegisterLogin = React.lazy(() => import('./Components/Auth/RegisterLogin/registerLogin'));
const Appbar = React.lazy(() => import('./scenes/global/Appbar'));
const Forgot = React.lazy(() => import('./Components/Auth/ForgotPassword/forgot'));
const ChangePassword = React.lazy(() => import('./Components/Auth/ChangePassword/changePassword'));
const Navbar = React.lazy(() => import('./scenes/global/Navbar'));
const UsersTable = React.lazy(() => import('./Components/Users/usersTable'));
const MainPage = React.lazy(() => import('./Components/MainPage/mainPage'));
const Dashboard = React.lazy(() => import('./scenes/dashboard'));
const Calendar = React.lazy(() => import('./scenes/calendar'));
const FAQ = React.lazy(() => import('./scenes/faq'));
const Bar = React.lazy(() => import('./scenes/bar'));
const Line = React.lazy(() => import('./scenes/line'));
const Geography = React.lazy(() => import('./scenes/geography'));
const Job = React.lazy(() => import('./Pages/Company/Job'));
const Form = React.lazy(() => import('./Pages/jobseeker/Form'));
const LandingPage = React.lazy(() => import('./Pages/landingpage/Landingpage'));
const JobSeekerProfile = React.lazy(() => import('./Pages/jobseeker/jobseeker/JobSeekerProfile'));
const JobDetails = React.lazy(() => import('./Pages/jobseeker/components/JobDetails'));
const JobCard = React.lazy(() => import('./Pages/Company/Cards'));
const AboutUs = React.lazy(() => import('./Pages/landingpage/About/AboutUs'));
const Contactus = React.lazy(() => import('./Pages/landingpage/ContactUS/ContactUs'));
const ResponsiveAppBar = React.lazy(() => import('./Components/mainNavbar/mainNavbar'));
const RecJobList = React.lazy(() => import('./Pages/Company/RecJobList'));
const InterJobList = React.lazy(() => import('./Pages/Company/InterJobList'));
const Main = React.lazy(() => import('./Pages/Company/Main/Main'));
const NewCompanyForm = React.lazy(() => import('./Pages/Company/NewCompanyForm/NewCompanyForm'));
const CompanyProfile = React.lazy(() => import('./Pages/Company/NewCompanyForm/CompanyProfile'));
const Protected = React.lazy(() => import('./Components/Protected'));
const VerfiyOtp = React.lazy(() => import('./Components/Auth/VerifyOtp/VerfiyOtp'));
const SetNewPassword = React.lazy(() => import('./Components/Auth/SetNewPassword/SetNewPassword'));
const JobSeekerForm = React.lazy(() => import('./Pages/jobseeker/jobseeker/JobSeekerForm'));
const ApplicantProfile = React.lazy(() => import('./Pages/Company/NewCompanyForm/ApplicantProfile'));
const JobseekersTable = React.lazy(() => import('./Components/Users/jobSeekerTable'));

function App() {
  const [theme, colorMode] = useMode();
  let token = localStorage.getItem("token");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <CssBaseline />
        <BrowserRouter>
          <div>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/Login" element={<RegisterLogin />} />
                <Route path="LandingPage" element={<Appbar />} />
                <Route path="/Forgot" element={<Forgot />} />
                <Route path="/VerifyOtp" element={<VerfiyOtp />} />
                <Route path="/SetNewPassword" element={<SetNewPassword />} />
                <Route path="/ChangePassword" element={<Protected Component={ChangePassword} />} />
                <Route path="/Dashboard" element={<Protected Component={Dashboard} />} />
                <Route path="/Navbar" element={<Navbar />} />
                <Route path="/usersTable" element={<UsersTable />} />
                <Route path="/Calendar" element={<Calendar />} />
                <Route path="/FAQ" element={<FAQ />} />
                <Route path="/Bar" element={<Bar />} />
                <Route path="/Line" element={<Line />} />
                <Route path="/Geography" element={<Geography />} />
                <Route path="/Job" element={<Job />} />
                <Route path='/form' element={
                  <UseContextProvider>
                    <Form />
                  </UseContextProvider>} />
                <Route path="/JobSeekerProfile" element={<Protected Component={JobSeekerProfile} />} />
                <Route path="/JobSeekerForm" element={<JobSeekerForm />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/jobDetails/:id" element={<JobDetails />} />
                <Route path="/jobcard" element={<JobCard />} />
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route path="/Contactus" element={<Contactus />} />
                <Route path="/mainNavbar" element={<ResponsiveAppBar />} />
                <Route path="/RecommendedJobs" element={<Protected Component={RecJobList} />} />
                <Route path="/InternationlJobs" element={<Protected Component={InterJobList} />} />
                <Route path="/CompanyDashboard" element={<Protected Component={Main} />} />
                <Route path="/AddCompany" element={<Protected Component={NewCompanyForm} />} />
                <Route path="/CompanyProfile" element={<Protected Component={CompanyProfile} />} />
                <Route path="/ApplicantProfile/:id" element={<Protected Component={ApplicantProfile} />} />
                <Route path="/JobseekersTable" element={<JobseekersTable />} />
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

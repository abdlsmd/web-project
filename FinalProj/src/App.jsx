import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './Users' 
import CreateUsers from './CreateUser'
import UpdateUsers from './UpdateUsers'
import LogIn from './LogIn'
import SignUp from './SignUp'
import SinlgeEvent from './SingleEvent'
import CreateEvents from './CreateEvents'
import UpdateEvents from './UpdateEvents'
import Nav from './Nav'
import Home from './Home'
import ForgetPassword from './ForgetPassword'
import ResetPassword from './ResetPassword'
import NewMember from './NewMember'
import EventHome from './EventHome'
import SocietyReg from './SocietyReg'
import EventList from './EventList'
import EventReg from './EventReg'
import EventRegForm from './EventRegForm'
import Testpage from './Testpage'
import EventDetail from './EventDetail'
import PresidentGallery from './PresidentGallery'
import EventListUpdate from './EventListUpdate'
import EventApprovalList from './EventApprovalList'
import MembereventHome from './MembereventHome'
import MemEventReq from './MemEventReq'
import PresidentApproval from './PresidentApproval'
import Teams from './Teams'
import Footer from './Footer'
import UpdateSReg from './UpdateSReg'
import SocietyRegForm from './SocietyRegForm'
import CreateSocietyReg from './CreateSocietyReg'
import About from './About'
import { AuthProvider } from './AuthProvider'
import Profile from './Profile'
import CreateProfile from './CreateProfile'
import UpdateProfile from './UpdateProfile'
import DashBoard from './DashBoard'
import Members from './Members'
import SocietyRegRequest from './SocietyRegRequest'
import MemberGallery from './MemberGallery'
import TeamHome from './TeamHome'


/**
 *
 */
function App() {

  return (
    <div>
      <AuthProvider>
      {/* <Nav /> */}
      <BrowserRouter>
        
          <Nav />
            <Routes>

            <Route path='/SocietyReg' element={<SocietyReg/>}></Route>
            <Route path='/SocietyRegRequest' element={<SocietyRegRequest/>}></Route>

            <Route path='/MemberGallery' element={<MemberGallery/>}></Route>
          



            {/* Teams */}
            <Route path='/team-home' element={<TeamHome/>}></Route>
          


           
             {/* Profile */}
             
            <Route path='/Profile' element={<Profile/>}></Route>
            <Route path='/createProfile' element={<CreateProfile/>}></Route>
            <Route path='/updateProfile/:id' element={<UpdateProfile/>}></Route>
              
              {/* MAIN DASHBORAD */}
            <Route path='/DashBoard/:userType' element={<DashBoard/>}></Route>
            <Route path='/members' element={<Members/>}></Route>  
           
         <Route path='/TestPage' element={<Testpage/>}></Route>

           <Route path='/home' element={<Home/>}></Route>

           <Route path='/register' element={<SignUp />}></Route>

           <Route path='/login' element={<LogIn />}></Route>
           <Route path='/' element={<Users />}></Route>
           <Route path='/create' element={<CreateUsers />}></Route>
           
           <Route path='/update/:id' element={<UpdateUsers />}></Route>
           
           {/* Events */}
           <Route path='/eventsList' element={<EventList/>} ></Route>
           <Route path='/EventListUpdate' element={<EventListUpdate/>} ></Route>
           <Route path='/EventApprovalList' element={<EventApprovalList/>} ></Route>

           <Route path='/MembereventHome' element={<MembereventHome/> } ></Route>
           <Route path='/MemEventReq' element={<MemEventReq /> } ></Route>
          
           
           <Route path='/event/:id' element={<EventDetail />} ></Route>

           <Route path='/createEvent' element={<CreateEvents />}></Route>
           <Route path='/updateEvents/:id' element={<UpdateEvents />}></Route>

           <Route path='/EventReg' element={<EventReg />}></Route>
           <Route path='/EventRegForm/:id' element={<EventRegForm />}></Route>

           {/* President dash board */}
           {/* <Route path='/PresidentDB' element={<PresidentDB/>}></Route> */}
           <Route path='/PresidentGallery' element={<PresidentGallery/>}></Route>
           <Route path='/PresidentApproval' element={<PresidentApproval/>}></Route>
           

           {/* New member dashboard */}
           <Route path='/NewMember' element={<NewMember/>}></Route>
           <Route path='/SocietyRegForm' element={<SocietyRegForm/>}></Route>
       

          {/* Society */}
          <Route path='/society' element={<SocietyReg/>}></Route>
          <Route path='/createSR' element={<CreateSocietyReg/>}></Route>
          <Route path='/updateSR/:id' element={<UpdateSReg/>}></Route>


          <Route path='/About' element={<About/>}></Route>
       





           <Route path='/eventHome' element={<EventHome/>}></Route>

           {/* Main Menu */}
           <Route path='/events' element={<SinlgeEvent/>}></Route>
           <Route path='/Teams' element={<Teams/>}></Route>



           <Route path='/forget-password' element={<ForgetPassword/>}></Route> 
           <Route path='/reset_password/:id/:token' element={<ResetPassword/>}></Route> 
        
         </Routes>
      
         </BrowserRouter>
      </AuthProvider>
      <Footer />
    
    </div>
  )
}

export default App

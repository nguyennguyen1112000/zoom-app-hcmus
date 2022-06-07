import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { ToastContainer } from 'react-toastify'
import PublicRoute from './router/publicRoute.jsx'
import PrivateRoute from './router/privateRoute'
import Header from './components/header/index.jsx'
import VerticalNav from './components/left-sidebar'
import Footer from './components/footer/index.jsx'
import LeftSideBar from './components/left-sidebar'
import StudentList from './views/student/list'
import Login from './views/authentication/login'
import NavBar from './components/navbar'
import RoomList from './views/room/list'
import StudentDetail from './views/student/detail'

import VerificationCollectData from './views/verification/collect_data'
import RealtimeVerify from './views/verification/realtime_verify'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import PageNotFound from './views/errorPage/pageNotFound'
import { Switch } from 'react-router-dom'
import FaceData from './views/data/FaceData'
import StudentVerificationS1 from './views/verification/step2'
import StudentVerificationResult from './views/verification/result'
import Profile from './views/profile/index'
import SubjectList from './views/subject/list'
import CreateSubject from './views/subject/create'
import EditSubject from './views/subject/edit'
import SubjectDetail from './views/subject/detail'
import CreateMeeting from './views/room/create'
import ProctorList from './views/proctor/list'
import RoomDetail from './views/room/detail'
import StudentVerificationS2 from './views/verification/id_verify'
import Setting from './views/verification/setting'
import VerifySession from './views/session/list'
import RoomSession from './views/session/list/room_session'
import SessionRoomDetail from './views/session/detail'
import CreateStudent from './views/student/create'
import StudentSessionDetail from './views/session/list/student_session'
import Privacy from './views/document/privacy'
import TermOfUse from './views/document/term_of_use'
import Contact from './views/document/contact'
//import VerificationClient from './views/verification'

function App() {
  //const user = useSelector((state) => state.auth.currentUser);
  const logIn = useSelector((state) => state.auth.isLoggedIn)
  // useEffect(() => {
  // }, [])
  return (
    <Router>
      <Switch>
        {/* <NavBar />
      <LeftSideBar /> */}
        <PublicRoute restricted={true} component={Login} path='/' exact />
        <PublicRoute restricted={true} component={Login} path='/signin' exact />
        {/* <PublicRoute
        restricted={false}
        component={VerificationStep1}
        path='/'
        exact
      /> */}
        <PublicRoute
          restricted={false}
          component={FaceData}
          path='/data/collect'
          exact
        />
        <PublicRoute
          restricted={false}
          component={Privacy}
          path='/privacy'
          exact
        />
        <PublicRoute
          restricted={false}
          component={TermOfUse}
          path='/term_of_use'
          exact
        />
        <PublicRoute
          restricted={false}
          component={Contact}
          path='/contact'
          exact
        />
        {/* <PublicRoute
          restricted={false}
          component={VerificationStep2}
          path='/verify/s2'
          exact
        /> */}
        {/* <PublicRoute
          restricted={false}
          component={VerificationResult}
          path='/verify/result/:id'
          exact
        /> */}

        {logIn && (
          <div className='page-wrapper' style={{ 'min-height': '722px' }}>
            {logIn && <NavBar />}
            {logIn && <VerticalNav />}
            <PrivateRoute component={StudentList} path='/' exact />
            <PrivateRoute component={StudentList} path='/student' exact />
            <PrivateRoute component={StudentDetail} path='/student/:id' exact />
            <PrivateRoute
              component={CreateStudent}
              path='/student/0/create'
              exact
            />
            <PrivateRoute component={RoomList} path='/room' exact />
            <PrivateRoute
              component={CreateMeeting}
              path='/room/0/create_meeting'
              exact
            />
            <PrivateRoute component={RoomDetail} path='/room/:id' exact />
            <PrivateRoute component={SubjectList} path='/subject' exact />
            <PrivateRoute
              component={CreateSubject}
              path='/subject/0/create'
              exact
            />
            <PrivateRoute
              component={EditSubject}
              path='/subject/update/:id'
              exact
            />
            <PrivateRoute component={SubjectDetail} path='/subject/:id' exact />

            <PrivateRoute
              component={StudentVerificationS2}
              path='/room/:id/verify/s2'
              exact
            />
            <PrivateRoute
              component={StudentVerificationS1}
              path='/room/:id/verify/s1'
              exact
            />

            <PrivateRoute
              component={RealtimeVerify}
              path='/room/:id/verify/now'
              exact
            />
            {/* <PrivateRoute component={RoomDetail} path='/room/:id' exact /> */}
            <PrivateRoute
              component={StudentVerificationResult}
              path='/room/:id/verify/result/:resultId'
              exact
            />
            <PrivateRoute component={ProctorList} path='/proctor' exact />
            <PrivateRoute
              component={RealtimeVerify}
              path='/verify/room/:id'
              exact
            />
            <PrivateRoute
              component={VerificationCollectData}
              path='/verify/data'
              exact
            />
            <PrivateRoute
              component={VerifySession}
              path='/identity/sessions'
              exact
            />
            <PrivateRoute
              component={RoomSession}
              path='/identity/sessions-room'
              exact
            />
            <PrivateRoute
              component={SessionRoomDetail}
              path='/identity/sessions-room/:id'
              exact
            />
            <PrivateRoute
              component={StudentSessionDetail}
              path='/identity/sessions-room/:id/:studentId'
              exact
            />
            <PrivateRoute component={Setting} path='/identity/settings' exact />
            <PrivateRoute component={Profile} path='/profile' exact />
            {/* <PublicRoute
          restricted={false}
          component={VerifyAccount}
          path="/verify"
          exact
        />
        <PrivateRoute component={CreateClass} path="/my-classes/create" exact />
        <PrivateRoute component={ClassList} isMyClasses={true} path="/" exact />
        <PrivateRoute
          component={ClassList}
          isMyClasses={true}
          path="/my-classes"
          exact
        />
        <PrivateRoute
          component={ClassList}
          isMyJoinedClasses={true}
          path="/joined-classes"
          exact
        />
        <PrivateRoute component={DetailClass} path="/my-classes/:code" exact />
        <PrivateRoute component={PublicClass} path="/classrooms/:code" exact />
        <PrivateRoute
          component={ReviewDetail}
          path="/classrooms/:code/reviews/:reviewId"
          exact
        />
        <PrivateRoute component={Setting} path="/setting" exact />
        <PrivateRoute component={Info} path="/profile/:id" exact />
        <PrivateRoute component={ManageAccounts} path="/admin/accounts" exact />
        <PrivateRoute
          component={ManageAdminAccounts}
          path="/admin/admin-accounts"
          exact
        />
        <PrivateRoute
          component={ManageClassrooms}
          path="/admin/classrooms"
          exact
        />
        <PrivateRoute component={Notifications} path="/notifications" exact /> */}
            {/* <PublicRoute restricted={false} component={Register} path='/' exact /> */}
            {logIn && <Footer />}
            <ToastContainer />
          </div>
        )}
        {/* <PublicRoute path='/404' restricted={false} component={PageNotFound} />
        <Redirect to='/404' /> */}
      </Switch>
    </Router>
  )
}

export default App

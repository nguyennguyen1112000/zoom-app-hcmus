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
import RoomDetail from './views/room/detail'
import ExaminationStaffList from './views/examination_staff/list'
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
          <div className='page-wrapper'>
            {logIn && <NavBar />}
            {logIn && <VerticalNav />}
            <PrivateRoute component={StudentList} path='/' exact />
            <PrivateRoute component={StudentList} path='/student' exact />
            <PrivateRoute component={StudentDetail} path='/student/:id' exact />
            <PrivateRoute component={RoomList} path='/room' exact />
            <PrivateRoute component={SubjectDetail} path='/subject/:id' exact />
            <PrivateRoute component={SubjectList} path='/subject' exact />
            <PrivateRoute
              component={CreateSubject}
              path='/subject/create'
              exact
            />
            <PrivateRoute
              component={EditSubject}
              path='/subject/update/:id'
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
            <PrivateRoute component={RoomDetail} path='/room/:id' exact />
            <PrivateRoute
              component={StudentVerificationResult}
              path='/room/:id/verify/result/:resultId'
              exact
            />
            <PrivateRoute
              component={ExaminationStaffList}
              path='/examination_staff'
              exact
            />
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

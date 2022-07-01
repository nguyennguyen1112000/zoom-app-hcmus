import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { ToastContainer } from 'react-toastify'
import PublicRoute from './router/publicRoute.jsx'
import PrivateRoute from './router/privateRoute'
import VerticalNav from './components/left-sidebar'
import Footer from './components/footer/index.jsx'
import LeftSideBar from './components/left-sidebar'
import StudentList from './pages/student/list'
import Login from './pages/authentication/login'
import NavBar from './components/navbar'
import RoomList from './pages/room/list'
import StudentDetail from './pages/student/detail'

import VerificationCollectData from './pages/verification/collect_data'
import { Redirect } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import FaceData from './pages/data/FaceData'
import StudentVerificationS1 from './pages/verification/step2'
import StudentVerificationResult from './pages/verification/result'
import Profile from './pages/profile/index'
import SubjectList from './pages/subject/list'
import CreateSubject from './pages/subject/create'
import EditSubject from './pages/subject/edit'
import SubjectDetail from './pages/subject/detail'
import CreateMeeting from './pages/room/create/meeting.jsx'
import ProctorList from './pages/proctor/list'
import RoomDetail from './pages/room/detail'
import StudentVerificationS2 from './pages/verification/id_verify'
import Setting from './pages/verification/setting'
import VerifySession from './pages/session/list'
import RoomSession from './pages/session/list/room_session'
import SessionRoomDetail from './pages/session/detail'
import CreateStudent from './pages/student/create'
import StudentSessionDetail from './pages/session/list/student_session'
import Privacy from './pages/document/privacy'
import TermOfUse from './pages/document/term_of_use'
import Contact from './pages/document/contact'
import Document from './pages/document/doc'
import CreateRoom from './pages/room/create'
import UpdateRoom from './pages/room/update'
import Home from './pages/authentication/home'
import { isEmbedded } from './helper/utils'
import zoomSdk from '@zoom/appssdk'
import { useEffect, useState } from 'react'
function App() {
  const logIn = useSelector((state) => state.auth.isLoggedIn)
  const [counter, setCounter] = useState(0)
  const embedded = isEmbedded()
  useEffect(() => {
    async function configureSdk() {
      // to account for the 2 hour timeout for config
      const configTimer = setTimeout(() => {
        setCounter(counter + 1)
      }, 120 * 60 * 1000)

      try {
        // Configure the JS SDK, required to call JS APIs in the Zoom App
        // These items must be selected in the Features -> Zoom App SDK -> Add APIs tool in Marketplace
        const configResponse = await zoomSdk.config({
          capabilities: [
            'getMeetingContext',
            'getSupportedJsApis',
            'showNotification',
            'openUrl',
            'authorize',
            'onAuthorized',
            'openUrl'
          ],
          version: '0.16.0'
        })
        console.log('App configured', configResponse)
        localStorage.setItem('isEmbedded', 'true')
      } catch (error) {
        console.log(error)
      }
      return () => {
        clearTimeout(configTimer)
      }
    }
    configureSdk()
  }, [counter])
  return (
    <Router>
      <Switch>
        {/* <NavBar />
      <LeftSideBar /> */}
        <PublicRoute restricted={true} component={Login} path='/' exact />
        <PublicRoute restricted={true} component={Login} path='/signin' exact />
        <PublicRoute
          restricted={true}
          component={() => <Home zoomSdk={zoomSdk} />}
          path='/home'
          exact
        />
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
        <PublicRoute
          restricted={false}
          component={Document}
          path='/doc'
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
          <div className='page-wrapper' style={{ 'min-height': '100vh' }}>
            <NavBar />
            <VerticalNav />
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
            <PrivateRoute component={CreateRoom} path='/room/0/create' exact />
            <PrivateRoute
              component={UpdateRoom}
              path='/room/update/:id'
              exact
            />
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
              component={StudentVerificationResult}
              path='/room/:id/verify/result/:resultId'
              exact
            />
            <PrivateRoute component={ProctorList} path='/proctor' exact />

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
              component={() => <RoomSession zoomSdk={zoomSdk} />}
              path='/identity/sessions-room'
              exact
            />
            <PrivateRoute
              component={SessionRoomDetail}
              path='/identity/sessions-room/:id'
              exact
            />
            <PrivateRoute
              component={() => <StudentSessionDetail zoomSdk={zoomSdk} />}
              path='/identity/sessions-room/:id/:studentId'
              exact
            />
            <PrivateRoute component={Setting} path='/identity/settings' exact />
            <PrivateRoute component={Profile} path='/profile' exact />

            {logIn && <Footer />}
            <ToastContainer />
          </div>
        )}
        {/* <Route path='/404' restricted={false} component={PageNotFound} />*/}
        {embedded ? <Redirect to='/home' /> : <Redirect to='/' />}
      </Switch>
    </Router>
  )
}

export default App

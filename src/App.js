import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { ToastContainer } from 'react-toastify'
import PublicRoute from './router/publicRoute.jsx'
import PrivateRoute from './router/privateRoute'
import VerticalNav from './components/left-sidebar'
import Footer from './components/footer/index.jsx'
import StudentList from './views/student/list'
import Login from './views/authentication/login'
import NavBar from './components/navbar'
import RoomList from './views/room/list'
import SignUp from './views/authentication/signup'
import PageNotFound from './views/error/404'
import ServerError from './views/error/500'
function App() {
  //const user = useSelector((state) => state.auth.currentUser);
  const logIn = useSelector((state) => state.auth.isLoggedIn)
  // useEffect(() => {
  // }, [])
  return (
    <Router>
      {/* <NavBar />
      <LeftSideBar /> */}
      <PublicRoute restricted={false} component={Login} path='/signin' exact />
      <Route component={SignUp} path='/signup' exact />
      <Route component={PageNotFound} path='/404' exact />
      <Route component={ServerError} path='/500' exact />


      {logIn && (
        <div className='page-wrapper'>
          {logIn && <NavBar />}
          {logIn && <VerticalNav />}
          <PrivateRoute component={StudentList} path='/student' exact />
          <PrivateRoute component={RoomList} path='/room' exact />

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
    </Router>
  )
}

export default App

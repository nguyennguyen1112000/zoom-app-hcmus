import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { ToastContainer } from 'react-toastify'
import PublicRoute from './router/publicRoute.jsx'
import NavBar from './components/navbar'
import Footer from './components/footer'
import LeftSideBar from './components/left-sidebar'
import StudentList from './views/student/list'
function App() {
  //const user = useSelector((state) => state.auth.currentUser);
  //const logIn = useSelector((state) => state.auth.isLoggedIn)
  return (
    <Router>
      <NavBar />
      <LeftSideBar />
      <div className='page-wrapper'>
        <PublicRoute
          restricted={false}
          component={StudentList}
          path='/'
          exact
        />
        {/* {logIn && <Header />}
        {logIn && <VerticalNav />} */}
        {/* <PublicRoute
          restricted={false}
          component={Login}
          path="/signin"
          exact
        />
        <PublicRoute
          restricted={false}
          component={Register}
          path="/signup"
          exact
        /> */}
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
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  )
}

export default App

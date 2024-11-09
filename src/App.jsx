import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import { AuthContextProvider, AuthUseUser } from './context/AuthContext'
import OnlyLoginUser from './components/OnlyLoginUser'
import SearchMovieContextProvider, { VideoContextProvider } from './context/SearchMovieContext'
import LoadingContextProvider, { UseLoadingContext } from './context/LoadingContext'
import Loading from './components/Loading'

const App = () => {
  // const {user} = AuthUseUser();
  const {loading} = UseLoadingContext();
  console.log(loading ? "loading":"false loading")
  return (
    <>
    <AuthContextProvider>
    <SearchMovieContextProvider>
    < VideoContextProvider >
    {loading && <Loading />}
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/profile" element={
        <OnlyLoginUser>
          <Profile/>
        </OnlyLoginUser> } />

    </Routes>
    </VideoContextProvider>
    </SearchMovieContextProvider>
    </AuthContextProvider>
   
    </>
  )
}

export default App
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contextProviders/contexts/UserContext"
import { AuthContext } from "../contextProviders/contexts/AuthContext"
import { SideNav } from "../components/navs/SideNav"
import { Navigate, Outlet } from "react-router-dom"
import { DashHeader } from "../components/headers/DashHeader"
import { checkAuthSession } from "../utils/helpers"
import { Modal } from "../components/modals/Modal"
import { ErrorPrompt } from "../components/modals/prompts/ErrorPrompt"

export const Dashboard = () => {
  const {user, fetchUserDetails, userFetchError } = useContext(UserContext)
  const {token} = useContext(AuthContext)
  const [isLoading,setIsLoading] = useState(true)


  useEffect(() => {
    // Check if user object is empty
    // if empty, fetch user details
    if (Object.keys(user).length === 0) {
      const setUserDetails = async () => {
        await fetchUserDetails(token);
      };

      setUserDetails();
    } else {
      // If user object is not empty, set isLoading to false
      setIsLoading(false);
    }
  }, [fetchUserDetails, token, user]);

  // console.log(isLoading)

  if(checkAuthSession() === false) return <Navigate to="/login" />

  return (
    <div className="flex h-screen">
      {userFetchError && <Modal element={<ErrorPrompt message="Failed to get user details" />} />}
      <SideNav />
      <div className="w-full bg-slate-50 h-full p-5 overflow-auto">
        <DashHeader user={user} isFetching={isLoading} />
        <Outlet />
      </div>
    </div>
  )
}

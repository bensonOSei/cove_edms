import { faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons"
import { SideNavLink } from "../buttons/SideNavLink"

export const SideNav = () => {
  return (
    <div className="w-full max-w-fit bg-blue-800/5 h-full p-5">
        <div className="bg-blue-300/20 p-4 rounded-md mb-5">
            <h1 className="text-3xl text-blue-900 font-black">Cove Inc.</h1>
            <h2 className="text-blue-900 text-xs font-bold">EDMS</h2>
        </div>
        <SideNavLink icon={faUsers} text="Employees" to="." />
        <SideNavLink icon={faUserPlus} text="Add Employee" to="/add" />
    </div>

  )
}

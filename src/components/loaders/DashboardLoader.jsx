import { DashHeaderLoader } from "../headers/DashHeaderLoader"

export const DashboardLoader = () => {
  return (
    <div className="w-full p-5">
        <DashHeaderLoader />
        <div className="w-full bg-blue-800/5 animate-pulse p-3 py-6 mt-10 h-96 rounded-md" ></div>
    </div>
  )
}

import { useParams } from "react-router-dom";
import { EmployeeDetailRibbon } from "../components/ribbons/EmployeeDetailRibbon";
import { useCallback, useState, useEffect, useContext } from "react";
import axios from 'axios';
import { BACKEND_URL, BACKEND_URL_API } from "../utils/constants";
import { EmployeeDetailsLoader } from "../components/loaders/EmployeeDetailsLoader";
import { AuthContext } from "../contextProviders/contexts/AuthContext";

export const EmployeeDetails = () => {
  const { id } = useParams();
  const [employeeDetails, setEmployeeDetails] = useState({})
  const [employmentDetails, setEmploymentDetails] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { token } = useContext(AuthContext)

  const fetchEmployeeDetails = useCallback(async () => {

    if(token === null) return
    try {
      const response = await axios.get(`${BACKEND_URL_API}/employees/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          }
      })
      setEmployeeDetails(response.data.data)
      const { employment } = response.data.data
      setEmploymentDetails(employment)
      console.log(response.data.data);
      // setLoading(false)
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [id, token])

  useEffect(() => {
    fetchEmployeeDetails()
  },[fetchEmployeeDetails])
  // console.log(id);

  if(loading) return <EmployeeDetailsLoader />

  if(error) return <h1 className="text-2xl font-bold mt-10 mb-2 text-red-600">Error fetching employee details</h1>

	return (
		<div className="w-full p-3">
			<div className="flex gap-6">
				<div className="w-full max-w-sm h-72 bg-blue-800/5 rounded-lg">
					{/* Image goes here */}
          <img src={`${BACKEND_URL}${employeeDetails.passportPicPath}`} alt="Employee" className="w-full h-full object-contain" />
				</div>
				<div className="w-full bg-blue-800/0 rounded-lg p-4 flex justify-between">
					<div>
            <EmployeeDetailRibbon title="Name" desc={`${employeeDetails.lastName} ${employeeDetails.otherName || ""}, ${employeeDetails.firstName}`} />

            {/* <EmployeeDetailRibbon title="Age" desc="25" /> */}

            <EmployeeDetailRibbon title="Date of Birth" desc={employeeDetails.dateOfBirth} />  

            <EmployeeDetailRibbon title="Gender" desc={employeeDetails.gender} />  
            <EmployeeDetailRibbon title="Marital Status" desc={employeeDetails.maritalStatus} />  
					</div>

          <div className="ml-4">
            <EmployeeDetailRibbon title="Phone Number" desc={employeeDetails.phoneNumber} />
            <EmployeeDetailRibbon title="Email" desc={employeeDetails.email} />
            <EmployeeDetailRibbon title="Address" desc={employeeDetails.correspondenceAddress} />
          </div>

          <div className="ml-4">
            <EmployeeDetailRibbon title="TIN" desc={employeeDetails.TIN} />
            <EmployeeDetailRibbon title="SSNIT" desc={employeeDetails.SSNIT} />
          </div>


				</div>

			</div>
        <h1 className="text-2xl font-bold mt-10 mb-2 ">Employment Details</h1>
        <div className="w-full bg-blue-800/5 rounded-lg p-4 flex gap-20">
          <div>
            <EmployeeDetailRibbon title="Employment Id" desc={employmentDetails.id} />

            <EmployeeDetailRibbon title="Designation" desc={employmentDetails.designation} />

            <EmployeeDetailRibbon title="Type" desc={employmentDetails.employeeType} />

            <EmployeeDetailRibbon title="Branch" desc={employmentDetails.branch} />

            <EmployeeDetailRibbon title="Head of Department Name" desc={employmentDetails.headOfDepartment} />
          </div>
          <div>
            <EmployeeDetailRibbon title="Contract Frequency" desc={employmentDetails.contractFreqCode} />

            <EmployeeDetailRibbon title="Contract Duration" desc={employmentDetails.contractDuration + "years"} />

            <EmployeeDetailRibbon title="Commencement Date" desc={employmentDetails.startAt} />

            <EmployeeDetailRibbon title="Contract End Date" desc={employmentDetails.endAt} />
          </div>
        </div>
		</div>
	);
};

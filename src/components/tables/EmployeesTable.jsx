import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { BACKEND_URL_API } from "../../utils/constants";
import { AuthContext } from "../../contextProviders/contexts/AuthContext";
import { TableLoader } from "./TableLoader";
import { EmployeesRow } from "./EmployeesRow";

export const EmployeesTable = () => {
	const [employees, setEmployees] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { token } = useContext(AuthContext);

	const fetchEmployees = useCallback(async () => {
		setLoading(true);
		setError(null);

		if (token !== null)
			try {
				const response = await axios.get(
					BACKEND_URL_API + "/employees",
					{
						headers: {
							Authorization: "Bearer " + token,
							Accept: "application/json",
						},
					}
				);
				// console.log(typeof response.data);
				const { data } = response.data;
				setEmployees(data);
			} catch (error) {
				setError(error.response.data.message);
				// console.log(error)
			} finally {
				setLoading(false);
			}
	}, [token]);

	useEffect(() => {
		fetchEmployees();
	}, [fetchEmployees]);

	if (loading) {
		return <TableLoader />;
	}
	return (
		<div className="p-3 w-full">
			<table className="w-full border-spacing-5">
				<thead>
					<tr className="text-left bg-slate-100 rounded-md">
						<th className="p-3">Staff ID</th>
						<th>Name</th>
						<th>Contract Type</th>
						<th>Designation</th>
						<th>Branch</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					{error ? (
						<tr>
							<td
								colSpan="5"
								className="text-center text-red-500 font-bold">
								Error: {error}
							</td>
						</tr>
					) : (
						<EmployeesRow list={employees} />
					)}
				</tbody>
			</table>
		</div>
	);
};

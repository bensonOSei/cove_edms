import { Link } from "react-router-dom";

export const EmployeesTable = () => {
	return (
		<>
			<table>
				<thead>
					<tr className="text-left">
						<th>Staff ID</th>
						<th>Name</th>
						<th>Contract Type</th>
						<th>Designation</th>
						<th>Branch</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td className="p-2">1</td>
						<td>John Doe</td>
						<td>Permanent</td>
						<td>Manager</td>
						<td>Head Office</td>
						<td>
							<Link to={'employee/1234'} className="bg-slate-100 hover:bg-slate-200 font-bold py-2 px-4 rounded">
								View
							</Link>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

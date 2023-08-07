import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export const EmployeesRow = ({ list }) => {
	if (list.length === 0)
		return (
			<tr>
				<td
					colSpan="5"
					className="text-center text-red-500 font-bold">
					No Employees Found
				</td>
			</tr>
		);
	return (
		<>
			{list.map((employee) => (
				<tr key={employee.id}>
					<td className="p-3">{employee.id}</td>
					<td>
						{employee.lastName}, {employee.firstName}
					</td>
					<td>{employee.employment.employeeType}</td>
					<td>{employee.employment.designation}</td>
					<td>{employee.employment.branch}</td>
					<td>
						<Link
							to={`/${employee.id}`}
							className="bg-slate-100 hover:bg-slate-200 font-bold py-2 px-4 rounded">
							View
						</Link>
					</td>
				</tr>
			))}
		</>
	);
};

EmployeesRow.propTypes = {
    list: PropTypes.array.isRequired,
}

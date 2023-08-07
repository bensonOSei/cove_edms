import { EmployeesTable } from "../components/buttons/EmployeesTable";

export const Employees = () => {
	return (
		<div className="mt-3 w-full">
			<h1 className="text-2xl font-bold p-2 text-blue-800">
				Employee
			</h1>

      <div className="flex flex-col p-3">
        <EmployeesTable />
      </div>

		</div>
	);
};

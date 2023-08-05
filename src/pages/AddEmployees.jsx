import { Input } from "../components/form/Input";
import { useState } from "react";
import { Select } from "../components/form/Select";
export const AddEmployees = () => {
	const [employeeDetails, setEmployeeDetails] = useState({});

	const handleOnChange = (e) => {
		setEmployeeDetails({
			...employeeDetails,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="mt-3 w-full">
			<h1 className="text-2xl font-bold p-2">Add Employee</h1>
			{/* <p>* required</p> */}

			<div className="overflow-y-auto">
				<form action="#">
					<div className="flex gap-4">
						<div className="relative flex w-full max-w-xs bg-blue-50 border border-blue-100 h-72 rounded-lg">
							{/* add passport picture input field */}

							<input
								type="file"
								className="w-full h-full"
								name="passport_pic"
								id="passport_pic"
							/>
							<label
								htmlFor="passport_pic"
								className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-200 p-2 rounded-md font-bold text-blue-700 cursor-pointer hover:bg-blue-300 transition">
								Upload a picture
							</label>
						</div>

						<div className="bg-blue-50 border border-blue-100 rounded-md p-3 w-full">
							<h2 className="text-blue-700 text-lg font-semibold mb-2 opacity-50">
								Personal Details
							</h2>
							<div className="flex items-center gap-2 mb-3">
								<Input
									label="First Name"
									id="first_name"
									placeholder="Enter employee's first name"
									onChange={handleOnChange}
									required
								/>

								<Input
									label="Other Name"
									id="other_name"
									placeholder="Enter employee's other name"
									onChange={handleOnChange}
								/>

								<Input
									label="Last Name"
									id="last_name"
									placeholder="Enter employee's last name"
									onChange={handleOnChange}
									required
								/>
							</div>

							<div className="flex items-center gap-2">
								<Input
									type="date"
									label="Date of Birth"
									id="date_of_birth"
									placeholder="Enter employee's first name"
									onChange={handleOnChange}
									required
								/>

								<Select
									label="Gender"
									id="gender_code"
									onChange={handleOnChange}
									options={[
										{ value: 1, label: "Male" },
										{ value: "2", label: "Female" },
									]}
								/>

								<Select
									label="Marital Status"
									id="marital_status_code"
									onChange={handleOnChange}
									options={[
										{ value: 1, label: "Married" },
										{ value: "2", label: "Single" },
										{ value: 3, label: "Widowed" },
									]}
								/>
							</div>
						</div>
					</div>

					<div className="flex items-stretch gap-4 mt-3">
						<div className="bg-blue-50 border border-blue-100 p-3 rounded-lg">
							<h2 className="text-blue-700 text-lg font-semibold mb-2 opacity-50">
								Contact Details
							</h2>
							<div className="flex items-center gap-2 mb-3">
								<Input
									type="email"
									label="Email"
									id="email"
									placeholder="Enter employee's email"
									onChange={handleOnChange}
									required
								/>

								<Input
									type="tel"
									label="Phone Number"
									id="phone_number"
									placeholder="Enter employee's phone number"
									onChange={handleOnChange}
									required
								/>
							</div>
							<Input
								label="Address"
								id="correspondence_address"
								placeholder="Enter employee's address"
								onChange={handleOnChange}
								required
							/>
						</div>
						<div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex-1">
							<h2 className="text-blue-700 text-lg font-semibold mb-2 opacity-50">
								Legal Data
							</h2>
							<Input
								label="TIN"
								id="TIN"
								placeholder="Enter employee's TIN"
								onChange={handleOnChange}
								required
							/>

							<Input
								label="SSNIT"
								id="SSNIT_no"
								placeholder="Enter employee's SSNIT number"
								onChange={handleOnChange}
								required
							/>
						</div>
					</div>

            <h2 className="text-2xl font-bold text-blue-600 mt-8">Employment Details</h2>
          <div className="flex items-stretch gap-4 mt-3">
            
          </div>
				</form>
			</div>
		</div>
	);
};

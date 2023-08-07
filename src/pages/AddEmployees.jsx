import { Input } from "../components/form/Input";
import { useContext, useEffect, useState, useRef } from "react";
import { Select } from "../components/form/Select";
import {
	BACKEND_URL_API,
	BRANCH,
	CONTRACT_FREQUENCY,
	DESIGNATIONS,
	EMPLOYMENT_TYPE,
	JOB_GRADE,
	TITLES,
} from "../utils/constants";
import SubmitButton from "../components/form/SubmitButton";
import {
	checkDateOfBirth,
	getFromStorage,
	isImage,
	saveToStorage,
	isAcceptableFileSize,
	fillFormFields,
	clearFormFields,
	deleteFromStorage,
} from "../utils/helpers";
import { ConfirmBox } from "../components/popups/ConfirmBox";
import { Alert } from "../components/popups/Alert";
// import placeholder from "../assets/img-placeholder.svg";
import axios from "axios";
import { AuthContext } from "../contextProviders/contexts/AuthContext";
import { Modal } from "../components/modals/Modal";
import { LoadingPrompt } from "../components/modals/prompts/LoadingPrompt";

export const AddEmployees = () => {
	const [formData, setFormData] = useState({}),
		[showAlert, setShowAlert] = useState(false),
		[alertMessage, setAlertMessage] = useState(""),
		[showPrompt, setShowPrompt] = useState(false),
		{ token } = useContext(AuthContext),
		formRef = useRef(null),
		[isSending, setIsSending] = useState(false);

	// console.log(formData);

	const handleOnChange = (e) => {
		// if(e.target.type === "file") return
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const save = (e) => {
		e.preventDefault();
		// check if formData is empty
		if (Object.keys(formData).length === 0) {
			console.log("here");
			displayAlert("Please fill in the form before submitting");
			return;
		}
		console.log(formData);
		saveToStorage("formData", formData);
		displayAlert("Employee details saved successfully");
	};

	const displayAlert = (message) => {
		setAlertMessage(message);
		setShowAlert(true);
	};

	const closeAlert = () => {
		setShowAlert(false);
		setAlertMessage("");
	};

	const handlePassportPic = (e) => {
		// check type
		if (!isImage(e.target.files[0])) {
			displayAlert("Please select an image file");
			return;
		}

		// check size
		if (!isAcceptableFileSize(e.target.files[0])) {
			displayAlert("Image size must be less than 1MB");
			return;
		}

		const file = e.target.files[0];
		// console.log(file);
		setFormData({
			...formData,
			passport_pic: file,
		});
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		// check if formData is empty
		if (Object.keys(formData).length === 0) {
			displayAlert("Please fill in the form before submitting");
			return;
		}

		// check if all required fields are filled
		const requiredFields = document.querySelectorAll("[required]");
		requiredFields.forEach((field) => {
			if (field.value === "") {
				displayAlert("Please fill in all required fields");
				return;
			}
		});

		// check if date of birth is valid
		if (!checkDateOfBirth(formData.date_of_birth)) {
			displayAlert("Employee must be at least 18 years old");
			return;
		}

		// check if passport pic is set
		if(formData.passport_pic === null ) {
			displayAlert("Please add a passport size picture of employee");
			return;
		}

		employ();
	};

	const employ = () => {
		setIsSending(true);
		axios
			.post(BACKEND_URL_API + "/employees", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${token}`,
					Accept: "application/json",
				},
			})
			.then((res) => {
				console.log(res.data);
				displayAlert("Employee added successfully");
				clearFormFields(formRef.current);
				deleteFromStorage("formData");
			})
			.catch((err) => {
				console.log(err.response.data);
				displayAlert(err.response.data.message);
			})
			.finally(() => {
				setIsSending(false);
			});
	};

	const fillFormWithPreviousData = () => {
		const data = JSON.parse(getFromStorage("formData"));
		const form = formRef.current;

		if (data) {
			fillFormFields(form, data);
			setShowPrompt(false);
		}
	};

	useEffect(() => {
		if (getFromStorage("formData")) {
			setShowPrompt(true);
		}
	}, []);

	useEffect(() => {
		console.log(formData)

	},[formData])

	useEffect(() => {
		
		// console.log(formRef.current)
		if (showAlert) {
			setTimeout(() => {
				closeAlert();
			}, 3000);
		}
	}, [showAlert]);
	return (
		<div className="mt-6 w-full">
			{ isSending && <Modal element={< LoadingPrompt />} /> }
			<ConfirmBox
				show={showPrompt}
				message="Do you want to continue from previous session?"
				onAccept={fillFormWithPreviousData}
				onCancel={() => setShowPrompt(false)}
			/>
			<Alert
				show={showAlert}
				closeAlert={() => setShowAlert(false)}
				message={alertMessage}
			/>
			<h1 className="text-2xl font-bold p-2 text-blue-800">
				Add Employee
			</h1>
			{/* <p>* required</p> */}

			<div className="overflow-y-auto">
				<form
					ref={formRef}
					onSubmit={handleFormSubmit}>
					<div className="flex gap-6">
						<div className="relative flex w-full max-w-xs bg-slate-100/60 border border-slate-200/50 h-72 rounded-lg">
							{/* add passport picture input field */}
							{formData.passport_pic && (
								<img
									src={URL.createObjectURL(
										formData.passport_pic
									)}
									alt=""
									className="w-full h-full object-contain"
								/>
							)}

							<input
								type="file"
								className="w-full h-full"
								name="passport_pic"
								id="passport_pic"
								onChange={handlePassportPic}
								accept="image/jpeg, image/jpg, image/png"
								defaultValue={formData.passport_pic && ""}
							/>
							<label
								htmlFor="passport_pic"
								className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-200 p-2 rounded-md font-bold text-blue-700 cursor-pointer hover:bg-blue-300 transition opacity-70 hover:opacity-100">
								{formData.passport_pic
									? "Change image"
									: "Add image"}
							</label>
						</div>

						<div className="bg-slate-100/60 border border-slate-200/50  rounded-md p-6 w-full">
							<h2 className="text-blue-700 text-lg font-semibold mb-2 opacity-50">
								Personal Details
							</h2>
							<div className="flex items-center gap-4 mb-3">
								<Select
									label="Title"
									id="title"
									onChange={handleOnChange}
									required
									options={TITLES}
								/>

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

							<div className="flex items-center gap-4">
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
									required
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
									required
								/>
							</div>
						</div>
					</div>

					<div className="flex items-stretch gap-6 mt-6">
						<div className="bg-slate-100/60 border border-slate-200/50  p-6 rounded-lg">
							<h2 className="text-blue-700 text-lg font-semibold mb-2 opacity-50">
								Contact Details
							</h2>
							<div className="flex items-center gap-4 mb-3">
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
						<div className="bg-slate-100/60 border border-slate-200/50  p-6 rounded-lg flex-1">
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

					<h2 className="text-2xl font-bold text-blue-600 mt-8">
						Employment Details
					</h2>
					<div className="flex items-stretch gap-6 mt-6">
						<div className="bg-slate-100/60 border border-slate-200/50  p-6 rounded-lg flex-1">
							<div className="flex items-center gap-4 mb-3">
								<Select
									label="Designation"
									id="designation"
									onChange={handleOnChange}
									required
									options={DESIGNATIONS}
								/>

								<Select
									label="Job Grade"
									id="job_grade"
									onChange={handleOnChange}
									required
									options={JOB_GRADE}
								/>

								<Select
									label="Employment Type"
									id="employee_type"
									onChange={handleOnChange}
									required
									options={EMPLOYMENT_TYPE}
								/>
							</div>
							<div className="flex items-center gap-4 mb-3">
								<Input
									label="Head of Department Name"
									id="head_of_department"
									onChange={handleOnChange}
									required
									placeholder="Enter name of head of department"
								/>

								<Select
									label="Contract Frequency"
									id="contract_freq_code"
									onChange={handleOnChange}
									required
									options={CONTRACT_FREQUENCY}
								/>

								<Input
									label="Contract Duration"
									id="contract_duration"
									type="number"
									onChange={handleOnChange}
									required
									placeholder="Enter duration of contract"
								/>

								<Select
									label="Branch"
									id="branch"
									onChange={handleOnChange}
									required
									options={BRANCH}
								/>
							</div>
						</div>
					</div>

					<div className="flex gap-4 w-full max-w-md py-6">
						<SubmitButton text="Employ" />
						<SubmitButton
							text="Save and Continue later"
							onClick={save}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

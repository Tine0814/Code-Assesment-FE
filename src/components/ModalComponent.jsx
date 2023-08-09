import React, { useState } from "react";
import { motion } from "framer-motion";

const ModalComponent = ({ onClick }) => {
  const [employeeID, setEmployeeID] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!employeeID || !fullName) {
      setValidationError("Please fill out all fields.");
      return;
    }

    setValidationError("");

    console.log("Submitting form data:", employeeID, fullName);

    const formData = {
      name: fullName,
      employeeID: employeeID,
    };

    try {
      const response = await fetch(
        "https://code-assesment-be.vercel.app/api/employee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSubmitted(true);
        setEmployeeID("");
        setFullName("");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <motion.div
          className="realtive min-w-[30vw] min-h-[60vh] flex flex-col items-center bg-[#FFFFEB] rounded-lg "
          animate={{ scale: [0, 1.2, 1] }}
          transition={{
            duration: 1.4,
            ease: "easeInOut",
          }}
        >
          <div className="relative w-full h-[15vh] bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-lg">
            <button
              onClick={onClick}
              className="absolute right-3 text-[30px] font-bold"
            >
              x
            </button>
          </div>
          <div className="text-center p-10 ">
            <h1 className="mb-5 text-[20px] font-semibold text-[#252323] ">
              Add Employee
            </h1>
            <form onSubmit={handleSubmit} className="w-[300px]">
              <div className="mb-6">
                <label
                  htmlFor="employeeID"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Employee ID
                </label>
                <input
                  type="number"
                  id="employeeID"
                  value={employeeID}
                  onChange={(e) => setEmployeeID(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500"
                />
              </div>

              {validationError && (
                <p className="text-red-500 text-sm mb-5">{validationError}</p>
              )}

              <motion.button
                whileHover={{ scale: 1.3 }}
                type="submit"
                className="text-white w-full bg-[#EA1179]  font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 "
              >
                Submit
              </motion.button>
            </form>
            {submitted && (
              <p className="mt-4 text-green-600">
                Data submitted successfully!
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ModalComponent;

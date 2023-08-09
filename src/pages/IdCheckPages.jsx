import React, { useState } from "react";
import NavComponent from "../components/NavComponent";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../components/ModalComponent";

const IdCheckPages = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employeeId) {
      setError("Employee ID is required");
      return;
    } else {
      setError("");
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/employee/${employeeId}`
      );

      if (!response.ok) {
        alert("ID does not exist");
      } else {
        const employee = await response.json();

        try {
          const response = await fetch("http://localhost:4000/api/attendance", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(employee),
          });

          if (response.ok) {
            const json = await response.json();
            navigate("/employee/Attendance");
            console.log(json);
          } else {
            throw new Error("Failed to fetch data");
          }
        } catch (error) {
          console.log(error); // Handle the error
        }
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const ShowModal = () => {
    if (modal) {
      return <ModalComponent onClick={() => setModal(false)} />;
    } else {
      return;
    }
  };

  return (
    <>
      {ShowModal()}
      <NavComponent
        button={
          <motion.button
            onClick={() => setModal(true)}
            whileHover={{ scale: 1.3 }}
            type="submit"
            className="text-white w-full bg-[#EA1179]  font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 "
          >
            Add Employee
          </motion.button>
        }
      />
      <div className="h-screen w-full flex justify-center items-center">
        <div className=" p-10 w-[400px] shadow-md rounded-md">
          <form onSubmit={handleSubmit} className="w-[300px]">
            <div className="mb-6">
              <label
                htmlFor="ID"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Employee ID
              </label>
              <input
                type="number"
                id="id"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500"
              />
              {error && <p className="text-red-500 text-sm mb-5">{error}</p>}
            </div>

            <motion.button
              whileHover={{ scale: 1.3 }}
              type="submit"
              className="text-white w-full bg-[#EA1179]  font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 "
            >
              Submit
            </motion.button>
          </form>
        </div>
      </div>
    </>
  );
};

export default IdCheckPages;

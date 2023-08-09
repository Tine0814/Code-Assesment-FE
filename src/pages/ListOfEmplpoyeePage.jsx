import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavComponent from "../components/NavComponent";

const ListOfEmplpoyeePage = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/api/attendance");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleTimeInUpdate = async (employeeId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/attendance/${employeeId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            timeIn: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
          }),
        }
      );

      if (response.ok) {
        setEmployees((prevEmployees) => {
          return prevEmployees.map((employee) => {
            if (employee._id === employeeId) {
              return {
                ...employee,
                timeIn: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }),
              };
            }
            return employee;
          });
        });
      }
    } catch (error) {
      console.error("Error updating timeIn:", error);
    }
  };
  const handleTimeOutUpdate = async (employeeId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/attendance/${employeeId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            timeOut: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
          }),
        }
      );

      if (response.ok) {
        setEmployees((prevEmployees) => {
          return prevEmployees.map((employee) => {
            if (employee._id === employeeId) {
              return {
                ...employee,
                timeOut: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }),
              };
            }
            return employee;
          });
        });
      }
    } catch (error) {
      console.error("Error updating timeIn:", error);
    }
  };

  return (
    <>
      <NavComponent />
      <div className="w-full mt-6 h-screen flex justify-center items-center">
        <div className="flex flex-col w-[500px] h-[600px]">
          <h1 className="text-center mb-5 font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Attendance
          </h1>
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Time In
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Time Out
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee, index) => (
                      <tr
                        className="border-b dark:border-neutral-500"
                        key={index}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {employee.employeeID}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {employee.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {!employee.timeIn ? (
                            <motion.button
                              whileHover={{ scale: 1.3 }}
                              type="button" // Change type to "button"
                              className="text-white w-full bg-[#EA1179] font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5"
                              onClick={() => handleTimeInUpdate(employee._id)}
                            >
                              Time In
                            </motion.button>
                          ) : (
                            employee.timeIn
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {!employee.timeOut && employee.timeIn ? (
                            <motion.button
                              whileHover={{ scale: 1.3 }}
                              type="button"
                              className="text-white w-full bg-[#EA1179] font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5"
                              onClick={() => handleTimeOutUpdate(employee._id)}
                            >
                              Time Out
                            </motion.button>
                          ) : (
                            employee.timeOut
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListOfEmplpoyeePage;

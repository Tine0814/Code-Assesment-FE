import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavComponent from "../components/NavComponent";

const ListOfEmplpoyeePage = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://code-assesment-be.vercel.app/api/attendance/"
        );
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
        `https://code-assesment-be.vercel.app/api/attendance/${employeeId}`,
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
        `https://code-assesment-be.vercel.app/api/attendance/${employeeId}`,
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
      <div class="w-full mt-6 min-h-screen flex justify-center items-center">
        <div class="flex flex-col w-full max-w-md md:max-w-xl h-auto">
          <h1 class="text-center mb-5 font-extrabold text-transparent text-3xl md:text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Attendance
          </h1>
          <div class="overflow-x-auto sm:-mx-2 md:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-2 md:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full text-left text-sm font-light">
                  <thead class="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" class="px-4 sm:px-6 py-2 md:py-4">
                        ID
                      </th>
                      <th scope="col" class="px-4 sm:px-6 py-2 md:py-4">
                        Name
                      </th>
                      <th scope="col" class="px-4 sm:px-6 py-2 md:py-4">
                        Time In
                      </th>
                      <th scope="col" class="px-4 sm:px-6 py-2 md:py-4">
                        Time Out
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee, index) => (
                      <tr class="border-b dark:border-neutral-500" key={index}>
                        <td class="whitespace-nowrap px-4 sm:px-6 py-2 md:py-4 font-medium">
                          {employee.employeeID}
                        </td>
                        <td class="whitespace-nowrap px-4 sm:px-6 py-2 md:py-4">
                          {employee.name}
                        </td>
                        <td class="whitespace-nowrap px-4 sm:px-6 py-2 md:py-4">
                          {!employee.timeIn ? (
                            <motion.button
                              whileHover={{ scale: 1.3 }}
                              class="text-white w-full bg-[#EA1179] font-medium rounded-lg text-sm sm:w-auto px-3 py-2"
                              onClick={() => handleTimeInUpdate(employee._id)}
                            >
                              Time In
                            </motion.button>
                          ) : (
                            employee.timeIn
                          )}
                        </td>
                        <td class="whitespace-nowrap px-4 sm:px-6 py-2 md:py-4">
                          {!employee.timeOut && employee.timeIn ? (
                            <motion.button
                              whileHover={{ scale: 1.3 }}
                              class="text-white w-full bg-[#EA1179] font-medium rounded-lg text-sm sm:w-auto px-3 py-2"
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

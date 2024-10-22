import React, { useState } from 'react';
import { CSVLink } from 'react-csv';

const EmployeeSearch = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [employeeList, setEmployeeList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // 用於添加新的員工
  const handleAddEmployee = () => {
    const newEmployee = {
      employeeId,
      name,
      department,
      position
    };
    setEmployeeList([...employeeList, newEmployee]);
    setFilteredData([...employeeList, newEmployee]);
    setEmployeeId('');
    setName('');
    setDepartment('');
    setPosition('');
  };

  // 用於篩選員工
  const handleSearch = () => {
    const results = employeeList.filter(emp =>
      (employeeId === '' || emp.employeeId.includes(employeeId)) &&
      (name === '' || emp.name.includes(name)) &&
      (department === '' || emp.department.includes(department)) &&
      (position === '' || emp.position.includes(position))
    );
    setFilteredData(results);
  };

  // 用於選取員工
  const handleSelectEmployee = (employee) => {
    if (selectedEmployees.includes(employee)) {
      setSelectedEmployees(selectedEmployees.filter(emp => emp !== employee));
    } else {
      setSelectedEmployees([...selectedEmployees, employee]);
    }
  };

  const headers = [
    { label: "Employee ID", key: "employeeId" },
    { label: "Name", key: "name" },
    { label: "Department", key: "department" },
    { label: "Position", key: "position" }
  ];

  return (
    <div>
      <h1>Employee Management</h1>

      {/* 員工資料輸入區域 */}
      <div>
        <h2>Add Employee</h2>
        <label>
          Employee ID:
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </label>

        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Department:
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </label>

        <label>
          Position:
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </label>

        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>

      {/* 員工資料查詢區域 */}
      <div>
        <h2>Search Employees</h2>
        <label>
          Employee ID:
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </label>

        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Department:
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </label>

        <label>
          Position:
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </label>

        <button onClick={handleSearch}>Search</button>
      </div>

      {/* 顯示查詢結果 */}
      <h2>Search Results</h2>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((emp, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(emp)}
                    onChange={() => handleSelectEmployee(emp)}
                  />
                </td>
                <td>{emp.employeeId}</td>
                <td>{emp.name}</td>
                <td>{emp.department}</td>
                <td>{emp.position}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No results found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 下載選取的員工資料為 CSV */}
      {selectedEmployees.length > 0 && (
        <CSVLink
          data={selectedEmployees}
          headers={headers}
          filename={"selected_employees.csv"}
        >
          Download Selected Employees as CSV
        </CSVLink>
      )}
    </div>
  );
};

export default EmployeeSearch;

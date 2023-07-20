import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

function AddExpense() {
  const [data, setData] = useState({
    expense_type: "",
    description: "",
    amount: "",
  });
  const [selectedType, setselectedType] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // formdata.append("image", data.image);
    axios
      .post("http://localhost:5000/expense/add", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.sucess) {
          // we want to diply sucess message
          navigate("/employee");
        } else if (res.data.isExist) {
          alert("NIC already exist. Please check your NIC!!!");
        } else if (res.data.isError) {
          alert("Please check your details!!!");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSelectChange = (e) => {
    const capitalizedType = capitalize(e.target.value);
    setselectedType(capitalizedType);
  };

  const capitalize = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <div className="d-flex flex-column align-items-center pt-5">
      <div className="d-flex flex-column align-items-center pt-4 ">
        <div className="white-box">
          <div className="d-flex flex-column align-items-center">
            <h2>Add New Expense </h2>
          </div>

          <form className="row g-3 w-100" onSubmit={handleSubmit}>
            <label>
              Expense Type
              <Form.Select
                size="sm"
                aria-label="Default select example w-50"
                name="selectedType"
                value={selectedType}
                onChange={handleSelectChange}
              >
                <option value="">--Select</option>
                <option value="food">Food</option>
                <option value="travel">Travel</option>
                <option value="others">Others</option>
              </Form.Select>
              <div>
                <input
                  type="text"
                  className="form-control"
                  value={selectedType}
                  placeholder="Select type"
                  readOnly
                  autoComplete="off"
                  onChange={(e) =>
                    setData({ ...data, expense_type: e.target.value })
                  }
                />
              </div>
            </label>
            <div className="col-12">
              <label htmlFor="inputDescription" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="inputDescription"
                placeholder="Description"
                autoComplete="off"
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputAmount" className="form-label">
                Amount
              </label>
              <input
                type="number"
                className="form-control"
                id="inputAmount"
                placeholder="Amount"
                onChange={(e) => setData({ ...data, amount: e.target.value })}
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddExpense;

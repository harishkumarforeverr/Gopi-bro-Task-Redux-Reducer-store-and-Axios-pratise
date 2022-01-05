import React, { useState } from "react";
import "./App.scss";
import "antd/dist/antd.css";
import { Button, Input, Table } from "antd";

const App = () => {
  const [formDate, setFormDate] = useState([]);
  const [inputfields, setInputFields] = useState({
    name: "",
    age: "",
  });
  const [id, setID] = useState(0);
  const [ShowAdd, setShowAdd] = useState(true);

  const handleInputChange = (e) => {
    console.log(e.target.name, e.target.value);

    const obj = {
      [e.target.name]: e.target.value,
    };
    setInputFields((prevSnapShot) => ({
      ...prevSnapShot,
      ...obj,
    }));
  };

  const handleAddSubmit = (e) => {
    if (inputfields.name && inputfields.age) {
      setFormDate((prevSnapShot) => [
        ...prevSnapShot,
        {
          name: inputfields.name,
          age: inputfields.age,
          id,
        },
      ]);
      setInputFields((prevSnapShot) => ({
        name: "",
        age: "",
      }));
      setID((prevSnapShot) => prevSnapShot + 1);
    }
  };
  const handleRemoveUser = (id) => {
    const newData = formDate.filter((item) => item.id !== id);
    setFormDate(newData);
  };

  const handleEditUser = (id) => {
    const getUser = formDate.find((item) => item.id === id);
    console.log(getUser);
    setInputFields({
      name: getUser.name,
      age: getUser.age,
      id: getUser.id,
    });
    setShowAdd(false);
  };
  const handleUpdateSubmit = () => {
    if (inputfields.name && inputfields.age) {
      setFormDate((prevSnapShot) => {
        return prevSnapShot.map((item) => {
          if (item.id === inputfields.id) {
            return {
              name: inputfields.name,
              age: inputfields.age,
              id: item.id,
            };
          }
          return item;
        });
      });
      setInputFields((prevSnapShot) => ({
        name: "",
        age: "",
        id: prevSnapShot.id,
      }));
      setShowAdd(true);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Edit",
      dataIndex: "Edit",
      key: "Edit",
      render: (text, record) => (
        <Button type="primary"
          onClick={() => {
            // console.log(record);
            handleEditUser(record.id);
          }}
        >
   Edit
        </Button>
      ),
    },
    {
      title: "Delete",
      dataIndex: "Delete",
      key: "Delete",
      render: (text, record) => (
        <Button type="primary" danger
          onClick={() => {
            // console.log(record);
            handleRemoveUser(record.id);
          }}
        >
        Delete
        </Button>
      ),
    },
  ];
  return (
    <div>
      <div className="container">
        <h1> Welcome To Survery Record </h1>
        <div className="container__items">
          <div>
            <label> Username : </label>
            <Input
              name="name"
              value={inputfields.name}
              onChange={handleInputChange}
              type="text"
            />
          </div>
          <div>
            <label> Age : </label>
            <Input
              value={inputfields.age}
              onChange={handleInputChange}
              name="age"
              type="number"
            />
          </div>
          <div>
            {ShowAdd ? (
              <Button 
              className="add"
              type="primary" type="primary" onClick={handleAddSubmit} type="submit">
                {" "}
                Add{" "}
              </Button>
            ) : (
              <Button 
              
              className="update"
              onClick={handleUpdateSubmit} type="submit">
                {" "}
                Update{" "}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div>
        {formDate ? (
          <div>
            {/* {formDate.map((item) => {
              return (
                <div className="users" key={item.id}>
                  <h1> {item.name}</h1>
                  <h2> {item.age}</h2>
                  <Button
                    type="primary"
                    onClick={() => {
                      handleEditUser(item.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      handleRemoveUser(item.id);
                    }}
                    type="primary"
                    danger
                  >
                    {" "}
                    Remove
                  </Button>
                </div>
              );
            })} */}
            <Table
              key="table"
              columns={columns}
              dataSource={formDate}
              pagination={false}
            />
          </div>
        ) : (
          <p> No Users Record Found</p>
        )}
      </div>
    </div>
  );
};

export default App;

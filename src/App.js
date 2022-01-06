import React, { useState, useEffect } from "react";
import "./App.scss";
import "antd/dist/antd.css";
import { Button, Input, Table, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { connect, useDispatch } from "react-redux";
import {
  FetchUserDisptacher,
  AddUserDispatch,
  EditUserDispatcher,
  DeleteUserDispatch,
} from "./Action/Action";

const App = (props) => {
  const { formDate: ReduxFormData, id: Reduxid } = props;
  const [inputfields, setInputFields] = useState({
    name: "",
    age: "",
    id: "",
    key: "",
  }); 
  const [loading, setLoading] = useState(false);
  const [ShowAdd, setShowAdd] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchUserDisptacher(setLoading));
  }, []);

  const handleInputChange = (e) => {
    const obj = {
      [e.target.name]: e.target.value,
    };
    setInputFields((prevSnapShot) => ({
      ...prevSnapShot,
      ...obj,
    }));
  }; 
  const handleAddSubmit = async (e) => {
    if (inputfields.name && inputfields.age) {
      const obj = {
        name: inputfields.name,
        age: inputfields.age,
        id: Reduxid + 1,
        key: Reduxid + 1,
      }; 
      dispatch(AddUserDispatch(obj, setLoading));
      setInputFields({
        name: "",
        age: "",
        id: "",
        key: "",
      });
    }
  };

  const handleEditUser = (id) => {
    const getUser = ReduxFormData.find((item) => item.id === id); 
    setInputFields({
      name: getUser.name,
      age: getUser.age,
      id: getUser.id,
      key: getUser.key,
    });
    setShowAdd(false);
  };
  const handleUpdateSubmit = async () => {
    setLoading(true);
    if (inputfields.name && inputfields.age) {
      const data = {
        name: inputfields.name,
        age: inputfields.age,
        id: inputfields.id,
        key: inputfields.id,
      };
      dispatch(EditUserDispatcher(data, setLoading));
      setInputFields({
        name: "",
        age: "",
        id: "",
        key: "",
      });
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
        <Button
          type="primary"
          onClick={() => { 
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
        <Button
          type="primary"
          danger
          onClick={() => {
            dispatch(DeleteUserDispatch(record.id, setLoading));
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  const antIcon = <LoadingOutlined spin />;
  return (
    <div>
      <Spin spinning={loading} indicator={antIcon} style={{}} size="large" />
      <div className="container">
        <h1> Welcome To Survery Record </h1>
        <div className="container__items">
          <div className="container__items__inputs">
            <div>
              <label> Username </label>
              <Input
                name="name"
                value={inputfields.name}
                onChange={handleInputChange}
                type="text"
              />
            </div>
            <div>
              <label> Age </label>
              <Input
                value={inputfields.age}
                onChange={handleInputChange}
                name="age"
                type="number"
              />
            </div>
          </div>
          <div>
            {ShowAdd ? (
              <Button className="add" onClick={handleAddSubmit} type="submit">
                {" "}
                Add{" "}
              </Button>
            ) : (
              <Button
                className="update"
                onClick={handleUpdateSubmit}
                type="submit"
              >
                {" "}
                Update{" "}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div>
        {ReduxFormData ? (
          <div>
            <Table
              key="table"
              columns={columns}
              dataSource={ReduxFormData}
              // pagination={false}
              pagination={{
                pageSize: 8,
                size: "small",
              }}
              rowClassName={(record) =>
                record.id === inputfields.id && "disabled-row"
              }
            />
          </div>
        ) : (
          <p> No Users Record Found</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    formDate: state.formdata,
    id: state.id,
  };
};

export default connect(mapStateToProps)(App);

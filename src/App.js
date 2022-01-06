import React, { useState, useEffect } from "react";
import "./App.scss";
import "antd/dist/antd.css";
import { Button, Input, Table, message, Spin } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
const App = () => {
  const [formDate, setFormDate] = useState([]);
  const [inputfields, setInputFields] = useState({
    name: "",
    age: "",
  });
  const [loading, setLoading] = useState(false);
  const [id, setID] = useState(101);
  const [ShowAdd, setShowAdd] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Here is used Get MethodsetLoading
      setLoading(true);
      try {
        const respo = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        console.log(respo);
        if (respo.request.status === 200) {
          message.success("Data is fetched Sucessfully ");
          respo.data.reverse().slice(0,10).map((obj) => {
            setFormDate((prevSnapShot) => [
              ...prevSnapShot,
              {
                id: obj.id,
                name: obj.title.slice(0, 10),
                age: obj.id,
                key: obj.id,
              },
            ]);
            return undefined;
          });
        } else {
          message.success("Data is fetched failed ");
        }
      } catch (e) {
        console.log(e);
        message.success("Data is fetched failed ");
      }
      setLoading(false);
    };
    fetchData();
  }, []);
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

  const handleAddSubmit = async (e) => {
    if (inputfields.name && inputfields.age) {
      const obj = {
        name: inputfields.name,
        age: inputfields.age,
        id,
        key: id,
      };
      // Here is used Post method
      setLoading(true);
      try {
        const respo = await axios({
          method: "post",
          url: "https://jsonplaceholder.typicode.com/posts",
          data: {
            title: obj.name,
            body: obj.age,
            userId: id,
          },
        });
        if (respo.request.status === 200 || respo.request.status === 201) {
          console.log(respo);
          message.success("Data is stored Sucess full ");

          setFormDate((prevSnapShot) => [obj, ...prevSnapShot]);
          setInputFields((prevSnapShot) => ({
            name: "",
            age: "",
          }));
          setID((prevSnapShot) => prevSnapShot + 1);
        } else {
          new Error("some went worng");
        }
      } catch (error) {
        console.log("error occured", error);
        message.error("Data is faied to store");
      }
    }
    setLoading(false);
  };
  const handleRemoveUser = async (id) => {
    try {
      setLoading(true);
      const respo = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "DELETE",
        }
      );

      if (respo.request.status === 200 || respo.request.status === 201) {
        console.log(respo, "okkkkkkkkkkkkkkkkk");
        message.success("Data is deleted  Sucessfully ");
        const newData = formDate.filter((item) => item.id !== id);
        setFormDate(newData);
      } else {
        new Error("some went worng");
      }
    } catch (e) {
      message.error("Data is not deleted");
    }
    setLoading(false);
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
  const handleUpdateSubmit = async () => {
    setLoading(true);
    if (inputfields.name && inputfields.age) {
      try {
        const data = {
          name: inputfields.name,
          age: inputfields.age,
          id: inputfields.id,
          key: inputfields.id,
        };
        const respo = await axios.put(
          `https://jsonplaceholder.typicode.com/posts/${inputfields.id}`,
          data
        );
        console.log(respo.data, "hahahhahahah");
        message.success("Data is updated Sucessfully ");
        setFormDate((prevSnapShot) => {
          return prevSnapShot.map((item) => {
            if (item.id === inputfields.id) {
              return {
                name: inputfields.name,
                age: inputfields.age,
                id: item.id,
                key: item.id,
              };
            }
            return item;
          });
        });
      } catch (error) {
        console.log("error occured", error);
        message.error("Data is failed to store");
      }

      setInputFields((prevSnapShot) => ({
        name: "",
        age: "",
        id: "",
      }));
      setShowAdd(true);
    }
    setLoading(false);
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
            console.log(record);
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
            console.log(record);
            handleRemoveUser(record.id);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];
  const rowSelection = {
    getCheckboxProps: (record) => ({
      disabled: record.id === inputfields.id,
      // Column configuration not to be checked
      // name: record.name,
    }),
  };

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
              <Button
                className="add"
                type="primary"
                type="primary"
                onClick={handleAddSubmit}
                type="submit"
              >
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
        {formDate ? (
          <div>
            <Table
              key="table"
              columns={columns}
              dataSource={formDate}
              // pagination={false}
              pagination={{
                pageSize: 8,
                size: "small",
              }}
              // rowSelection={{
              //   ...rowSelection,
              // }}
              rowClassName={record => record.id=== inputfields.id && "disabled-row"}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    console.log(record);
                    return {
                      disabled: true,
                    };
                  }, // click row
                  onDoubleClick: (event) => {}, // double click row
                  onContextMenu: (event) => {}, // right button click row
                  onMouseEnter: (event) => {}, // mouse enter row
                  onMouseLeave: (event) => {}, // mouse leave row
                };
              }}
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

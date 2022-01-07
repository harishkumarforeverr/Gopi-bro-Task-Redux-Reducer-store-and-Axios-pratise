import axios from "axios";
import { message } from "antd";
import { AddUser, EditUser, DeleteUser, FetchUser } from "../Store/Store";
export const FetchUserDisptacher = (setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      const respo = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_limit=4"
        // {
        //   params: {
        //     _limit: 6
        //    }
        // }
      );
      if (respo.request.status === 200 || respo.request.status === 201) {
        message.success("Data is fetched Sucessfully ");
        const newState = respo.data.map((obj,i) => ({
          id: i+1 ,
          name: obj.title.slice(0, 10),
          age: i+1,
          key: i+1,
          updated:false
        }));
        dispatch({
          type: FetchUser,
          newState,
        });
      } else {
        message.success("Data is fetched failed ");
      }
    } catch (e) {
      message.success("Data is fetched failed ");
    }
    setLoading(false);
  };
};

export const AddUserDispatch = (
  { name, age, id, key },
  setLoading,
  setInputFields
) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const respo = await axios({
        method: "post",
        url: "https://jsonplaceholder.typicode.com/posts",
        data: {
          title: name,
          body: age,
          userId: id,
          updated:false
        },
      });
      if (respo.request.status === 200 || respo.request.status === 201) {
        message.success("Data is stored Sucess full ");
        dispatch({
          type: AddUser,
          newFormData: {
            name,
            age,
            id,
            key,
            updated:false
          },
        });
        setInputFields({
          name: "",
          age: "",
          id: "",
          key: "",
        });
      } else {
        new Error("some went worng");
      }
    } catch (error) {
      message.error("Data is faied to store");
    }
    setLoading(false);
  };
};
export const EditUserDispatcher = (
  newUpadtedUser,
  setLoading,
  setInputFields
) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      const respo = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${newUpadtedUser.id}`,
        newUpadtedUser
      );
      if (respo.request.status === 200 || respo.request.status === 201) {
        message.success("Data is updated Sucessfully ");
      }
    } catch (error) {
      message.error("Data is failed to store");
    }
    dispatch({
      type: EditUser,
      newUpadtedUser,
    });
    setInputFields({
      name: "",
      age: "",
      id: "",
      key: "",
    });
    setLoading(false);
  };
};
export const DeleteUserDispatch = (id, setLoading) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      const respo = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "DELETE",
        }
      );

      if (respo.request.status === 200 || respo.request.status === 201) {
        message.success("Data is deleted  Sucessfully ");
      } else {
        new Error("some went worng");
      }
    } catch (e) {
      message.error("Data is not deleted");
    }
    dispatch({
      type: DeleteUser,
      id,
    });
    setLoading(false);
  };
};

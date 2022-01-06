import axios from "axios";
import { message } from "antd";
import { AddUser, EditUser, DeleteUser, FetchUser } from "../Store/Store";
export const FetchUserDisptacher = (setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      const respo = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",{
          params: {
            _limit: 6
           }
        }
      );
      if (respo.request.status === 200 || respo.request.status === 201) {
        message.success("Data is fetched Sucessfully "); 
        const newState = respo.data
          .reverse()
          .map((obj) => ({
            id: obj.id,
            name: obj.title.slice(0, 10),
            age: obj.id,
            key: obj.id,
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

export const AddUserDispatch = ({ name, age, id, key }, setLoading) => {
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
          },
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
export const EditUserDispatcher = (newUpadtedUser, setLoading) => {
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

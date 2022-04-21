import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import useToggle from "./useToggle";

const TodoList = () => {
  const [item, setItem] = useState([]);
  const [inputData, setInputData] = useState("");
  const [toggle, setToggle] = useToggle();
  const [isEdited, setIsEdited] = useState();

  const addItem = () => {
    if (!inputData) {
    } else if (inputData && !toggle) {
      setItem(
        item.map((data) => {
          if (data.id === isEdited) {
            return { ...data, name: inputData };
          }
          return data;
        })
      );
      setInputData("");
      setToggle(true);
      setIsEdited(null);
    } else {
      const allInputData = {
        id: Date.now(),
        name: inputData,
      };

      const newInputData = [...item, allInputData];

      setItem(newInputData);
      setInputData("");
      console.log(newInputData);
    }
  };

  const deleteItem = (Id) => {
    console.log(Id);
    const updatedItem = item.filter((data) => {
      return data.id !== Id;
    });
    setItem(updatedItem);
  };

  const editItem = (Id) => {
    console.log(Id);

    let newEditItem = item.find((data) => {
      return data.id === Id;
    });
    console.log(newEditItem);
    setInputData(newEditItem.name);
    setToggle(false);
    setIsEdited(Id);
  };

  return (
    <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
      <div className="mb-4">
        <h1 className="text-grey-darkest">Todo List</h1>
        <div className="flex mt-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
            placeholder="Add Todo"
            value={inputData}
            onChange={(e) => {
              setInputData(e.target.value);
            }}
          />

          {toggle ? (
            <button
              className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
              onClick={() => addItem()}
            >
              <FaPlus />
            </button>
          ) : (
            <button
              className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
              onClick={() => {
                addItem();
              }}
            >
              {" "}
              <FaEdit />{" "}
            </button>
          )}
        </div>
        <div>
          <div className=" mt-5">
            {item &&
              item.map((data) => {
                return (
                  <div className="flex mb-4 items-center" key={data.id}>
                    <h3 className="w-full text-grey-darkest">{data.name}</h3>
                    <button
                      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
                      onClick={() => editItem(data.id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
                      onClick={() => deleteItem(data.id)}
                    >
                      {" "}
                      <FaTrash />{" "}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;

import React, { useState, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { columnsFromBackend } from "./modelList";
import { FaCheck } from "react-icons/fa6";
const TaskDetail = ({ item, event, model }) => {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [startDate, setStartDate] = useState(item.start_date);
  const [endDate, setEndDate] = useState(item.end_date);
  const [status, setStatus] = useState(item.status);
  const [priority, setPriority] = useState(item.priority);
  const [type, setType] = useState(item.type);

  const [inputName, setInputName] = useState(name);
  const [inputDescription, setInputDescription] = useState(description);
  let column = [];
  if (model === "Kanban") column = columnsFromBackend;

  const [showDescription, setShowDescription] = useState(() => {
    if (description === null || description === "") return false;
    else return true;
  });
  const [showName, setShowName] = useState(() => {
    if (name === null || name === "") return false;
    else return true;
  });
  const inputRef = useRef(null);
  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 backdrop-blur-[2px] flex justify-center items-center">
      <div className="h-[80vh] w-[70vw] min-h-96 rounded-3xl bg-neutral-50">
        {/* Title */}
        <div className="p-2 flex justify-between bg-gradient-to-r from-purple-800 via-blue-600 to-purple-400 overflow-hidden rounded-t-3xl">
          <div className="p-2 flex items-center justify-center">
            <h2 className="font-bold text-2xl text-white">Task Detail</h2>
          </div>
          <div className="p-2">
            <button onClick={event}>
              <IoCloseOutline className="text-3xl font-bold text-gray-950 cursor-pointer" />
            </button>
          </div>
        </div>

        <div className="flex h-5/6 ">
          <div className="w-2/3 h-full  overflow-y-auto no-scrollbar px-6 py-4 ">
            {/* Name task*/}
            {showName && (
              <button
                className=" w-full min-h-10 max-h-[20vh] overflow-y-auto no-scrollbar text-left hover:bg-gray-200"
                onClick={() => {
                  setShowName(!showName);
                  setTimeout(() => {
                    if (inputRef.current) {
                      inputRef.current.focus(); // Focus vào input
                    }
                  }, 0);
                }}
              >
                <h2 className="text-2xl font-semibold">{name}</h2>
              </button>
            )}
            {!showName && (
              <div className="flex items-center gap-1">
                <input
                  placeholder="Add name"
                  ref={inputRef}
                  type="text"
                  defaultValue={name}
                  className="w-5/6 p-2 resize-y border-2 border-gray-400 text-2xl font-semibold"
                  onChange={(e) => setInputName(e.target.value)}
                ></input>
                <div>
                  <button
                    className="p-2  border-2 bg-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500 "
                    onClick={() => {
                      setName(inputName);
                      setShowName(true);
                    }}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="p-2   border-2 bg-gray-100  text-black rounded-xl hover:shadow-lg hover:shadow-gray-500 "
                    onClick={() => setShowName(true)}
                  >
                    <IoCloseOutline />
                  </button>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mt-8">
              <h3 className="font-semibold text-black">Description</h3>
              {showDescription && (
                <button
                  className="w-5/6 mt-1  flex justify-start items-start min-h-20 max-h-[30vh] overflow-y-auto no-scrollbar hover:bg-gray-200"
                  onClick={() => setShowDescription(!showDescription)}
                >
                  <p className="w-full text-left">{description}</p>
                </button>
              )}
              {!showDescription && (
                <div>
                  <textarea
                    className="w-5/6 min-h-20 p-2 resize-y border-2 border-gray-400 "
                    placeholder={
                      description === null || description === ""
                        ? "Add description"
                        : ""
                    }
                    defaultValue={description || ""}
                    onChange={(e) => setInputDescription(e.target.value)}
                  ></textarea>
                  <div>
                    <button
                      className="p-2 w-20 border-2 bg-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500 "
                      onClick={() => {
                        setShowDescription(true);
                        setDescription(inputDescription);
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="p-2 ml-4 w-20 border-2 bg-gray-100  text-black rounded-xl hover:shadow-lg hover:shadow-gray-500 "
                      onClick={() => setShowDescription(true)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Start date */}
            <div className="flex gap-10 mt-10">
              <div className="">
                <h3 className="font-semibold text-black">Start date</h3>
                <DatePicker
                  defaultValue={
                    startDate !== null ? dayjs(startDate, "YYYY-MM-YY") : ""
                  }
                  format={"DD/MM/YYYY"}
                  onChange={(value) => {
                    setStartDate(value.toDate());
                  }}
                />
              </div>

              <div className="">
                <h3 className="font-semibold text-black">End date</h3>
                <DatePicker
                  defaultValue={
                    endDate !== null ? dayjs(endDate, "YYYY-MM-YY") : ""
                  }
                  format={"DD/MM/YYYY"}
                  onChange={(value) => {
                    setEndDate(value.toDate());
                  }}
                />
              </div>
            </div>

            {/* State */}
            <div className="mt-5">
              <h3 className="font-semibold text-black">Status</h3>
              <Select
                defaultValue={status !== null ? status : ""}
                style={{
                  width: "30%",

                  borderWidth: 1,
                  borderRadius: "7px",
                }}
                dropdownStyle={{ maxHeight: 100 }}
                onChange={(value) => {
                  setStatus(value);
                }}
              >
                <Select.Option value="opt1">Opt1</Select.Option>
                <Select.Option value="opt2">opt2</Select.Option>
              </Select>
            </div>

            {/* Priority */}
            <div className="mt-5">
              <h3 className="font-semibold text-black">Priority</h3>
              <Select
                defaultValue={priority !== null ? status : ""}
                style={{
                  width: "30%",

                  borderWidth: 1,
                  borderRadius: "7px",
                }}
                dropdownStyle={{ maxHeight: 100 }}
                onChange={(value) => {
                  setPriority(value);
                }}
              >
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
              </Select>
            </div>
          </div>

          <div className="w-1/3 h-full  overflow-y-auto no-scrollbar px-6 py-4 border-l-2 relative mt-4">
            {/* type */}
            <div className="">
              <Select
                size="large"
                defaultValue={type}
                style={{
                  width: 160,
                  borderWidth: 2,
                  borderColor: "black",
                  borderRadius: "9px",
                  height: 36,
                  fontSize: "18px",
                }}
                dropdownStyle={{ maxHeight: 100 }}
                options={Object.values(column).map((column) => ({
                  value: column.title,
                  label: column.title,
                }))}
                onChange={(value) => {
                  setType(value);
                }}
              />
            </div>

            {/* Assignee */}
            <div className="mt-6 grid grid-cols-3">
              <div className="flex justify-start items-center">
                <h3>Assignee</h3>
              </div>
              <div className="col-span-2">
                <Select
                  size="large"
                  style={{
                    width: 200,

                    height: 36,
                    fontSize: "18px",
                  }}
                  dropdownStyle={{ maxHeight: 100 }}
                  options={[{ value: "people1", label: "people1" }]}
                />
              </div>
            </div>

            {/* Save */}
            <button className="p-2 w-24 border-2 bg-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500  absolute bottom-0 right-6">
              Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;

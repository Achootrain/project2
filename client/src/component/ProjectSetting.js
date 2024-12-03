import { useState } from "react";
import React from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { RxAvatar } from "react-icons/rx";
import { Dropdown } from "antd";
import { IoCloseOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const ProjectSetting = ({ checkManager }) => {
  //danh sach nguoi da tham gia
  const joinedFromBackend = [
    {
      id: 1,
      project_id: 1,
      participant_id: 1,
      isManager: 1,
      name: "Truong",
    },
    {
      id: 2,
      project_id: 1,
      participant_id: 1,
      isManager: 1,
      name: "nguyen cuan Truong",
    },
    {
      id: 3,
      project_id: 1,
      participant_id: 1,
      isManager: 1,
      name: "Who am I",
    },
    {
      id: 4,
      project_id: 1,
      participant_id: 1,
      isManager: 1,
      name: "Wheo am I",
    },
    {
      id: 5,
      project_id: 1,
      participant_id: 1,
      isManager: 1,
      name: "Whqo am I",
    },
    {
      id: 6,
      project_id: 1,
      participant_id: 1,
      isManager: 1,
      name: "Wrho am I",
    },
  ];

  //danh sach nguoi yeu cau tham gia
  const requestList = [
    { id: 1, user_id: 1, project_id: 1, name: "Nguyen Xuan truong" },
    { id: 1, user_id: 1, project_id: 1, name: "Nguyen Xuan truong" },
    { id: 1, user_id: 1, project_id: 1, name: "Nguyen Xuan truong" },
    { id: 1, user_id: 1, project_id: 1, name: "Nguyen Xuan truong" },
    { id: 1, user_id: 1, project_id: 1, name: "Nguyen Xuan truong" },
  ];

  //thong tin cua project
  const projectFromBE = {
    name: "I don't know",
    description: "I am Truong",
    start_date: "2024-11-04",
    end_date: "2024-12-05",
    code: "B0qHluBGIeK",
    accessibility: "Private",
    model: "Kanban",
  };

  const [name, setName] = useState(projectFromBE.name);
  const [description, setDescription] = useState(projectFromBE.description);

  const [start_date, setStartDate] = useState(projectFromBE.start_date);
  const [end_date, setEndDate] = useState(projectFromBE.end_date);
  const code = projectFromBE.code;
  const [accessibility, setAccessibility] = useState(
    projectFromBE.accessibility
  );
  const model = projectFromBE.model;
  return (
    <div className="h-full w-full overflow-y-auto flex gap-10">
      <div className="h-full w-3/5">
        <div className="p-4">
          <h1 className="text-xl font-bold">Setting</h1>
        </div>
        <div className="p-4 mt-10 w-full">
          <Form
            labelCol={{
              span: 6,
            }}
            className=""
          >
            <Form.Item
              label={
                <span className="font-semibold text-base">Project name</span>
              }
              rules={[
                { required: true, message: "Vui lòng nhập tên người dùng!" },
              ]}
            >
              <Input
                defaultValue={name}
                className="border-black "
                onChange={(e) => setName(e.target.value)}
                disabled={!checkManager}
              />
            </Form.Item>
            <Form.Item
              label={<span className="font-semibold text-base">Model</span>}
            >
              <div>{model}</div>
            </Form.Item>
            <Form.Item
              label={<span className="font-semibold text-base">Timeline</span>}
            >
              <RangePicker
                defaultValue={[
                  dayjs(start_date, "YYYY-MM-DD"),
                  dayjs(end_date, "YYYY-MM-DD"),
                ]}
                className="border-black"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setStartDate(
                    value[0] ? dayjs(value[0]).format("YYYY-MM-DD") : null
                  );
                  setEndDate(
                    value[1] ? dayjs(value[1]).format("YYYY-MM-DD") : null
                  );
                }}
                disabled={!checkManager}
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="font-semibold text-base">Accessibility</span>
              }
            >
              <Select
                defaultValue={accessibility}
                style={{
                  width: "30%",
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: "7px",
                }}
                onChange={(value) => setAccessibility(value)}
                disabled={!checkManager}
              >
                <Select.Option value="Private">Private</Select.Option>
                <Select.Option value="Public">Public</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label={
                <span className="font-semibold text-base">Invitation code</span>
              }
            >
              <div className="">{code}</div>
            </Form.Item>
            <Form.Item
              label={
                <span className="font-semibold text-base">Description</span>
              }
            >
              <TextArea
                defaultValue={description}
                rows={4}
                className="border-black"
                onChange={(e) => setDescription(e.target.value)}
                disabled={!checkManager}
              />
            </Form.Item>
          </Form>
        </div>
        {checkManager && (
          <div className="flex justify-center p-4 px-10">
            <button
              className="p-2 w-20 border-2 bg-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500 "
              onClick={() => {}}
            >
              Save
            </button>
            <button className="p-2 ml-4 w-20 border-2 bg-gray-100  text-black rounded-xl hover:shadow-lg hover:shadow-gray-500 ">
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="h-full w-2/5 p-4 border-l-2 bg-gray-50 flex flex-col gap-5">
        {/* nhung nguoi tham gia */}
        <div className="h-1/2 border-b-2 flex flex-col gap-2">
          <h3 className="font-semibold text-xl">Participant</h3>
          <div className="h-4/5 overflow-y-auto flex flex-col gap-2">
            {joinedFromBackend.map((obj) => {
              return (
                <div>
                  <Dropdown
                    menu={{
                      items: [
                        {
                          label: <button className="w-20">Delete</button>,
                          key: `${obj.id}`,
                        },
                      ],
                    }}
                    trigger={["click"]}
                    overlayClassName="custom-dropdown"
                  >
                    <div className="flex gap-4 items-center hover:bg-slate-100">
                      <div className="w-10 h-10">
                        <RxAvatar className="w-10 h-10" />
                      </div>
                      <div>
                        <h3 className=" my-1">{obj.name}</h3>
                      </div>
                    </div>
                  </Dropdown>
                </div>
              );
            })}
          </div>
        </div>

        {/* Request */}
        <div className="h-2/5  flex flex-col gap-2 ">
          <h3 className="font-semibold text-xl">Request</h3>
          <div className="h-4/5 overflow-y-auto flex flex-col gap-2 ">
            {joinedFromBackend.map((obj) => {
              return (
                <div className="flex  items-center hover:bg-slate-100 justify-between">
                  <div className="flex gap-4">
                    <div className="w-10 h-10">
                      <RxAvatar className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className=" my-1">{obj.name}</h3>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2  border-2 bg-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500 ">
                      <FaCheck />
                    </button>

                    <button className="p-2   border-2 bg-gray-100  text-black rounded-xl hover:shadow-lg hover:shadow-gray-500 ">
                      <IoCloseOutline />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSetting;

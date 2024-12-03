import { useState } from "react";
import React from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const ProjectSetting = () => {
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
    <div className="h-full w-full overflow-y-auto">
      <div className="p-4">
        <h1 className="text-xl font-bold">Setting</h1>
      </div>
      <div className="p-4 mt-10 w-3/5">
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
            label={<span className="font-semibold text-base">Description</span>}
          >
            <TextArea
              defaultValue={description}
              rows={4}
              className="border-black"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
        </Form>
      </div>
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
    </div>
  );
};

export default ProjectSetting;

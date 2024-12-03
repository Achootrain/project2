import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import { GrNext } from "react-icons/gr";
import { BsStars } from "react-icons/bs";
import { IoApps } from "react-icons/io5";
import { IoIosColorPalette } from "react-icons/io";
import { IoBag } from "react-icons/io5";
import modelList from "../component/modelList";
import Introduce from "../component/Introduce";
import DetailForm from "../component/DetailForm";

const CreateProject = ({ event }) => {
  const projectList = [
    { id: 1, name: "For you", icon: <BsStars /> },
    { id: 2, name: "Software", icon: <IoApps /> },
    { id: 3, name: "Marketing", icon: <IoBag /> },
    { id: 4, name: "Design", icon: <IoIosColorPalette /> },
  ];

  const [showModel, setShowModel] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const handleShowModel = () => {
    setShowModel(true);
    setShowIntro(false);
    setShowForm(false);
  };
  const handleShowIntro = (item) => {
    setShowIntro(true);
    setSelectedModel(item);
    setShowModel(false);
    setShowForm(false);
  };
  const handleShowForm = () => {
    setShowForm(true);
    setShowIntro(false);
    setShowModel(false);
  };

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 backdrop-blur-[2px] flex justify-center items-center">
      {showModel && (
        <div className="h-screen w-[70vw] pl-4 rounded-3xl bg-neutral-50">
          <div className="p-4 h-[5vh] flex justify-end items-center">
            <button onClick={event}>
              <IoCloseOutline className="text-3xl font-bold text-gray-950 cursor-pointer" />
            </button>
          </div>

          <div className="  flex gap-4">
            {/* Tieu de */}
            <div className="w-1/4 px-2 ">
              <h1 className="font-bold text-2xl">Create New Project</h1>

              {/* Phan loai project*/}
              <nav className="w-full my-4">
                <ul className="flex flex-col gap-2">
                  {projectList.map((item) => (
                    <li>
                      <button
                        key={item.id}
                        className="flex h-10 w-full items-center gap-2 rounded-xl hover:bg-gray-300 p-4 focus:bg-violet-200"
                      >
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Selection */}
            <div className="w-3/4 h-[75vh] ">
              <div className=" h-[5vh] flex items-start gap-4">
                {/* Search bar */}
                <div className=" flex items-center border-2 border-gray-300">
                  <input
                    type="text"
                    className=" h-10 w-[38vw] px-4 rounded-full bg-transparent text-lg border-0 focus:outline-none"
                    placeholder="Type short description about your project ..."
                  ></input>
                  <div className="flex justify-center ">
                    <button className="p-1 rounded-md  bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-400 ">
                      <RiRobot2Line className="text-3xl text-white " />
                    </button>
                  </div>
                </div>

                {/* AI suggest */}
              </div>

              {/* Selection path */}

              {/* Select model */}
              <div className="h-screen p-4 my-10 flex flex-col items-start justify-start gap-4 overflow-y-auto">
                {modelList.map((item, index) => (
                  <button
                    key={item.id}
                    className="bg-white border-2 w-4/5  rounded-3xl flex items-center hover:shadow-lg active:border-blue-500 peer"
                    onClick={() => handleShowIntro(item)}
                  >
                    <div
                      className=" h-24 w-24 rounded-l-3xl flex justify-center items-center border-transparent peer-active:border-blue-500"
                      style={{ backgroundColor: "#D6EEF2" }}
                    >
                      <img src={item.icon} alt="" className="w-2/3 h-2/3"></img>
                    </div>
                    <div className="p-4 w-2/3 flex flex-col items-start overflow-hidden">
                      <h2 className="font-bold">{item.name}</h2>
                      <h3 className="overflow-hidden text-ellipsis  whitespace-nowrap w-full">
                        {item.description1}
                      </h3>
                    </div>
                    <GrNext className="m-auto" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {!showModel && (
        <div className="h-[80vh] w-[70vw] rounded-3xl bg-neutral-50">
          <div className="h-[10vh] flex justify-between bg-gradient-to-r from-purple-800 via-blue-600 to-purple-400 overflow-hidden rounded-t-3xl">
            <div className=" p-4 text-2xl font-bold flex gap-3 items-center">
              <span className="border-b-2 border-transparent hover:border-white text-white pl-4">
                <button onClick={handleShowModel}>Create new project</button>
              </span>
              <span>
                <GrNext className="text-lg" />
              </span>
              <span className="border-b-2 border-transparent hover:border-white text-white">
                <button
                  onClick={() => {
                    handleShowIntro(selectedModel);
                  }}
                >
                  {selectedModel.name}
                </button>
              </span>
              {showForm && (
                <div className="flex items-center gap-3">
                  <span>
                    <GrNext className="text-lg" />
                  </span>

                  <span className="border-b-2 border-transparent hover:border-white text-white">
                    <button onClick={handleShowForm}>Add details</button>
                  </span>
                </div>
              )}
            </div>

            <div className="p-2">
              <button onClick={event}>
                <IoCloseOutline className="text-3xl font-bold text-gray-950 cursor-pointer" />
              </button>
            </div>
          </div>

          {/* Trang hien thong tin ve model project */}
          {showIntro && (
            <div className="h-[70vh] overflow-y-auto">
              <Introduce
                item={selectedModel}
                handleShowForm={handleShowForm}
                showForm={showForm}
              />
            </div>
          )}

          {showForm && (
            <div className="h-[70vh] overflow-y-auto">
              <DetailForm item={selectedModel} event={handleShowModel} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateProject;

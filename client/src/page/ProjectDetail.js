import { useParams } from "react-router-dom";
import { RiTimelineView } from "react-icons/ri";
import { HiOutlineViewBoards } from "react-icons/hi";
import Kanban from "../asset/image/kanban.png";
import { IoIosSettings } from "react-icons/io";
import { useEffect, useState } from "react";
import Board from "../component/Board";
import Timeline from "../component/Timeline";
import ProjectSetting from "../component/ProjectSetting";

import axios from "axios";
function ProjectDetail() {
  const { id } = useParams(); // Access the id parameter from the URL

  const [showTask, setShowTask] = useState(false);
  const [showTimeline, setShowTimeLine] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [project_data, setProjectData] = useState({})
  // fetch project ------------------------------ author: Hai
  const fetchCurentProject = async function () {
    const token = sessionStorage.getItem('token')
    try {
      const project_fetched_res = await axios.get(
        `${process.env.REACT_APP_SERVER}/projects/getone`,
        {
          headers: { token },
          params: { project_id: id },
        }
      );
      setProjectData(project_fetched_res.data.project)
      setShowTask(true)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchCurentProject()
  }, [])
  // ----------------------------------------------------------  
  const handleShowTask = () => {
    setShowTask(true);
    setShowTimeLine(false);
    setShowSetting(false);
  };
  const handleShowTimeline = () => {
    setShowTask(false);
    setShowTimeLine(true);
    setShowSetting(false);
  };
  const handleShowSetting = () => {
    setShowTask(false);
    setShowTimeLine(false);
    setShowSetting(true);
  };
  return (
    <div className="flex flex-row ">
      <div className="border-r-2 border-gray-300 flex flex-col w-1/5">
        {/* Ten project */}
        <div className="pt-2 pb-2">
          <div className=" flex flex-row gap-2 pl-2">
            <img src={Kanban} alt="model" className="h-1/6 w-1/6 pt-1" />
            <div className="w-1/2">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap font-bold">{project_data.name}</div>
              <div>{project_data.model}</div>
            </div>
          </div>
        </div>

        {/* Options */}
        <div>
          <ul className="flex flex-col">
            <li>
              <button
                className={`p-2 w-full rounded-lg flex items-center gap-2 border-2 border-transparent  hover:bg-blue-300 ${showTask && "bg-blue-200"
                  }`}
                onClick={handleShowTask}
              >
                <HiOutlineViewBoards className="text-2xl" />
                <span>Task</span>
              </button>
            </li>
            <li>
              <button
                className={`p-2 w-full rounded-lg flex items-center gap-2 border-2 border-transparent  hover:bg-blue-300  ${showTimeline && "bg-blue-200"
                  }`}
                onClick={handleShowTimeline}
              >
                <RiTimelineView className="text-2xl" />
                <span>Timeline</span>
              </button>
            </li>
            <li>
              <button
                className={`p-2 w-full rounded-lg flex items-center gap-2 border-2 border-transparent  hover:bg-blue-300 ${showSetting && "bg-blue-200"
                  }`}
                onClick={handleShowSetting}
              >
                <IoIosSettings className="text-2xl" />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-[80vw] h-[89vh]">
        {showTask && <Board id={id} model={project_data.model} />}
        {showTimeline && <Timeline project_id={id} />}
        {showSetting && <ProjectSetting />}
      </div>
    </div>
  );
}

export default ProjectDetail;

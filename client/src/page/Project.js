import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../App.css";
import ProjectCard from "../component/ProjectCard";
import CreateProject from "./CreateProject";
import JoinTeam from "../component/JoinTeam";
import axios from "axios";

function Project() {
  const [projects, setProjects] = useState([]);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const fetchPrjects = async () => {
    try {

      const res = await axios.get(
        `${process.env.REACT_APP_SERVER}/projects/fetch`,
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      setProjects(res.data);
    } catch (err) {
      if (err.response.status == 403)
        navigate("/page/Login");
      else console.log(err)
    }
  };

  useEffect(() => {
    fetchPrjects();
  }, []);

  const settings1 = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    rows: 1,
    centerMode: false,
  };
  const settings2 = {
    ...settings1,
    rows: 1,
  };
  // test data
  const data = [
    {
      name: "Code with Tuan",
      description:
        "ProjectHub is a collaborative project management platform designed to streamline the workflow of teams and individuals. It combines powerful tools for planning, tracking, and managing tasks and deadlines in one intuitive interface. With ProjectHub, users can join or create projects, share updates, and keep track of goals and milestones.",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
    },
    {
      name: "Code with Lan",
      description: "A project management tool using Kanban.",
      avatarUrl:
        "https://th.bing.com/th/id/OIP.ARKjkmC8CHiN18CdgXJ9ngHaHa?rs=1&pid=ImgDetMain",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
    },
    {
      name: "Code with Lan",
      description: "A project management tool using Kanban.",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
    },
    {
      name: "Code with Lan",
      description: "A project management tool using Kanban.",
      startDate: "2024-01-01",
      endDate: "2024-06-01",
      model: "Kanban",
    },
  ];
  //--------------------------------------

  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const handleShowCreate = () => {
    setShowCreate(!showCreate);
  };
  const handleShowJoin = () => {
    setShowJoin(!showJoin);
  };
  return (
    <div>
      <Tabs
        type="card"
        tabBarStyle={{
          marginLeft: "auto", // Đẩy tab sang bên phải
          display: "flex",
          marginTop: 5,
          marginRight: 125,
        }}
        items={[
          {
            label: "Your Project",
            key: "1",
            children: (
              <div className="w-3/4 bg-slate-300 mx-auto rounded-md border-2 border-slate-500">
                <div className="flex flex-row items-center justify-between text-2xl">
                  <div className="uppercase font-semibold p-6">
                    Your Project
                  </div>
                  <div className="flex flex-row text-sm gap-2 pr-8">
                    <button
                      className="w-24 h-8 text-white bg-gradient-to-tr from-blue-700 via-indigo-700 to-purple-500 rounded-md"
                      onClick={handleShowCreate}
                    >
                      Create Project
                    </button>
                    <button className="w-24  text-white bg-gradient-to-tr from-blue-700 via-indigo-700 to-purple-500 rounded-md"
                      onClick={handleShowJoin}
                    >
                      {" "}
                      Join Project
                    </button>
                  </div>
                </div>
                <Slider {...settings1}>
                  {projects && Object.keys(projects).length > 0 ? (
                    projects.map((item) => (
                      <ProjectCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        avatarUrl={item.avatars}
                        startDate={item.start_date}
                        endDate={item.end_date}
                      />
                    ))
                  ) : (
                    <p>No projects available.</p>
                  )}
                </Slider>
              </div>
            ),
          },
          {
            label: "Suggest Project",
            key: "2",
            children: (
              <div className="w-[85%] lg:w-3/4 mx-auto ">
                <div className="border-[2px] border-black mb-14 pb-12">
                  <h1 className="uppercase font-semibold text-2xl p-6">
                    Suggest Project
                  </h1>
                  <Slider {...settings2}>
                    {data.map((item) => (
                      <ProjectCard
                        name={item.name}
                        description={item.description}
                        startDate={item.startDate}
                        endDate={item.endDate}
                      />
                    ))}
                  </Slider>
                </div>

                <div>
                  <h1 className="uppercase font-semibold text-2xl p-6">
                    Other Project
                  </h1>
                </div>
                <div className="grid grid-cols-3 grid-auto-rows-auto gap-y-10 gap-x-5 pb-4">
                  {data.map((item) => (
                    <div className="">
                      <ProjectCard
                        name={item.name}
                        description={item.description}
                        avatarUrl={item.avatars}
                        startDate={item.startDate}
                        endDate={item.endDate}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            label: "Recruit",
            key: "3",
            children: "Content of Curr Tab",
          },
        ]}
      />
      {showCreate && (
        <div>
          <CreateProject event={handleShowCreate} />
        </div>
      )}
      {showJoin && (
        <div>
          <JoinTeam event={handleShowJoin} />
        </div>
      )}
    </div>
  );
}

export default Project;

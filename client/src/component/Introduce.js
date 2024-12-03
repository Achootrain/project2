import React from "react";
import { GoDotFill } from "react-icons/go";

const Introduce = ({ item, handleShowForm }) => {
  return (
    <div>
      <div className="p-4 ml-6 flex gap-4">
        <div className="w-4/5 flex flex-col gap-6">
          <div>{item.description}</div>
          <div>
            <h3 className="font-bold">Recommend for</h3>
            <span>
              {item.recommend.map((obj) => (
                <div className="flex items-center gap-2 p-1">
                  <GoDotFill />
                  <span> {obj}</span>
                </div>
              ))}
            </span>
          </div>
          <div className="w-full grid grid-cols-2 gap-y-4">
            <div className="flex justify-center">
              <span className="font-bold">{item.inform1}</span>
            </div>
            <div className="flex justify-center">
              <span className="font-bold">{item.inform2}</span>
            </div>
            <div className="flex  justify-center items-center">
              <img src={item.image1} alt=" " className="h-52 w-52"></img>
            </div>
            <div className="flex   justify-center items-center">
              <img src={item.image2} alt="" className="h-52 w-52"></img>
            </div>
          </div>
        </div>

        <div className="w-1/5 h-[60vh]">
          <div className="h-1/3 flex justify-center items-start object-cover">
            <img src={item.icon} className="h-28" alt=""></img>
          </div>
          <div className="h-3/5">
            <div>
              <h3 className="font-bold">Work flow</h3>
              <ul>
                {item.workflow.map((obj) => (
                  <div className="px-2 flex items-center gap-2">
                    <GoDotFill className="text-sm" />
                    <li>{obj}</li>
                  </div>
                ))}
              </ul>
            </div>
          </div>
          {/* Nut chuyen sang buoc ke tiep */}
          <div className="flex justify-end items-end">
            <button
              className="p-2 bg-blue-600 rounded-md text-white shadow-transparent shadow-lg hover:shadow-blue-300 "
              onClick={handleShowForm}
            >
              Use template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduce;

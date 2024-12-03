import React from 'react';
import { Card, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
const ProjectCard = ({
    id,
    name,
    description,
    avatarUrl,
    startDate,
    endDate,
}) => {
    const getStartDate = () => {
        if (startDate) {
            return  dayjs(startDate).format("DD-MM-YYYY");
        }
        return "Not specified";
    }
    const getEndDate = () => {
        if (endDate) {
            return  dayjs(endDate).format("DD-MM-YYYY");
        }
        return "Not specified";
    }
    const getAvatarUrls = () => {
        const safeAvatarUrl = Array.isArray(avatarUrl) ? avatarUrl : [];

        return safeAvatarUrl.map(url => {
            return url && url !== "" ? url : 'https://th.bing.com/th/id/OIP.ARKjkmC8CHiN18CdgXJ9ngHaHa?rs=1&pid=ImgDetMain';
        });
    };

    const avatarList = getAvatarUrls(); // Safe avatar URL list
    const navigate = useNavigate();
    const handleClickedProject = () => {
        navigate(`/page/project/${id}`);
      }
    return (
        <div onClick={()=>{handleClickedProject()}} >
            <Card
               className="h-80 w-11/12"
                hoverable={true}
                cover={
                   <img src="https://i.imgur.com/49caWH8.jpeg" style={{ height: '140px', objectFit: 'cover' }}  ></img>
                }
            >
                <div className="-mt-12">
                    <Card.Meta
                        className="flex flex-col"
                        avatar={<Avatar.Group  max={{
                            count: 2,
                            style: {
                              backgroundColor:'#0096FF',
                            },
                          }}>
                        
                        {avatarList.map((url, index) => (
                          <Avatar key={index} src={url} size={40} />
                        ))}
    
                        </Avatar.Group>}
                        title={name}
                    />
                </div>
                <div className='info'>
                    <div className="text-start text-sm text-gray-700 space-y-1">
                    <p className=" text-black overflow-hidden text-ellipsis line-clamp-3">
                        {description} 
                    </p>
                        <p className="text-sm font-thin">Start Date: {getStartDate()}</p>
                        <p className="text-sm font-thin">End Date: {getEndDate()}</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ProjectCard;

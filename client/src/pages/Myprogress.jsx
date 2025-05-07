import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import girl from "../img/new.jpg"

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const [workouts, setWorkouts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");
  const [ItemDelete, setItemToDelete] = useState("");
  console.log(ItemDelete);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/Progress`);
        const data = await res.json();
        console.log(data)

        if (res.ok) {
            setWorkouts(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchItems();
  }, []);




  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/ProgressDelete/${ItemDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setWorkouts((prev) => prev.filter((workout) => workout.id !== ItemDelete));
        alert("deleted")
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  


 
 

  return (
    <div className="relative">
    <img 
      src="https://images.pexels.com/photos/12960389/pexels-photo-12960389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
      alt="Background of fitness progress" 
      className="w-full h-[700px] object-cover opacity-95" 
    />
  
    {/* New Progress Button */}
    <div className="absolute top-4 right-10">
      <Link to="/createschedul">
        <button className="bg-gradient-to-r from-blue-700 to-white text-white font-light text-opacity-75 shadow-xl border border-slate-300 rounded-lg w-32 h-10 hover:opacity-85">
          New Progress
        </button>
      </Link>
    </div>
  
    {/* Main Progress Section */}
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-10 w-[640px] h-[650px]  bg-none  rounded-lg shadow-xl overflow-hidden">
      
      <h1 className="text-5xl font-serif text-slate-800 text-opacity-70 text-center mt-6">
        My Progress
      </h1>
  
      {/* Workout Cards */}
      <div className="max-h-[550px] overflow-y-auto px-6 pt-4 scrollbar-none">
        <div className="flex flex-col gap-10">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-white w-full bg-opacity-80 h-auto p-6 rounded-2xl shadow-lg"
            >
              <h2 className="text-xl font-light text-center border rounded-xl py-2 mb-4">
                Course Name: {workout.progressState}
              </h2>
  
              <p className="font-semibold text-black">Description</p>
              <p className="text-sm text-black mb-4">{workout.description}</p>
  
              <div>
                <p className="font-semibold text-black text-lg">Start Date</p>
                <p className="text-black font-light">
                  {moment(workout.date).format("YYYY-MM-DD HH:mm:ss")}
                </p>
              </div>
  
              <div className="mt-6 text-center text-2xl font-serif text-black text-opacity-70">
                My Current Learning Progress
              </div>
  
              <div className="mt-4 max-h-44 overflow-y-auto bg-slate-100 bg-opacity-30 rounded-xl p-4 space-y-2">
                {workout.state.map((state, index) => (
                  <div key={index} className="bg-slate-200 p-2 rounded-xl">
                    <p className="text-black font-serif">
                      Description: {state.name}
                    </p>
                    <hr className="border-black mt-2" />
                  </div>
                ))}
              </div>
  
              {/* Action Buttons */}
              <div className="flex justify-center gap-6 mt-6">
                <Link to={`/updateworkout/${workout.id}`}>
                  <button className="w-20 bg-gradient-to-r from-blue-700 to-white text-black font-medium rounded-xl shadow-lg hover:opacity-85">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => {
                    setItemToDelete(workout.id);
                    handleDeleteUser();
                  }}
                  className="w-20 bg-gradient-to-r from-blue-700 to-white text-black font-medium rounded-xl shadow-lg hover:opacity-85"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  
  );
}      


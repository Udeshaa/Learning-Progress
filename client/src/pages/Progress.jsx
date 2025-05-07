import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import girl from "../img/edu.jpg"  




export default function CreateSchedul() {
    const [formData, setFormData] = useState({
      progressState: "",
        description: "",
        date: "",
        state: [],
      });
      console.log(formData);
  
  
  const [publishError, setPublishError] = useState(null);
  const [Error, setError] = useState(null);
  const navigate = useNavigate();
  console.log(formData)

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value.trim() });
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedState = [...formData.state];
    updatedState[index][field] = value.trim();
    setFormData({ ...formData, state: updatedState });
  };

  const handleAddExercise = () => {
    setFormData({
      ...formData,
      state: [...formData.state, { name: "", completed: "", burend_callary: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {


      


      const res = await fetch("http://localhost:8081/api/CreateProgress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date).toISOString(), // Convert date to ISO format
      }),

      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(``);
        alert("successfull");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };



 
 
  
  
  

  return (
    <div className="relative">
    <img
      src="https://images.pexels.com/photos/12960389/pexels-photo-12960389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      alt="Background"
      className="w-full h-[700px] object-cover opacity-95"
    />
  
    {/* Top Button - My Progress */}
   
  
    {/* Main Form Container */}
    
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-6">
    <div className="max-h-[550px] overflow-y-auto px-6 pt-4 scrollbar-none">
      <div className="bg-white bg-opacity-30 p-6 rounded-xl shadow-xl">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          
          {/* Course Name */}
          <div>
            <label htmlFor="progressState" className="font-semibold text-black block mb-1">Course Name</label>
            <select
              id="progressState"
              onChange={handleChange}
              required
              className="w-full md:w-[300px] p-3 rounded-lg bg-slate-100 bg-opacity-80"
            >
              <option value="">Select</option>
              <option value="Unlocking the Basics: A Beginner’s Guide">Unlocking the Basics: A Beginner’s Guide</option>
              <option value="Foundations First: Learn the Essentials">Foundations First: Learn the Essentials</option>
              <option value="Crash Course 101: Get Started Fast">Crash Course 101: Get Started Fast</option>
              <option value="Skill Sprint: Learn in an Hour">Skill Sprint: Learn in an Hour</option>
              <option value="Demo Masterclass: See It in Action">Demo Masterclass: See It in Action</option>
              <option value="Try & Learn: Interactive Demo Course">Try & Learn: Interactive Demo Course</option>
              <option value="QuickStart Demo:Edition">QuickStart Demo: Edition</option>
              <option value="Fast Track Fundamentals">Fast Track Fundamentals</option>
            </select>
          </div>
  
          {/* Start Date */}
          <div>
            <label htmlFor="date" className="font-semibold text-black block mb-1">Course Start Date</label>
            <input
              type="date"
              id="date"
              required
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-slate-100 bg-opacity-80"
            />
            {Error && (
              <p className="mt-2 text-sm text-red-700 font-serif text-opacity-80 text-center">
                {Error}
              </p>
            )}
          </div>
  
          {/* Description */}
          <div>
            <label htmlFor="description" className="font-semibold text-black block mb-1">Description</label>
            <textarea
              id="description"
              required
              maxLength={1000}
              onChange={handleChange}
              className="w-full h-24 p-3 rounded-lg bg-slate-100 bg-opacity-80 resize-none"
            />
          </div>
  
          {/* Progress Section Title */}
          <div className="text-center bg-white rounded-xl py-2 opacity-80">
            <h3 className="text-xl font-serif text-black">My Learning Progress</h3>
          </div>
  
          {/* Progress Days */}
          <div className="max-h-36 overflow-y-auto bg-opacity-10 scrollbar-none space-y-4">
            {formData.state.map((exercise, index) => (
              <div key={index}>
                <label className="font-semibold text-gray-600 block">Day {index + 1}</label>
                <input
                  type="text"
                  value={exercise.name}
                  onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
                  placeholder="Short description"
                  className="w-full md:w-[300px] p-3 rounded-lg bg-slate-100 bg-opacity-80"
                />
              </div>
            ))}
          </div>
  
          {/* Add Day + Submit Buttons */}
          <div className="flex flex-col gap-4 mt-4">
            <button
              type="button"
              onClick={handleAddExercise}
              className="bg-gradient-to-r from-slate-500 to-white text-white font-serif p-3 rounded-lg shadow-lg border border-slate-300 hover:opacity-90"
            >
              Add Progress
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-slate-500 to-white text-white font-serif p-3 rounded-lg shadow-lg border border-slate-300 hover:opacity-90"
            >
              Submit
            </button>
            {publishError && (
              <p className="mt-2 text-sm text-red-700 font-serif text-opacity-80 text-center">
                {publishError}
              </p>
            )}
          </div>
  
        </form>
      </div>
      </div>
    </div>
  
  </div>
  
  );
}

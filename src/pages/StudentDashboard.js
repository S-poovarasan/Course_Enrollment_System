import React, { useEffect, useState } from 'react';
import API from '../services/api';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    API.get('/courses').then(res => setCourses(res.data));
    // Optionally, fetch student's enrolled courses
  }, []);

  const enroll = async (id) => {
    await API.post('/courses/enroll', { courseId: id });
    setCourses(courses => courses.map(c => c._id === id ? { ...c, availableSeats: c.availableSeats - 1 } : c));
  };

  const drop = async (id) => {
    await API.post('/courses/drop', { courseId: id });
    setCourses(courses => courses.map(c => c._id === id ? { ...c, availableSeats: c.availableSeats + 1 } : c));
  };

  return (
    <div className="container mt-5">
      <h2>Student Dashboard</h2>
      <h4>Available Courses</h4>
      <ul>
        {courses.map(c => (
          <li key={c._id}>
            {c.courseName} ({c.availableSeats}/{c.maxSeats})
            <button className="btn btn-success btn-sm mx-2" disabled={c.availableSeats <= 0} onClick={() => enroll(c._id)}>Enroll</button>
            <button className="btn btn-danger btn-sm" onClick={() => drop(c._id)}>Drop</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;

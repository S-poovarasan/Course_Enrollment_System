import React, { useEffect, useState } from 'react';
import API from '../services/api';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    API.get('/courses/instructor').then(res => setCourses(res.data));
  }, []);

  const handleCourseClick = async (id) => {
    setSelectedCourse(id);
    const res = await API.get(`/courses/${id}/students`);
    setStudents(res.data);
  };

  return (
    <div className="container mt-5">
      <h2>Instructor Dashboard</h2>
      <h4>Your Courses</h4>
      <ul>
        {courses.map(c => (
          <li key={c._id} onClick={() => handleCourseClick(c._id)} style={{ cursor: 'pointer' }}>
            {c.courseName}
          </li>
        ))}
      </ul>
      {selectedCourse && (
        <div>
          <h5>Enrolled Students</h5>
          <ul>
            {students.map(s => <li key={s._id}>{s.name} ({s.email})</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;

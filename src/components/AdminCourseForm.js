import React, { useState, useEffect } from 'react';
import API from '../services/api';

const AdminCourseForm = ({ onCourseCreated }) => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [description, setDescription] = useState('');
  const [maxSeats, setMaxSeats] = useState(1);
  const [instructor, setInstructor] = useState('');
  const [instructors, setInstructors] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    API.get('/users/instructors').then(res => setInstructors(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/courses', { courseName, courseCode, description, maxSeats, instructor });
      setMessage('Course created successfully');
      setCourseName(''); setCourseCode(''); setDescription(''); setMaxSeats(1); setInstructor('');
      if (onCourseCreated) onCourseCreated();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error creating course');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>Create New Course</h5>
      <input className="form-control mb-2" placeholder="Course Name" value={courseName} onChange={e => setCourseName(e.target.value)} required />
      <input className="form-control mb-2" placeholder="Course Code" value={courseCode} onChange={e => setCourseCode(e.target.value)} required />
      <input className="form-control mb-2" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input className="form-control mb-2" type="number" min="1" placeholder="Max Seats" value={maxSeats} onChange={e => setMaxSeats(Number(e.target.value))} required />
      <select className="form-control mb-2" value={instructor} onChange={e => setInstructor(e.target.value)} required>
        <option value="">Select Instructor</option>
        {instructors.map(i => <option key={i._id} value={i._id}>{i.name} ({i.email})</option>)}
      </select>
      <button className="btn btn-primary" type="submit">Create Course</button>
      {message && <div className="mt-2 text-info">{message}</div>}
    </form>
  );
};

export default AdminCourseForm;

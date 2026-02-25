import React, { useState, useEffect } from 'react';
import API from '../services/api';

const EditCourseModal = ({ show, course, onClose, onUpdated }) => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [description, setDescription] = useState('');
  const [maxSeats, setMaxSeats] = useState(1);
  const [instructor, setInstructor] = useState('');
  const [instructors, setInstructors] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (course) {
      setCourseName(course.courseName);
      setCourseCode(course.courseCode);
      setDescription(course.description || '');
      setMaxSeats(course.maxSeats);
      setInstructor(course.instructor?._id || '');
    }
    API.get('/users/instructors').then(res => setInstructors(res.data));
  }, [course]);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/courses/${course._id}`, { courseName, courseCode, description, maxSeats, instructor });
      setMessage('Course updated successfully');
      if (onUpdated) onUpdated();
      setTimeout(onClose, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error updating course');
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Course</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input className="form-control mb-2" placeholder="Course Name" value={courseName} onChange={e => setCourseName(e.target.value)} required />
              <input className="form-control mb-2" placeholder="Course Code" value={courseCode} onChange={e => setCourseCode(e.target.value)} required />
              <input className="form-control mb-2" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
              <input className="form-control mb-2" type="number" min="1" placeholder="Max Seats" value={maxSeats} onChange={e => setMaxSeats(Number(e.target.value))} required />
              <select className="form-control mb-2" value={instructor} onChange={e => setInstructor(e.target.value)} required>
                <option value="">Select Instructor</option>
                {instructors.map(i => <option key={i._id} value={i._id}>{i.name} ({i.email})</option>)}
              </select>
              {message && <div className="mt-2 text-info">{message}</div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
              <button type="submit" className="btn btn-primary">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCourseModal;

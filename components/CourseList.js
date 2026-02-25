import React from 'react';

const CourseList = ({ courses, onEdit, onDelete }) => (
  <ul>
    {courses.map(c => (
      <li key={c._id}>
        {c.courseName} ({c.availableSeats}/{c.maxSeats})
        <button className="btn btn-sm btn-warning mx-2" onClick={() => onEdit(c)}>Edit</button>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(c._id)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default CourseList;

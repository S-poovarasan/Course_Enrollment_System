import React, { useEffect, useState } from 'react';
import API from '../services/api';
import AdminCourseForm from '../components/AdminCourseForm';
import CourseList from '../components/CourseList';
import EditCourseModal from '../components/EditCourseModal';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);

  const fetchData = () => {
    API.get('/courses').then(res => setCourses(res.data));
    API.get('/users/instructors').then(res => setInstructors(res.data));
    API.get('/courses/enrollments').then(res => setEnrollments(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (course) => setEditingCourse(course);
  const handleDelete = async (id) => {
    if (window.confirm('Delete this course?')) {
      await API.delete(`/courses/${id}`);
      fetchData();
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <AdminCourseForm onCourseCreated={fetchData} />
      <h4>Courses</h4>
      <CourseList courses={courses} onEdit={handleEdit} onDelete={handleDelete} />
      <EditCourseModal show={!!editingCourse} course={editingCourse} onClose={() => setEditingCourse(null)} onUpdated={fetchData} />
      <h4>Instructors</h4>
      <ul>{instructors.map(i => <li key={i._id}>{i.name} ({i.email})</li>)}</ul>
      <h4>Enrollments</h4>
      <ul>{enrollments.map(e => <li key={e.courseCode}>{e.courseName}: {e.totalEnrolled} enrolled</li>)}</ul>
    </div>
  );
};

export default AdminDashboard;

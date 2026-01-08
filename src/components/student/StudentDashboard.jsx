// Student Dashboard
// ============================================
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { apiCall } from '../../services/api';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    setLoading(true);
    try {
      const studentId = user.profile.id;
      
      const [profileData, enrollmentsData, gradesData, attendanceData] = await Promise.all([
        apiCall(`/students/${studentId}`),
        apiCall(`/enrollments/student/${studentId}`),
        apiCall(`/grades/student/${studentId}`),
        apiCall(`/attendance/overview/${studentId}`)
      ]);
      
      setProfile(profileData);
      setEnrollments(enrollmentsData);
      setGrades(gradesData);
      setAttendance(attendanceData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderProfile = () => (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
      <h3>Personal Information</h3>
      <table style={{ width: '100%', marginTop: '20px' }}>
        <tbody>
          <tr>
            <td style={{ padding: '10px', fontWeight: 'bold' }}>Student Code:</td>
            <td style={{ padding: '10px' }}>{profile?.student_code}</td>
          </tr>
          <tr>
            <td style={{ padding: '10px', fontWeight: 'bold' }}>Full Name:</td>
            <td style={{ padding: '10px' }}>{profile?.full_name}</td>
          </tr>
          <tr>
            <td style={{ padding: '10px', fontWeight: 'bold' }}>Email:</td>
            <td style={{ padding: '10px' }}>{profile?.email}</td>
          </tr>
          <tr>
            <td style={{ padding: '10px', fontWeight: 'bold' }}>Major:</td>
            <td style={{ padding: '10px' }}>{profile?.major}</td>
          </tr>
          <tr>
            <td style={{ padding: '10px', fontWeight: 'bold' }}>GPA:</td>
            <td style={{ padding: '10px', color: '#667eea', fontSize: '18px', fontWeight: 'bold' }}>
              {profile?.gpa}
            </td>
          </tr>
          <tr>
            <td style={{ padding: '10px', fontWeight: 'bold' }}>Total Credits:</td>
            <td style={{ padding: '10px' }}>{profile?.total_credits}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderEnrollments = () => (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
      <h3>My Courses</h3>
      {enrollments.filter(e => e.status === 'enrolled').length === 0 ? (
        <p>No enrolled courses</p>
      ) : (
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Course Code</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Course Name</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Credits</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Lecturer</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Schedule</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.filter(e => e.status === 'enrolled').map((enrollment) => (
              <tr key={enrollment.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{enrollment.course_code}</td>
                <td style={{ padding: '10px' }}>{enrollment.course_name}</td>
                <td style={{ padding: '10px' }}>{enrollment.credits}</td>
                <td style={{ padding: '10px' }}>{enrollment.lecturer_name}</td>
                <td style={{ padding: '10px' }}>{enrollment.schedule}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  const renderGrades = () => (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
      <h3>Grades</h3>
      {grades.length === 0 ? (
        <p>No grades available yet</p>
      ) : (
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Course</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Midterm</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Final</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Assignment</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Total</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Grade</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <tr key={grade.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{grade.course_name}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{grade.midterm_score || '-'}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{grade.final_score || '-'}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{grade.assignment_score || '-'}</td>
                <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>
                  {grade.total_score?.toFixed(2)}
                </td>
                <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#667eea' }}>
                  {grade.letter_grade}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  const renderAttendance = () => (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
      <h3>Attendance Overview</h3>
      {attendance.length === 0 ? (
        <p>No attendance records</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
          {attendance.map((record) => (
            <div key={record.class_id} style={{ 
              border: '1px solid #ddd', 
              padding: '15px', 
              borderRadius: '8px' 
            }}>
              <h4 style={{ marginTop: 0 }}>{record.course_name}</h4>
              <p style={{ color: '#666', marginBottom: '10px' }}>Class: {record.class_code}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Total Sessions: {record.total_sessions}</span>
                <span style={{ color: '#22c55e' }}>Present: {record.present_count}</span>
                <span style={{ color: '#f59e0b' }}>Late: {record.late_count}</span>
                <span style={{ color: '#ef4444' }}>Absent: {record.absent_count}</span>
              </div>
              
              <div style={{ marginTop: '10px' }}>
                <div style={{ 
                  background: '#f5f5f5', 
                  borderRadius: '10px', 
                  height: '20px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    background: record.attendance_percentage >= 80 ? '#22c55e' : 
                               record.attendance_percentage >= 60 ? '#f59e0b' : '#ef4444',
                    width: `${record.attendance_percentage}%`, 
                    height: '100%',
                    transition: 'width 0.3s'
                  }} />
                </div>
                <p style={{ textAlign: 'center', marginTop: '5px', fontWeight: 'bold' }}>
                  Attendance: {record.attendance_percentage}%
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ 
        background: '#667eea', 
        color: 'white', 
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2>Student Portal</h2>
        <div>
          <span style={{ marginRight: '20px' }}>Welcome, {user?.profile?.full_name}</span>
          <button 
            onClick={logout}
            style={{ 
              padding: '8px 16px', 
              background: 'white', 
              color: '#667eea',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Logout
          </button>
        </div>
      </div>
      
      <div style={{ padding: '20px' }}>
        <div style={{ 
          background: 'white', 
          borderRadius: '8px', 
          marginBottom: '20px',
          display: 'flex',
          gap: '10px',
          padding: '10px'
        }}>
          {['profile', 'courses', 'grades', 'attendance'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ 
                padding: '10px 20px',
                background: activeTab === tab ? '#667eea' : 'white',
                color: activeTab === tab ? 'white' : '#333',
                border: '1px solid #667eea',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: activeTab === tab ? 'bold' : 'normal'
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
        ) : (
          <>
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'courses' && renderEnrollments()}
            {activeTab === 'grades' && renderGrades()}
            {activeTab === 'attendance' && renderAttendance()}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;

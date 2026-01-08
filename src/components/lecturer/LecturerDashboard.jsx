// Lecturer Dashboard
// ============================================
const LecturerDashboard = () => {
  const { user, logout } = useAuth();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [activeTab, setActiveTab] = useState('classes');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    setLoading(true);
    try {
      const data = await apiCall('/classes');
      setClasses(data.filter(c => c.lecturer_id === user.profile.id));
    } catch (error) {
      console.error('Error loading classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadClassDetails = async (classId) => {
    setLoading(true);
    try {
      const [studentsData, sessionsData] = await Promise.all([
        apiCall(`/enrollments/class/${classId}`),
        apiCall(`/attendance/sessions/class/${classId}`)
      ]);
      
      setStudents(studentsData);
      setSessions(sessionsData);
    } catch (error) {
      console.error('Error loading class details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectClass = (classItem) => {
    setSelectedClass(classItem);
    loadClassDetails(classItem.id);
    setActiveTab('students');
  };

  const handleMarkAttendance = async (sessionId) => {
    setSelectedSession(sessionId);
    try {
      const data = await apiCall(`/attendance/session/${sessionId}`);
      setAttendance(data);
      setActiveTab('attendance');
    } catch (error) {
      console.error('Error loading attendance:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ 
        background: '#8b5cf6', 
        color: 'white', 
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2>Lecturer Portal</h2>
        <div>
          <span style={{ marginRight: '20px' }}>Welcome, {user?.profile?.full_name}</span>
          <button 
            onClick={logout}
            style={{ 
              padding: '8px 16px', 
              background: 'white', 
              color: '#8b5cf6',
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
      
      <div style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
        <div style={{ width: '300px', background: 'white', padding: '20px', overflowY: 'auto' }}>
          <h3>My Classes</h3>
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              onClick={() => handleSelectClass(classItem)}
              style={{
                padding: '15px',
                margin: '10px 0',
                background: selectedClass?.id === classItem.id ? '#8b5cf6' : '#f5f5f5',
                color: selectedClass?.id === classItem.id ? 'white' : '#333',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{classItem.course_name}</div>
              <div style={{ fontSize: '14px', marginTop: '5px' }}>{classItem.class_code}</div>
              <div style={{ fontSize: '12px', marginTop: '5px' }}>
                {classItem.current_students} students
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          {selectedClass ? (
            <>
              <div style={{ 
                background: 'white', 
                padding: '20px', 
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <h3>{selectedClass.course_name}</h3>
                <p>Class Code: {selectedClass.class_code}</p>
                <p>Schedule: {selectedClass.schedule}</p>
                <p>Room: {selectedClass.room}</p>
              </div>
              
              <div style={{ 
                background: 'white', 
                borderRadius: '8px', 
                marginBottom: '20px',
                display: 'flex',
                gap: '10px',
                padding: '10px'
              }}>
                {['students', 'sessions', 'grades'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{ 
                      padding: '10px 20px',
                      background: activeTab === tab ? '#8b5cf6' : 'white',
                      color: activeTab === tab ? 'white' : '#333',
                      border: '1px solid #8b5cf6',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              
              {activeTab === 'students' && (
                <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
                  <h4>Student List</h4>
                  <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f5f5f5' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Student Code</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Major</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr key={student.id} style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '10px' }}>{student.student_code}</td>
                          <td style={{ padding: '10px' }}>{student.student_name}</td>
                          <td style={{ padding: '10px' }}>{student.email}</td>
                          <td style={{ padding: '10px' }}>{student.major}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {activeTab === 'sessions' && (
                <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
                  <h4>Sessions</h4>
                  <div style={{ marginTop: '20px' }}>
                    {sessions.map((session) => (
                      <div key={session.id} style={{ 
                        border: '1px solid #ddd', 
                        padding: '15px', 
                        borderRadius: '8px',
                        marginBottom: '10px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div>
                            <strong>Session {session.session_number}</strong>
                            <p style={{ color: '#666', margin: '5px 0' }}>
                              {new Date(session.session_date).toLocaleDateString()}
                            </p>
                            <p style={{ margin: '5px 0' }}>{session.topic}</p>
                          </div>
                          <button
                            onClick={() => handleMarkAttendance(session.id)}
                            style={{
                              padding: '8px 16px',
                              background: '#8b5cf6',
                              color: 'white',
                              border: 'none',
                              borderRadius: '5px',
                              cursor: 'pointer',
                              height: 'fit-content'
                            }}
                          >
                            Mark Attendance
                          </button>
                        </div>
                        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                          Present: {session.present_count} | Absent: {session.absent_count}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              Select a class to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

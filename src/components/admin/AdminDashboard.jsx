// Admin Dashboard
// ============================================
const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ 
        background: '#dc2626', 
        color: 'white', 
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2>Admin Portal</h2>
        <div>
          <span style={{ marginRight: '20px' }}>Welcome, Admin</span>
          <button 
            onClick={logout}
            style={{ 
              padding: '8px 16px', 
              background: 'white', 
              color: '#dc2626',
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
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          {[
            { title: 'Students', count: 125, color: '#667eea' },
            { title: 'Lecturers', count: 45, color: '#8b5cf6' },
            { title: 'Courses', count: 87, color: '#22c55e' },
            { title: 'Classes', count: 156, color: '#f59e0b' }
          ].map((stat) => (
            <div key={stat.title} style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                {stat.title}
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: stat.color }}>
                {stat.count}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3>Quick Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '20px' }}>
            {['Add Student', 'Add Lecturer', 'Add Course', 'Create Class', 'View Reports', 'Settings'].map((action) => (
              <button key={action} style={{
                padding: '15px',
                background: '#f5f5f5',
                border: '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                {action}
              </button>
            ))}
          </div>
        </div>
        
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
          <h3>Recent Activities</h3>
          <p style={{ color: '#666', marginTop: '20px' }}>No recent activities</p>
        </div>
      </div>
    </div>
  );
};

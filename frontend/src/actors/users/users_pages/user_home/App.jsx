import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Chào mừng đến với Website của tôi! 🚀</h1>
        <p>Đây là trang chủ được tạo bằng Vite + React.</p>
      </header>
      
      <main style={styles.content}>
        <section>
          <h2>Về dự án này</h2>
          <p>Dự án này đang sử dụng React Router để quản lý điều hướng.</p>
        </section>
        
        <button 
          style={styles.button} 
          onClick={() => alert('Bạn vừa nhấn nút!')}
        >
          Khám phá ngay
        </button>
      </main>
    </div>
  );
};

// Một chút CSS inline để trang nhìn gọn gàng ngay lập tức
const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    backgroundColor: '#282c34',
    padding: '40px',
    color: 'white',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  content: {
    marginTop: '20px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#61dafb',
    border: 'none',
    borderRadius: '5px',
    marginTop: '20px'
  }
};

export default Home;
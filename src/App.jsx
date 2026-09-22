import React, { useState, useEffect } from 'react';
import './styles.css';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()),
      fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
    ]).then(([postsData, usersData]) => {
      setPosts(postsData);
      setUsers(usersData);
      setLoading(false);
    });
  }, []);

  const obtenerAutor = (userId) => {
    const autor = users.find(user => user.id === userId);
    return autor ? autor.name : 'Autor desconocido';
  };

  const postsFiltrados = posts.filter(post => 
    post.title.includes(search)
  );

  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <div className="card" style={{ padding: '24px', background: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px' }}>Buscador de Publicaciones</h1>
        
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="Buscar por título..."
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', marginBottom: '16px' }}
        />

        <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
          Resultados encontrados: {posts.length}
        </p>

        {loading ? (
          <p>Cargando publicaciones...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {postsFiltrados.slice(0, 5).map(post => (
              <div key={post.id} style={{ padding: '12px', background: '#f9f9f9', borderRadius: '6px', border: '1px solid #eee' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{post.title}</h3>
                <p style={{ fontSize: '13px', color: '#555', margin: '0 0 8px 0' }}>{post.body}</p>
                <small style={{ color: '#007bff', fontWeight: 'bold' }}>Autor: {obtenerAutor(post.userId)}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
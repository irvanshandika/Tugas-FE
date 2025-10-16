'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { MapPin, Globe, Heart, RefreshCw, Map, UserCircle } from 'lucide-react';

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      setUser(data.results[0]);
    } catch (error) {
      console.error("Gagal mengambil data pengguna:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <main className="container">
        <p>Loading profile...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="container">
        <p>Gagal memuat profil. Coba lagi.</p>
        <button onClick={fetchUser}>Muat Ulang</button>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-image-container">
            <Image
              src={user.picture.large}
              alt={`Foto profil ${user.name.first}`}
              className="profile-image"
              width={150}
              height={150}
              priority
            />
          </div>
          <h2 className="profile-name">
            {user.name.title} {user.name.first} {user.name.last}
          </h2>
          <p className="profile-tagline">{user.email}</p>
          <div className="profile-badges">
            <span className="badge">
              <Globe className="badge-icon" size={16} />
              {user.location.country}
            </span>
            <span className="badge">
              <Heart className="badge-icon" size={16} />
              {user.registered.age} tahun
            </span>
          </div>
        </div>
        
        <div className="profile-content">
          <div className="profile-section">
            <h3 className="section-title">
              <UserCircle className="section-icon" size={18} />
              Informasi Pribadi
            </h3>
            <div className="info-item">
              <span className="info-label">Usia</span>
              <span className="info-value">{user.registered.age} tahun</span>
            </div>
            <div className="info-item">
              <span className="info-label">Telepon</span>
              <span className="info-value">{user.phone}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Alamat</span>
              <span className="info-value">
                {user.location.street.name} No.{user.location.street.number}, {user.location.city}, {user.location.country}
              </span>
            </div>
          </div>
          
          <div className="profile-divider"></div>
          
          <div className="profile-section">
            <h3 className="section-title">
              <Map className="section-icon" size={18} />
              Lokasi
            </h3>
            <div className="location-map">
              <MapPin className="map-icon location-pin" size={24} />
              <div className="location-details">
                <span className="location-city">{user.location.city}</span>
                <span className="location-country">{user.location.country}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-actions">
          <button className="profile-button" onClick={fetchUser}>
            <RefreshCw className="button-icon" size={16} />
            Dapatkan Pengguna Baru
          </button>
        </div>
      </div>
    </main>
  );
}
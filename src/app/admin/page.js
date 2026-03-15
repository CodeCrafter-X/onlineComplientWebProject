'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function AdminDashboard() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    try {
      // Check authentication
      const authRes = await fetch('/api/token-check', {
        credentials: 'include',
      });
      const authData = await authRes.json();

      if (!authData.isAuthenticated || authData.user?.role !== 'admin') {
        router.push('/auth/login');
        return;
      }

      setAdminUser(authData.user);

      // Fetch complaints
      const complaintsRes = await fetch('/api/complaint/getAll', {
        credentials: 'include',
      });

      if (complaintsRes.ok) {
        const complaintData = await complaintsRes.json();
        setComplaints(complaintData);
        
        // Calculate stats
        setStats({
          total: complaintData.length,
          pending: complaintData.filter((c) => c.status === 'pending').length,
          approved: complaintData.filter((c) => c.status === 'approved').length,
          rejected: complaintData.filter((c) => c.status === 'rejected').length,
        });
      }

      setUsers([]);
    } catch (err) {
      setError('Error loading data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      router.push('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* <Navigation /> */}

      <main className="flex-grow pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                <p className="text-lg text-gray-600">Welcome back, {adminUser?.username || 'Admin'}!</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                🚪 Logout
              </button>
            </div>

            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg mb-8">
                <p className="font-semibold">{error}</p>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Complaints */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border-t-4 border-blue-600">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600 text-sm font-semibold uppercase tracking-wider">Total Complaints</p>
                  <div className="text-3xl">📋</div>
                </div>
                <p className="text-4xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-gray-500 text-xs mt-3">All submitted complaints</p>
              </div>

              {/* Pending */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border-t-4 border-yellow-500">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600 text-sm font-semibold uppercase tracking-wider">Pending</p>
                  <div className="text-3xl">⏳</div>
                </div>
                <p className="text-4xl font-bold text-yellow-600">{stats.pending}</p>
                <p className="text-gray-500 text-xs mt-3">Awaiting review</p>
              </div>

              {/* Approved */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border-t-4 border-green-500">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600 text-sm font-semibold uppercase tracking-wider">Approved</p>
                  <div className="text-3xl">✅</div>
                </div>
                <p className="text-4xl font-bold text-green-600">{stats.approved}</p>
                <p className="text-gray-500 text-xs mt-3">Accepted complaints</p>
              </div>

              {/* Rejected */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border-t-4 border-red-500">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600 text-sm font-semibold uppercase tracking-wider">Rejected</p>
                  <div className="text-3xl">❌</div>
                </div>
                <p className="text-4xl font-bold text-red-600">{stats.rejected}</p>
                <p className="text-gray-500 text-xs mt-3">Declined complaints</p>
              </div>
            </div>
          </div>

          {/* Admin Cards Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Admin Profile Card */}
              <Link href="/admin/profile">
                <div className="group bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">👤</div>
                    <h3 className="text-2xl font-bold mb-3">Admin Profile</h3>
                    <p className="text-blue-100 text-sm mb-6 line-clamp-2">Access and manage your admin account settings</p>
                    <div className="w-full bg-white text-blue-700 hover:bg-yellow-300 font-bold py-3 px-6 rounded-xl transition-all text-center shadow-lg hover:shadow-xl">
                      View Profile →
                    </div>
                  </div>
                </div>
              </Link>

              {/* Manage Complaints Card */}
              <Link href="/admin/complaint">
                <div className="group bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📋</div>
                    <h3 className="text-2xl font-bold mb-3">Manage Complaints</h3>
                    <p className="text-emerald-100 text-sm mb-6">
                      Review and manage all <span className="font-bold text-lg">{stats.total}</span> complaints
                    </p>
                    <div className="w-full bg-yellow-400 text-emerald-700 hover:bg-yellow-300 font-bold py-3 px-6 rounded-xl transition-all text-center shadow-lg hover:shadow-xl">
                      Manage →
                    </div>
                  </div>
                </div>
              </Link>

              {/* Manage Users Card */}
              <Link href="/admin/users">
                <div className="group bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">👥</div>
                    <h3 className="text-2xl font-bold mb-3">Registered Users</h3>
                    <p className="text-indigo-100 text-sm mb-6">View all registered citizens in the system</p>
                    <div className="w-full bg-yellow-400 text-indigo-700 hover:bg-yellow-300 font-bold py-3 px-6 rounded-xl transition-all text-center shadow-lg hover:shadow-xl">
                      View Users →
                    </div>
                  </div>
                </div>
              </Link>

            </div>
          </div>

          {/* Recent Statistics Info */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Dashboard Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <p className="text-gray-600 text-sm font-semibold uppercase mb-2">Approval Rate</p>
                <p className="text-4xl font-bold text-blue-600">
                  {stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}%
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <p className="text-gray-600 text-sm font-semibold uppercase mb-2">Pending Rate</p>
                <p className="text-4xl font-bold text-yellow-600">
                  {stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0}%
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <p className="text-gray-600 text-sm font-semibold uppercase mb-2">Admin Info</p>
                <p className="text-lg font-bold text-gray-900">{adminUser?.username}</p>
                <p className="text-sm text-gray-500 mt-2">{adminUser?.email}</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

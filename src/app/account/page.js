'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UserDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('home');
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

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

      if (!authData.isAuthenticated) {
        router.push('/auth/login');
        return;
      }

      setUser(authData.user);

      // Fetch user's complaints
      const complaintsRes = await fetch('/api/complaint/my', {
        credentials: 'include',
      });

      if (complaintsRes.ok) {
        const complaintData = await complaintsRes.json();
        setComplaints(complaintData.complaints || []);
        setFilteredComplaints(complaintData.complaints || []);
      }
    } catch (err) {
      setError('Error loading data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterComplaints();
  }, [filterStatus, complaints]);

  const filterComplaints = () => {
    let filtered = [...complaints];

    if (filterStatus !== 'all') {
      filtered = filtered.filter((c) => c.status === filterStatus);
    }

    setFilteredComplaints(filtered);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'approved':
        return '✅';
      case 'rejected':
        return '❌';
      default:
        return '📋';
    }
  };

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === 'pending').length,
    approved: complaints.filter((c) => c.status === 'approved').length,
    rejected: complaints.filter((c) => c.status === 'rejected').length,
  };

  // Home Section
  const HomeSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* View Profile Card */}
      <div
        onClick={() => setActiveSection('profile')}
        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300"
      >
        <div className="flex flex-col items-center text-center">
          <div className="text-6xl mb-4">👤</div>
          <h3 className="text-2xl font-bold mb-2">My Profile</h3>
          <p className="text-blue-100 text-sm mb-6">View and manage your account</p>
          <button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-4 rounded-lg transition-colors">
            View Profile →
          </button>
        </div>
      </div>

      {/* My Complaints Card */}
      <div
        onClick={() => setActiveSection('complaints')}
        className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300"
      >
        <div className="flex flex-col items-center text-center">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-2xl font-bold mb-2">My Complaints</h3>
          <p className="text-purple-100 text-sm mb-6">
            Total: <span className="font-bold text-lg">{stats.total}</span>
          </p>
          <div className="w-full space-y-2">
            <button className="w-full bg-white text-purple-600 hover:bg-purple-50 font-bold py-3 px-4 rounded-lg transition-colors">
              View Complaints →
            </button>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-yellow-400 py-1 rounded">⏳ {stats.pending}</div>
              <div className="bg-green-400 py-1 rounded">✅ {stats.approved}</div>
              <div className="bg-red-400 py-1 rounded">❌ {stats.rejected}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Complaint Card */}
      <Link href="/complaint/create">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="flex flex-col items-center text-center h-full justify-center">
            <div className="text-6xl mb-4">➕</div>
            <h3 className="text-2xl font-bold mb-2">Create Complaint</h3>
            <p className="text-orange-100 text-sm mb-6">File a new complaint today</p>
            <button className="w-full bg-white text-orange-600 hover:bg-orange-50 font-bold py-3 px-4 rounded-lg transition-colors">
              Create New →
            </button>
          </div>
        </div>
      </Link>
    </div>
  );

  // Profile Section
  const ProfileSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-1 flex justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-6xl shadow-lg">
              👤
            </div>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{user?.username || 'User'}</h2>
            <p className="text-gray-600 text-lg mb-4">{user?.email || 'user@email.com'}</p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Account Type</p>
                <p className="text-gray-900 font-bold text-lg">Citizen</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Status</p>
                <p className="text-green-600 font-bold text-lg">Active</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Total Complaints</p>
                <p className="text-gray-900 font-bold text-lg">{stats.total}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Approved</p>
                <p className="text-green-600 font-bold text-lg">{stats.approved}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Your Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4">
            <p className="text-gray-500 text-sm uppercase font-semibold mb-2">Total Complaints Filed</p>
            <p className="text-4xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-gray-500 text-sm uppercase font-semibold mb-2">Approval Rate</p>
            <p className="text-4xl font-bold text-green-600">
              {stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">Account Information</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>📧 Email: <span className="font-semibold">{user?.email}</span></p>
          <p>👤 Username: <span className="font-semibold">{user?.username}</span></p>
          {user?.nic && <p>🆔 NIC: <span className="font-semibold">{user.nic}</span></p>}
          <p>✅ Account Status: <span className="font-semibold">Active</span></p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setActiveSection('home')}
          className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
        >
          ← Back to Home
        </button>
        <Link href="/complaint/create" className="flex-1">
          <button className="w-full px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors">
            + New Complaint
          </button>
        </Link>
      </div>
    </div>
  );

  // Complaints Section
  const ComplaintsSection = () => (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <p className="text-blue-100 text-sm font-semibold">Total</p>
          <p className="text-3xl font-bold mt-2">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
          <p className="text-yellow-100 text-sm font-semibold">Pending</p>
          <p className="text-3xl font-bold mt-2">{stats.pending}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <p className="text-green-100 text-sm font-semibold">Approved</p>
          <p className="text-3xl font-bold mt-2">{stats.approved}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
          <p className="text-red-100 text-sm font-semibold">Rejected</p>
          <p className="text-3xl font-bold mt-2">{stats.rejected}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex gap-4 items-end flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <Link href="/complaint/create">
            <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors whitespace-nowrap">
              + New Complaint
            </button>
          </Link>
        </div>
      </div>

      {/* Complaints List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Loading complaints...</p>
        </div>
      ) : filteredComplaints.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg mb-6">No complaints found</p>
          <Link href="/complaint/create">
            <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors">
              + File Your First Complaint
            </button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredComplaints.map((complaint) => (
            <div
              key={complaint._id}
              onClick={() => setSelectedComplaint(complaint._id)}
              className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer overflow-hidden"
            >
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">
                      Title
                    </p>
                    <p className="text-gray-900 font-bold text-lg line-clamp-2">
                      {complaint.title}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      ID: {complaint._id.toString().slice(-8)}
                    </p>
                  </div>

                  {/* Category */}
                  <div>
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">
                      Category
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {complaint.category}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">
                      Status
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full font-bold text-sm border ${getStatusColor(
                        complaint.status
                      )}`}
                    >
                      {getStatusIcon(complaint.status)} {complaint.status}
                    </span>
                  </div>

                  {/* Date & Action */}
                  <div className="text-right">
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">
                      Created
                    </p>
                    <p className="text-gray-900 font-semibold mb-4">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </p>
                    <Link href={`/complaint/${complaint._id}`}>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-semibold transition-colors text-sm">
                        View →
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Quick Preview */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {complaint.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => setActiveSection('home')}
        className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
      >
        ← Back to Home
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
              <p className="text-gray-600 text-sm mt-1">
                {activeSection === 'home'
                  ? 'Welcome to your dashboard'
                  : activeSection === 'profile'
                  ? 'Your Profile'
                  : 'My Complaints'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-6 text-red-700">
            {error}
          </div>
        )}

        {activeSection === 'home' && <HomeSection />}
        {activeSection === 'profile' && <ProfileSection />}
        {activeSection === 'complaints' && <ComplaintsSection />}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('home');
  const [adminUser, setAdminUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');

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
        setFilteredComplaints(complaintData);
      }

      // TODO: Fetch users list (you may need to create this API endpoint)
      // For now, we'll just set an empty array
      setUsers([]);
    } catch (err) {
      setError('Error loading data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterAndSortComplaints();
  }, [filterStatus, searchTerm, sortBy, complaints]);

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

  const filterAndSortComplaints = () => {
    let filtered = [...complaints];

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter((c) => c.status === filterStatus);
    }

    // Search by title, category, address
    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.address?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setFilteredComplaints(filtered);
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
      {/* Admin Profile Card */}
      <div
        onClick={() => setActiveSection('profile')}
        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300"
      >
        <div className="flex flex-col items-center text-center">
          <div className="text-6xl mb-4">👤</div>
          <h3 className="text-2xl font-bold mb-2">Admin Profile</h3>
          <p className="text-blue-100 text-sm mb-6">Manage your account information</p>
          <button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-4 rounded-lg transition-colors">
            View Profile →
          </button>
        </div>
      </div>

      {/* Manage Complaints Card */}
      <div
        onClick={() => setActiveSection('complaints')}
        className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300"
      >
        <div className="flex flex-col items-center text-center">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-2xl font-bold mb-2">Manage Complaints</h3>
          <p className="text-orange-100 text-sm mb-6">
            Total: <span className="font-bold text-lg">{stats.total}</span>
          </p>
          <div className="w-full space-y-2">
            <button className="w-full bg-white text-orange-600 hover:bg-orange-50 font-bold py-3 px-4 rounded-lg transition-colors">
              Manage →
            </button>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-yellow-400 py-1 rounded">⏳ {stats.pending}</div>
              <div className="bg-green-400 py-1 rounded">✅ {stats.approved}</div>
              <div className="bg-red-400 py-1 rounded">❌ {stats.rejected}</div>
            </div>
          </div>
        </div>
      </div>

      {/* View Users Card */}
      <div
        onClick={() => setActiveSection('users')}
        className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300"
      >
        <div className="flex flex-col items-center text-center">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-2xl font-bold mb-2">All Citizens</h3>
          <p className="text-purple-100 text-sm mb-6">
            Total: <span className="font-bold text-lg">{users.length}</span>
          </p>
          <button className="w-full bg-white text-purple-600 hover:bg-purple-50 font-bold py-3 px-4 rounded-lg transition-colors">
            View Citizens →
          </button>
        </div>
      </div>
    </div>
  );

  // Admin Profile Section
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{adminUser?.username || 'Admin User'}</h2>
            <p className="text-gray-600 text-lg mb-4">{adminUser?.email || 'admin@complaints.com'}</p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Role</p>
                <p className="text-gray-900 font-bold text-lg">Administrator</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Status</p>
                <p className="text-green-600 font-bold text-lg">Active</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Complaints Managed</p>
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
        <h3 className="text-xl font-bold text-gray-900 mb-4">Account Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4">
            <p className="text-gray-500 text-sm uppercase font-semibold mb-2">Total Complaints Processed</p>
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

      <button
        onClick={() => setActiveSection('home')}
        className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
      >
        ← Back to Home
      </button>
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

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-white text-sm font-semibold mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by title, category, address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-semibold mb-2">Filter Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:border-blue-400"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-white text-sm font-semibold mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:border-blue-400"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Complaints List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-white text-lg">Loading complaints...</p>
        </div>
      ) : filteredComplaints.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-12 text-center border border-white/20">
          <p className="text-white text-lg">No complaints found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredComplaints.map((complaint) => (
            <Link key={complaint._id} href={`/admin/complaint/${complaint._id}`}>
              <div className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.02]">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                  <div className="md:col-span-2">
                    <p className="text-gray-400 text-xs mb-1">TITLE</p>
                    <p className="text-white font-semibold line-clamp-2">{complaint.title}</p>
                    <p className="text-gray-400 text-xs mt-2">ID: {complaint._id.toString().slice(-8)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">CATEGORY</p>
                    <p className="text-white font-medium">{complaint.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">STATUS</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full font-semibold text-sm border ${getStatusColor(
                        complaint.status
                      )}`}
                    >
                      {getStatusIcon(complaint.status)} {complaint.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">CREATED</p>
                    <p className="text-white font-medium">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                      View →
                    </button>
                  </div>
                </div>
              </div>
            </Link>
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

  // Users Section
  const UsersSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Registered Citizens</h2>
        
        {users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No users to display yet</p>
            <p className="text-gray-500">Users will appear here once they register in the system.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Username</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">NIC</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Joined Date</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900 font-semibold">{user.username}</td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-gray-600">{user.nic || '-'}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <button
        onClick={() => setActiveSection('home')}
        className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
      >
        ← Back to Home
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-300 text-sm mt-1">
                {activeSection === 'home'
                  ? 'Welcome to admin panel'
                  : activeSection === 'profile'
                  ? 'Your Profile'
                  : activeSection === 'complaints'
                  ? 'Manage Complaints'
                  : 'All Citizens'}
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
          <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-lg p-6 text-red-200">
            {error}
          </div>
        )}

        {activeSection === 'home' && <HomeSection />}
        {activeSection === 'profile' && <ProfileSection />}
        {activeSection === 'complaints' && <ComplaintsSection />}
        {activeSection === 'users' && <UsersSection />}
      </div>
    </div>
  );
}

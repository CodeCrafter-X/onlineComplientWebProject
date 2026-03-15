'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function ManageUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    try {
      const authRes = await fetch('/api/token-check', {
        credentials: 'include',
      });
      const authData = await authRes.json();

      if (!authData.isAuthenticated || authData.user?.role !== 'admin') {
        router.push('/auth/login');
        return;
      }

      // For now, fetch complaints to show user stats
      const complaintsRes = await fetch('/api/complaint/getAll', {
        credentials: 'include',
      });

      if (complaintsRes.ok) {
        const complaintData = await complaintsRes.json();
        // Extract unique users from complaints
        const uniqueUsers = {};
        complaintData.forEach((complaint) => {
          if (complaint.userId && !uniqueUsers[complaint.userId]) {
            uniqueUsers[complaint.userId] = {
              _id: complaint.userId,
              username: complaint.username || 'Unknown User',
              email: complaint.userEmail || 'N/A',
              complaints: 1,
              createdAt: complaint.createdAt,
            };
          } else if (complaint.userId) {
            uniqueUsers[complaint.userId].complaints += 1;
          }
        });

        const usersList = Object.values(uniqueUsers);
        setUsers(usersList);
        setFilteredUsers(usersList);
      } else {
        // Fallback: show empty users list
        setUsers([]);
        setFilteredUsers([]);
      }
    } catch (err) {
      setError('Error loading users');
      console.error(err);
      setUsers([]);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterUsers();
  }, [searchTerm, users]);

  const filterUsers = () => {
    let filtered = [...users];

    if (searchTerm) {
      filtered = filtered.filter(
        (u) =>
          u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg font-semibold">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin" className="text-blue-600 hover:text-blue-700 font-semibold mb-4 inline-flex items-center gap-2">
              ← Back to Dashboard
            </Link>
            <h1 className="text-5xl font-bold text-gray-900 mb-2">Registered Users</h1>
            <p className="text-lg text-gray-600">Manage all registered citizens in the system</p>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg mb-8">
              <p className="font-semibold">{error}</p>
            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-600">
              <p className="text-gray-600 text-sm font-semibold uppercase mb-2">Total Users</p>
              <p className="text-4xl font-bold text-blue-600">{users.length}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-green-600">
              <p className="text-gray-600 text-sm font-semibold uppercase mb-2">Active Today</p>
              <p className="text-4xl font-bold text-green-600">{users.length}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-purple-600">
              <p className="text-gray-600 text-sm font-semibold uppercase mb-2">Total Complaints</p>
              <p className="text-4xl font-bold text-purple-600">
                {users.reduce((sum, u) => sum + (u.complaints || 0), 0)}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Search Users</h3>
            <input
              type="text"
              placeholder="Search by username or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {filteredUsers.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-600 text-xl mb-2">No users found</p>
                <p className="text-gray-500">Try searching with different terms</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-50 to-purple-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-8 py-6 text-left text-sm font-bold text-gray-900">Username</th>
                      <th className="px-8 py-6 text-left text-sm font-bold text-gray-900">Email</th>
                      <th className="px-8 py-6 text-left text-sm font-bold text-gray-900">Complaints Filed</th>
                      <th className="px-8 py-6 text-left text-sm font-bold text-gray-900">Member Since</th>
                      <th className="px-8 py-6 text-left text-sm font-bold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user, index) => (
                      <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {user.username.charAt(0).toUpperCase()}
                            </div>
                            <p className="text-gray-900 font-semibold">{user.username}</p>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-gray-600 font-medium">{user.email}</p>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-bold">
                              {user.complaints || 0}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <p className="text-gray-600 font-medium">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                          </p>
                        </td>
                        <td className="px-8 py-6">
                          <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold">
                            ✓ Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Additional Stats */}
          {users.length > 0 && (
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">User Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6">
                  <p className="text-gray-600 text-sm font-semibold uppercase mb-2">Average Complaints per User</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {users.length > 0 ? (users.reduce((sum, u) => sum + (u.complaints || 0), 0) / users.length).toFixed(1) : 0}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <p className="text-gray-600 text-sm font-semibold uppercase mb-2">Most Active User</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {users.length > 0 ? Math.max(...users.map(u => u.complaints || 0)) : 0}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6">
                  <p className="text-gray-600 text-sm font-semibold uppercase mb-2">User Engagement</p>
                  <p className="text-3xl font-bold text-green-600">
                    {users.length > 0 ? Math.round((users.filter(u => (u.complaints || 0) > 0).length / users.length) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="mt-8">
            <Link href="/admin" className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

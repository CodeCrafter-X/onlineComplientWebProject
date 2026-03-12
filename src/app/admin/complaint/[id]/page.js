'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function ComplaintDetail() {
  const router = useRouter();
  const params = useParams();
  const complaintId = params.id;

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    fetchComplaint();
  }, [complaintId]);

  const fetchComplaint = async () => {
    try {
      const res = await fetch(`/api/complaint/${complaintId}`, {
        credentials: 'include',
      });

      if (!res.ok) {
        setError('Failed to fetch complaint');
        return;
      }

      const data = await res.json();
      setComplaint(data.complaint);
      setSelectedStatus(data.complaint.status);
    } catch (err) {
      setError('Error loading complaint');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (selectedStatus === complaint.status) {
      return;
    }

    setUpdating(true);
    try {
      const res = await fetch(`/api/complaint/${complaintId}/status-update`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: selectedStatus }),
      });

      if (!res.ok) {
        setError('Failed to update status');
        return;
      }

      const data = await res.json();
      setComplaint(data.complaint);
      alert('Status updated successfully!');
    } catch (err) {
      setError('Error updating status');
      console.error(err);
    } finally {
      setUpdating(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading complaint details...</div>
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-8 text-center">
            <p className="text-red-200 text-lg">{error || 'Complaint not found'}</p>
            <Link
              href="/admin"
              className="mt-4 inline-block px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Complaint Detail</h1>
          <Link
            href="/admin"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Main Info Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{complaint.title}</h2>
                <p className="text-gray-400">ID: {complaint._id.toString()}</p>
              </div>
              <span
                className={`inline-block px-4 py-2 rounded-full font-bold text-lg border ${getStatusColor(
                  complaint.status
                )}`}
              >
                {getStatusIcon(complaint.status)} {complaint.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-white/20">
              <div>
                <p className="text-gray-400 text-sm mb-1">CATEGORY</p>
                <p className="text-white font-semibold">{complaint.category}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">CREATED</p>
                <p className="text-white font-semibold">
                  {new Date(complaint.createdAt).toLocaleDateString()} at{' '}
                  {new Date(complaint.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">LAST UPDATED</p>
                <p className="text-white font-semibold">
                  {new Date(complaint.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">FILED BY</p>
                <p className="text-white font-semibold">
                  {complaint.user?.username || 'Unknown'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">Description</h3>
          <p className="text-gray-100 leading-relaxed text-lg">{complaint.description}</p>
        </div>

        {/* Location Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 text-sm mb-2">ADDRESS</p>
              <p className="text-white font-semibold text-lg">
                {complaint.address || 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">COORDINATES</p>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white font-mono">
                  Lat: <span className="text-blue-400">{complaint.location.lat}</span>
                </p>
                <p className="text-white font-mono">
                  Lng: <span className="text-blue-400">{complaint.location.lng}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="mt-6">
            <iframe
              width="100%"
              height="400"
              frameBorder="0"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${complaint.location.lat},${complaint.location.lng}`}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Images Card */}
        {complaint.images && complaint.images.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Attached Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {complaint.images.map((image, index) => (
                <div key={index} className="group">
                  <img
                    src={image}
                    alt={`Complaint image ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:opacity-80 transition-opacity cursor-pointer"
                    onClick={() => window.open(image, '_blank')}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User Info Card */}
        {complaint.user && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-4">User Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-2">USERNAME</p>
                <p className="text-white font-semibold text-lg">{complaint.user.username}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">EMAIL</p>
                <p className="text-white font-semibold text-lg">{complaint.user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Status Update Card */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50 rounded-xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">Update Complaint Status</h3>
          <div className="flex gap-4 flex-wrap">
            {['pending', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedStatus === status
                    ? 'bg-blue-500 text-white border-2 border-blue-300'
                    : 'bg-white/10 text-gray-300 border-2 border-white/20 hover:border-white/40'
                }`}
              >
                {getStatusIcon(status)} {status.toUpperCase()}
              </button>
            ))}
          </div>

          {selectedStatus !== complaint.status && (
            <div className="mt-6">
              <button
                onClick={handleStatusUpdate}
                disabled={updating}
                className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg transition-all disabled:opacity-50"
              >
                {updating ? 'Updating...' : 'Confirm Status Update'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

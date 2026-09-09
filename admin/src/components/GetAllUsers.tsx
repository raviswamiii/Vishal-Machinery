import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Users, RefreshCw } from "lucide-react";

interface User {
  _id: string;
  name: string;
  number?: string;
  email: string;
  createdAt: string;
}

export const GetAllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${backendUrl}/api/admin/all`);

      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);

      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [backendUrl]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await axios.delete(`${backendUrl}/api/admin/${id}`);

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);

      alert("Failed to delete user.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F6FAEF] p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold montserrat">Users</h1>

          <p className="text-sm text-gray-600 mt-1">
            Manage all registered users.
          </p>
        </div>

        {/* Refresh */}
        <button
          onClick={fetchUsers}
          disabled={loading}
          className="flex items-center justify-center gap-2 border border-gray-300 bg-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Total Users */}
      {!loading && !error && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
          <p className="text-sm text-gray-500">Total Users</p>

          <p className="text-3xl font-bold mt-1">{users.length}</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm min-h-75 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-yellow-400 rounded-full animate-spin"></div>

            <p className="text-sm text-gray-500">Loading users...</p>
          </div>
        </div>
      ) : users.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-xl shadow-sm min-h-75 flex flex-col items-center justify-center">
          <Users className="w-12 h-12 text-gray-300 mb-3" />

          <h2 className="font-semibold text-gray-700">No users found</h2>

          <p className="text-sm text-gray-500 mt-1">
            Registered users will appear here.
          </p>
        </div>
      ) : (
        /* Users Table */
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-175">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    #
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    User
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Phone
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Email
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Joined
                  </th>

                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {users.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition">
                    {/* Number */}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {index + 1}
                    </td>

                    {/* Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center font-semibold text-yellow-700">
                          {user.name.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {user.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            ID: {user._id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.number || "Not provided"}
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(user.createdAt)}
                    </td>

                    {/* Delete */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(user._id)}
                        disabled={deletingId === user._id}
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-red-500 hover:bg-red-50 transition disabled:opacity-50"
                        title="Delete user"
                      >
                        {deletingId === user._id ? (
                          <div className="w-4 h-4 border-2 border-red-200 border-t-red-500 rounded-full animate-spin"></div>
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

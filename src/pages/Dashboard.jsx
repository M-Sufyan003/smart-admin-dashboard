import { useState, useEffect } from "react";
import SummaryCards from "../components/SummaryCards/SummaryCards";
import DataTable from "../components/DataTable/DataTable";
import SearchBar from "../components/SearchBar/SearchBar";
import AddUserModal from "../components/AddUserModal/AddUserModal";
import { fetchUsers } from "../services/api";
import { RiUserAddLine, RiRefreshLine } from "react-icons/ri";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUsers();
      // console.log(data);
      setUsers(data);
    } catch (err) {
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deleteId));
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const handleAdd = (user) => {
    setUsers((prev) => [user, ...prev]);

    setAlert("User Added Successfully");
    setShowModal(false);

    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  return (
    <div className={styles.page}>
      {alert && <div className={styles.successAlert}>{alert}</div>}

      <SummaryCards totalUsers={users.length} />

      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <div>
            <h2 className={styles.sectionTitle}>User Directory</h2>
            <p className={styles.sectionSub}>
              {loading
                ? "Loading..."
                : `${filtered.length} of ${users.length} users`}
            </p>
          </div>
          <div className={styles.tableActions}>
            <SearchBar value={search} onChange={setSearch} />
            <button
              className={styles.refreshBtn}
              onClick={loadUsers}
              title="Refresh"
            >
              <RiRefreshLine className={loading ? styles.spinning : ""} />
            </button>
            <button
              className={styles.addBtn}
              onClick={() => setShowModal(true)}
            >
              <RiUserAddLine />
              <span>Add User</span>
            </button>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        {loading ? (
          <div className={styles.loadingTable}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={styles.skeleton}
                style={{ animationDelay: `${i * 0.08}s` }}
              />
            ))}
          </div>
        ) : (
          <DataTable users={filtered} onDelete={handleDelete} />
        )}
      </div>

      {showModal && (
        <AddUserModal onClose={() => setShowModal(false)} onAdd={handleAdd} />
      )}

      {deleteId && (
        <div className={styles.modalBackdrop}>
          <div className={styles.confirmModal}>
            <h3>Delete User</h3>
            <p>Are you sure you want to delete this user?</p>

            <div className={styles.modalActions}>
              <button onClick={cancelDelete} className={styles.cancelBtn}>
                Cancel
              </button>

              <button onClick={confirmDelete} className={styles.deleteBtn}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

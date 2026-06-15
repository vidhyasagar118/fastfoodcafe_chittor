import { useEffect, useState } from "react";
import API from "../api";

const Usersinfo = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="users-page">
      <h1>👥 Registered Users</h1>

      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Joined</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <img
                  src={user.picture}
                  alt={user.name}
                  width="50"
                  height="50"
                  style={{
                    borderRadius: "50%",
                  }}
                />
              </td>

              <td>{user.name}</td>
              <td>{user.email}</td>

              <td>
                {new Date(
                  user.createdAt
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usersinfo;
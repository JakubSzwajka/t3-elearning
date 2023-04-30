import { type RouterOutputs, api } from "~/utils/api";

const UserRow = ({
  user,
}: {
  user: RouterOutputs["user"]["getAll"][number];
}) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
    </tr>
  );
};

const UsersHeader = () => {
  return (
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
  );
};

const UsersPage = () => {
  const { data: users } = api.user.getAll.useQuery();
  console.log(users);
  if (!users) return <div>Loading...</div>;

  return (
    <div>
      <h1>Users Page</h1>
      <UsersHeader />
      <table>
        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </table>
    </div>
  );
};

export default UsersPage;

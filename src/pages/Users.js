import React from "react";
import { useGetUsersQuery } from "../store/features/api/apiSlice";

function Users() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;

  if (isLoading) {
    content = <p>...loading</p>;
  } else if (isSuccess) {
    content = users.map(user => <div key={user.id}>{users}</div>);
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <div>
      <p>All Users</p>
      {content}
    </div>
  );
}

export default Users;

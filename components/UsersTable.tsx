import Link from "next/link";
import React from "react";
import { ReactSVG } from "react-svg";
import { CloseButton } from "../atoms/CloseButton";
import { User } from "../types/user";

export const UsersTable = ({
  users,
  onDelete,
  onPasswordChange
}: {
  users: User[];
  onDelete: (user: User) => void;
  onPasswordChange: (user: User) => void;
}) => {
  return (
    <table
      className="[&_td]:border-b-1 w-full [&_td]:border-primary [&_td]:p-2 [&_th]:border-b-2
[&_th]:border-primary [&_th]:p-2"
    >
      <thead>
        <tr>
          <th className=" text-dark">User Email</th>
          <th>Change Password</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.uid}>
            <td>{user.email}</td>
            <td className="text-center">
              <button onClick={onPasswordChange.bind(null, user)}>
                <ReactSVG
                  src="/edit2.svg"
                  className="mb-1 h-4 w-4 fill-gray-500 text-secondary"
                />
              </button>
            </td>
            <td className="text-center">
              <CloseButton
                transparent={true}
                onClick={onDelete.bind(null, user)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

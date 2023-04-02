import Head from "next/head";
import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../molecules/DeleteConfirmation";
import { User } from "../../types/user";
import Layout from "../layout";
import { UsersTable } from "../../components/UsersTable";
import { Controller, useForm } from "react-hook-form";
import { AddUserForm } from "../../types/add-user-form";
import { UpdatePassForm } from "../../types/update-pass-form";
import axios from "axios";

const UsersAdmin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [adding, setAdding] = useState(false);
  const [addErrorMessage, setAddErrorMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [selectedItem, setSelectedItem] = useState<User>();
  const [submitting, setSubmitting] = useState(false);

  const loadUsers = async () => {
    try {
      let res = await axios.get("../api/get-users");
      if (res && res.data) {
        let users = res.data.users;
        setUsers(users);
      } else {
        console.log("invalid response from server");
      }
    } catch (e) {
      setError("email", {
        type: "server",
        message: "Something went wrong please try again later",
      });
    }
  };

  const onClickAddUser = () => {
    setAdding(true);
  };

  const {
    control,
    setError,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<AddUserForm>();

  const {
    control: controlPass,
    setError: setPassError,
    formState: { errors: errorsPass },
    handleSubmit: handlePassSubmit,
  } = useForm<UpdatePassForm>();

  const onAddSubmit = (data: AddUserForm) => {
    if (data.email.trim() === "") {
      setError("email", {
        type: "required",
        message: "Email is required",
      });
    } else if (data.password !== data.repeatPassword) {
      setError("repeatPassword", {
        type: "server",
        message: "Passwords do not match.",
      });
    } else if (data.phoneNumber?.trim() === "") {
      setError("phoneNumber", {
        type: "server",
        message: "Phone number is required",
      });
    } else {
      setAddErrorMessage("");
      handleSubmit((formData) => {
        axios
          .post("../api/add-user", {
            ...formData,
          })
          .then((res) => {
            reset();
            setSubmitting(true);
            toast.success("User added successfully");
            setAdding(false);
            setSubmitting(false);
            loadUsers();
          })
          .catch((e) => {
            setError("email", {
              type: "server",
              message: e.response.data.error.message,
            });
            setAddErrorMessage(e.response.data.error.message);
            setSubmitting(false);
          });
      })();
    }
  };

  const onUpdatePassSubmit = (data: UpdatePassForm) => {
    if (selectedItem && selectedItem.uid) {
      data.uid = selectedItem.uid;
      if (data.password.trim() === "") {
        setError("password", {
          type: "required",
          message: "Password is required",
        });
      } else {
        axios
          .post("../api/update-user", {
            ...data,
          })
          .then((res) => {
            setSubmitting(true);
            reset();
            toast.success("Password updated successfully");
            setSubmitting(false);
            setUpdatePassword(false);
          })
          .catch((e) => {
            setPassError("password", {
              type: "server",
              message: e.response.data.error.message,
            });
            setSubmitting(false);
            reset({ password: "" });
          });
      }
    }
  };

  const onDeleteConfirm = async () => {
    if (selectedItem && selectedItem.uid) {
      try {
        await axios.post("/api/delete-user", { id: selectedItem.uid });
        loadUsers();
        setShowConfirm(false);
        toast.success("Successfully deleted user");
      } catch (err: any) {
        setShowConfirm(false);
        toast.error("Error deleting user");
      }
    }
  };

  const onCancelDelete = () => {
    setShowConfirm(false);
  };

  const onCancelAdd = () => {
    setAdding(false);
    setAddErrorMessage("");
    reset();
  };

  const onCancelUpdatePass = () => {
    setUpdatePassword(false);
  };

  return (
    <>
      <Head>
        <title>Users - BIOBIBAR Admin</title>
        <meta
          name="description"
          content="View, add, edit, delete and change password for Biobibar users"
        />
        <link rel="canonical" href={`https://www.biobibar.com/admin/users`} />
      </Head>
      <Layout isAdmin>
        <h1 className="text-dark flex items-center text-3xl font-bold text-primary">
          Users
          <button className="ml-4" onClick={onClickAddUser}>
            <ReactSVG src="/plus.svg" className="inline-block h-8 w-8" />
          </button>
        </h1>
        {adding && (
          <>
            <div
              style={{ background: "rgba(0,0,0,0.7)" }}
              className="z-1 fixed inset-x-0 top-0 left-0 m-auto h-screen w-screen"
            ></div>
            <div
              style={{ width: 600, height: 550 }}
              className="fixed inset-0 z-50 m-auto rounded-xl bg-white px-8 shadow-2xl"
            >
              <h3 className="py-10 text-2xl font-bold text-primary">
                Add new user
              </h3>
              <form onSubmit={handleSubmit(onAddSubmit)}>
                <table className="w-full [&_td]:pb-3">
                  <tbody>
                    <tr>
                      <td>
                        <label htmlFor="email">Email</label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name="email"
                          rules={{ required: true }}
                          render={({ field }) => (
                            <input
                              className="input input-primary"
                              placeholder="john.doe@gmail.com"
                              type="email"
                              autoComplete="on"
                              defaultValue=""
                              {...field}
                            />
                          )}
                        />
                        {errors.email && errors.email.type !== "server" && (
                          <span style={{ color: "red" }}>
                            Email is required
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div
                          className="flex"
                          title="Password must be a string with at least six characters."
                        >
                          <label className="mr-4" htmlFor="password">
                            Password
                          </label>
                          <ReactSVG src="/info.svg" className="mb-1 h-4 w-4 cursor-pointer" />
                        </div>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name="password"
                          rules={{ required: true }}
                          render={({ field }) => (
                            <input
                              className="input input-primary"
                              placeholder="enter your password"
                              type="password"
                              autoComplete="off"
                              defaultValue=""
                              {...field}
                            />
                          )}
                        />
                        {errors.password && (
                          <span style={{ color: "red" }}>
                            Password is required
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="repeatPassword">Repeat password</label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name="repeatPassword"
                          rules={{ required: true }}
                          render={({ field }) => (
                            <input
                              className="input input-primary"
                              type="password"
                              placeholder="repeat your password"
                              autoComplete="off"
                              defaultValue=""
                              {...field}
                            />
                          )}
                        />
                        {errors.repeatPassword && (
                          <span style={{ color: "red" }}>
                            Passwords do not match
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="displayName">Name</label>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name="displayName"
                          render={({ field }) => (
                            <input
                              className="input input-primary"
                              placeholder="John Doe"
                              type={"text"}
                              defaultValue=""
                              {...field}
                            />
                          )}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div
                          className="flex"
                          title="Phone number must be a non-empty E.164 standard compliant identifier string (e.g., +12223334444)"
                        >
                          <label className="mr-4" htmlFor="phoneNumber">
                            Phone Number
                          </label>
                          <ReactSVG src="/info.svg" className="mb-1 h-4 w-4 cursor-pointer" />
                        </div>
                      </td>
                      <td>
                        <Controller
                          control={control}
                          name="phoneNumber"
                          rules={{ required: true }}
                          render={({ field }) => (
                            <input
                              className="input input-primary"
                              placeholder="+12223334444"
                              type={"tel"}
                              defaultValue=""
                              {...field}
                            />
                          )}
                        />
                        {errors.phoneNumber && (
                          <span style={{ color: "red" }}>
                            Phone number is required
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button
                          disabled={submitting}
                          className="btn-secondary mt-8 w-52 disabled:bg-gray-400"
                          type="submit"
                        >
                          Save
                        </button>
                        {submitting && <p>saving....</p>}
                      </td>
                      <td>
                        <button
                          className="[&:hover]:btn-primary mt-8 ml-20 w-52"
                          type="button"
                          onClick={onCancelAdd}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {addErrorMessage && (
                  <p style={{ color: "red" }}>{addErrorMessage}</p>
                )}
              </form>
            </div>
          </>
        )}
        <div className=" min-h-300">
          <UsersTable
            users={users}
            onDelete={(user: User) => {
              setSelectedItem(user);
              setShowConfirm(true);
            }}
            onPasswordChange={(user: User) => {
              setSelectedItem(user);
              setUpdatePassword(true);
            }}
          />
          {!users.length && (
            <div className="flex justify-center">
              <button
                className="btn-primary-sm m-8 text-xl font-bold"
                onClick={loadUsers}
              >
                View Users
              </button>
            </div>
          )}
        </div>

        {showConfirm && (
          <DeleteConfirmation
            onCancel={onCancelDelete}
            onConfirm={onDeleteConfirm}
          />
        )}

        {updatePassword && (
          <>
            <div
              style={{ background: "rgba(0,0,0,0.7)" }}
              className="z-1 fixed inset-x-0 top-0 left-0 m-auto h-screen w-screen"
            ></div>
            <div
              style={{ width: 600, height: 240 }}
              className="fixed inset-0 z-50 m-auto rounded-xl bg-white px-8 shadow-2xl"
            >
              <form onSubmit={handlePassSubmit(onUpdatePassSubmit)}>
                <table className="w-full [&_td]:pb-3 [&_td]:pt-8">
                  <tbody>
                    <tr>
                      <td>
                        <div
                          className="flex"
                          title="Password must be a string with at least six characters."
                        >
                          <label className="mr-4" htmlFor="password">
                            New password
                          </label>
                          <ReactSVG src="/info.svg" className="mb-1 h-4 w-4 cursor-pointer" />
                        </div>
                      </td>
                      <td>
                        <Controller
                          control={controlPass}
                          name="password"
                          rules={{ required: true }}
                          render={({ field }) => (
                            <input
                              className="input input-primary"
                              placeholder="enter new password"
                              type="password"
                              autoComplete="off"
                              {...field}
                            />
                          )}
                        />
                        {errorsPass.password?.type === "required" && (
                          <span style={{ color: "red" }}>
                            Password is required
                          </span>
                        )}
                        {errorsPass.password?.type === "server" && (
                          <span style={{ color: "red" }}>
                            {errorsPass.password.message}
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button
                          disabled={submitting}
                          className="btn-secondary w-52 disabled:bg-gray-400"
                          type="submit"
                        >
                          Save
                        </button>
                        {submitting && <p>saving....</p>}
                      </td>
                      <td>
                        <button
                          className="[&:hover]:btn-primary ml-20 w-52"
                          type="button"
                          onClick={onCancelUpdatePass}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default UsersAdmin;

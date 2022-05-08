"use strict";
// import { User, UserOperations } from "../../models/users";
// const operations: UserOperations = new UserOperations();
// describe("UserOperations", () => {
//   const tempUser: User = {
//     first_name: "John",
//     last_name: "Doe",
//     password: "USERoperations",
//   };
//   const updateUser: User = {
//     first_name: "Arsany",
//     last_name: "milad",
//     password: "12345",
//   };
//   it("should create a new user", async () => {
//     const newUser: User = await operations.createUser(tempUser);
//     expect(newUser.first_name).toEqual(tempUser.first_name);
//   });
//   it("should get user", async () => {
//     const user: User = await operations.getUser("John");
//     expect(user.first_name).toEqual("John");
//     expect(user.last_name).toEqual("Doe");
//   });
//   it("should get all users", async () => {
//     expect((await operations.getUsers()).length).toEqual(1);
//   });
//   it("should update user", async () => {
//     expect(await operations.updateUser(updateUser.password,tempUser.first_name)).toEqual(updateUser);
//   });
//   it("should delete user", async () => {
//     expect(await operations.deleteUser("Arsany")).toEqual(updateUser);
//   });
// });

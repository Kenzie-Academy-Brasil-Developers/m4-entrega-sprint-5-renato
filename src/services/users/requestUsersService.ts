import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser } from "../../interfaces/users";

const requestUsersService = async (): Promise<IUser[]> => {
  const userRep = AppDataSource.getRepository(User);

  let noPasswordUsers: IUser[] = [];

  const users = await userRep.find();

  users.forEach((user) => {
    let { password, ...newUser } = user;

    noPasswordUsers.push(newUser);
  });

  return noPasswordUsers;
};

export { requestUsersService };

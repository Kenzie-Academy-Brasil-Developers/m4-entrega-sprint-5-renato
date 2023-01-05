import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest, IUser } from "../../interfaces/users";

const createUserService = async (payload: IUserRequest): Promise<IUser> => {
  const userRep = AppDataSource.getRepository(User);
  const user = userRep.create(payload);

  await userRep.save(user);

  const { password, ...newUser } = user;

  return newUser;
};

export { createUserService };

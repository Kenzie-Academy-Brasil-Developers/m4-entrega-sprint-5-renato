import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../Errors/AppError";

const deleteUserService = async (userId: string) => {
  const userRep = AppDataSource.getRepository(User);

  const user = await userRep.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("user not found", 404);
  }

  if (user?.isActive === false) {
    throw new AppError("User is already Inactive", 400);
  }

  user.isActive = false;

  await userRep.save(user);

  return {};
};

export { deleteUserService };

import { IUserUpdate } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../Errors/AppError";

const editUserService = async (payload: IUserUpdate, id: string) => {
  const cantChangeIsActive = payload.hasOwnProperty("isActive");
  const cantChangeIsAdm = payload.hasOwnProperty("isAdm");
  const cantChangeId = payload.hasOwnProperty("id");

  if (cantChangeIsActive || cantChangeIsAdm || cantChangeId) {
    throw new AppError(
      "these properties cant be changed: id,isActive,isAdm",
      401
    );
  }

  const userRep = AppDataSource.getRepository(User);

  const foundUser = await userRep.findOneBy({
    id: id,
  });

  if (!foundUser) {
    throw new AppError("user not found", 404);
  }

  const editedUser = userRep.create({
    ...foundUser,
    ...payload,
  });

  const { password, ...noPwUser } = editedUser;

  await userRep.save(editedUser);

  return noPwUser;
};

export { editUserService };

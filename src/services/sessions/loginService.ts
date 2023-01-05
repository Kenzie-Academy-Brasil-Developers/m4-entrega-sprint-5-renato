import AppDataSource from "../../data-source";
import { ILogin } from "../../interfaces/sessions/sessionInterfaces";
import { User } from "../../entities/user.entity";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../../Errors/AppError";

const userLoginService = async ({
  email,
  password,
}: ILogin): Promise<object> => {
  const userRep = AppDataSource.getRepository(User);

  const user = await userRep.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("User or Password Invalid", 403);
  }

  if (user.isActive === false) {
    throw new AppError("User is not active", 400);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("User or Password Invalid", 403);
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
    },
    process.env.SECRET_KEY as string,
    {
      subject: String(user.id),
      expiresIn: "12h",
    }
  );

  return { token: token };
};

export { userLoginService };

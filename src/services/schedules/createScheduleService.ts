import { IScheduleRequest } from "../../interfaces/schedules";
import jwt from "jsonwebtoken";
import { AppError } from "../../Errors/AppError";
import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/schedules.entity";
import { User } from "../../entities/user.entity";
import { Properties } from "../../entities/property.entity";

const createScheduleService = async (
  payload: IScheduleRequest,
  token: string | undefined
) => {
  const schedulesRep = AppDataSource.getRepository(Schedules);
  const userRep = AppDataSource.getRepository(User);
  const propertyRep = AppDataSource.getRepository(Properties);
  const schedulesBuilder = schedulesRep.createQueryBuilder("schedules");

  let realToken = token?.split(" ")[1] as string;

  const { id } = jwt.decode(realToken) as {
    id: string;
  };

  let userId = id as string;

  const user = await userRep.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new AppError("user not found", 404);
  }

  const property = await propertyRep.findOneBy({
    id: payload.propertyId,
  });

  if (!property) {
    throw new AppError("property not found", 404);
  }

  const date = new Date(payload.date + ", " + payload.hour);

  const hour = date.getHours();

  const day = date.getDay();

  if (day === 0 || day === 6) {
    throw new AppError("invalid date", 400);
  }

  if (hour <= 8 || hour >= 18) {
    throw new AppError("invalid hour", 400);
  }

  const userSchedules = await schedulesBuilder
    .leftJoinAndSelect("schedules.user", "user")
    .where("user.id = :id", { id: userId })
    .andWhere("date = :date", { date: payload.date })
    .andWhere("hour = :hour", { hour: payload.hour })
    .getMany();

  if (userSchedules.length > 0) {
    throw new AppError("Invalid Date", 409);
  }

  const propertySchedules = await schedulesBuilder
    .leftJoinAndSelect("schedules.property", "properties")
    .where("properties.id = :id", { id: payload.propertyId })
    .andWhere("hour = :hour", { hour: payload.hour })
    .andWhere("date = :date", { date: payload.date })
    .getMany();

  if (propertySchedules.length > 0) {
    throw new AppError("invalid Date or Hour", 409);
  }

  const newSchedule = schedulesRep.create({
    ...payload,
    user: user,
    property: property,
  });

  await schedulesRep.save(newSchedule);

  return { message: "Schedule created" };
};

export { createScheduleService };

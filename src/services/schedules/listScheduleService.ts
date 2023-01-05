import AppDataSource from "../../data-source";
import { Adress } from "../../entities/adress.entity";
import { Categories } from "../../entities/category.entity";
import { Properties } from "../../entities/property.entity";
import { Schedules } from "../../entities/schedules.entity";
import { AppError } from "../../Errors/AppError";

const listSchedules = async (propertyId: string) => {
  const propertyRep = AppDataSource.getRepository(Properties);
  const schedulesRep = AppDataSource.getRepository(Schedules);
  const propertyBuilder = propertyRep.createQueryBuilder("properties");
  const schedulesBuilder = schedulesRep.createQueryBuilder("schedules");

  const foundProperty = await propertyRep.findOneBy({ id: propertyId });

  if (!foundProperty) {
    throw new AppError("property not found", 404);
  }

  const propertySchedules = await propertyBuilder
    .innerJoinAndSelect("properties.schedules", "schedules")
    .innerJoinAndSelect("properties.address", "adresses")
    .innerJoinAndSelect("properties.category", "categories")
    .where("properties.id = :id", { id: propertyId })
    .getOne();

  return propertySchedules;
};

export { listSchedules };

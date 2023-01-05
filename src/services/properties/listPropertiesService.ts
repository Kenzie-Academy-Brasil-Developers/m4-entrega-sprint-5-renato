import AppDataSource from "../../data-source";
import { Adress } from "../../entities/adress.entity";
import { Properties } from "../../entities/property.entity";
import { IPropertyResponse } from "../../interfaces/properties";

const listPropertiesService = async () => {
  const propertyRep = AppDataSource.getRepository(Properties);
  const propertyQueryBuilder = propertyRep.createQueryBuilder("properties");

  const properties = await propertyQueryBuilder
    .leftJoinAndSelect("properties.address", "adresses")
    .leftJoinAndSelect("properties.category", "categories")

    .getMany();

  return properties;
};

export { listPropertiesService };

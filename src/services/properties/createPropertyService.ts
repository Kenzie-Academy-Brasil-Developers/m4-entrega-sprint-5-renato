import AppDataSource from "../../data-source";
import { Adress } from "../../entities/adress.entity";
import { Categories } from "../../entities/category.entity";
import { Properties } from "../../entities/property.entity";
import { AppError } from "../../Errors/AppError";
import { IAddressRequest, IPropertyRequest } from "../../interfaces/properties";

const createPropertyService = async (
  property: IPropertyRequest,
  adress: IAddressRequest
) => {
  const propertyRep = AppDataSource.getRepository(Properties);
  const adressRep = AppDataSource.getRepository(Adress);
  const categoryRep = AppDataSource.getRepository(Categories);

  const adressExists = await adressRep.findOneBy({
    zipCode: adress.zipCode,
  });

  if (adressExists) {
    throw new AppError("Address is already registred!", 409);
  }

  if (adress.zipCode.length > 8) {
    throw new AppError("invalid zip code", 400);
  }

  const state = adress.state.split("");

  if (state.length > 2) {
    throw new AppError("invalid state", 409);
  }

  const newAddress = adressRep.create(adress);
  await adressRep.save(newAddress);

  const category = await categoryRep.findOneBy({
    id: property.categoryId,
  });

  if (!category) {
    throw new AppError("category not found!", 400);
  }

  const newProperty = propertyRep.create({
    ...property,
    address: newAddress,
    category: category,
  });
  await propertyRep.save(newProperty);

  return newProperty;
};

export { createPropertyService };

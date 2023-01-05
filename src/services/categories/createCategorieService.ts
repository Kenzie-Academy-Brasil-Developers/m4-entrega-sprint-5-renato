import AppDataSource from "../../data-source";
import { Categories } from "../../entities/category.entity";
import { AppError } from "../../Errors/AppError";
import {
  ICategoryRequest,
  ICategoryResponse,
} from "../../interfaces/categories";

const createCategorieService = async (
  payload: ICategoryRequest
): Promise<ICategoryResponse> => {
  const categoryRep = AppDataSource.getRepository(Categories);
  const verifyCategory = await categoryRep.findOneBy({
    name: payload.name,
  });

  if (verifyCategory) {
    throw new AppError("Category already exists!", 409);
  }

  const category = categoryRep.create(payload);

  await categoryRep.save(category);

  return category;
};

export { createCategorieService };

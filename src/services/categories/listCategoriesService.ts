import AppDataSource from "../../data-source";
import { Categories } from "../../entities/category.entity";
import { ICategoryResponse } from "../../interfaces/categories";

const listCategoriesService = async (): Promise<ICategoryResponse[]> => {
  const categoryRep = AppDataSource.getRepository(Categories);

  const categories = await categoryRep.find();

  return categories;
};

export { listCategoriesService };

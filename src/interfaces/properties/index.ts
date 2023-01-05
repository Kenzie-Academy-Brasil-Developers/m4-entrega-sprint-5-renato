import { ICategoryResponse } from "../categories";

interface IAddressRequest {
  district: string;
  zipCode: string;
  number?: string;
  city: string;
  state: string;
}

interface IPropertyRequest {
  value: number;
  size: number;
  address: IAddressRequest;
  categoryId: string;
}

interface IPropertyResponse {
  value: number;
  size: number;
  address: IAddressRequest;
  category: ICategoryResponse;
}

export { IAddressRequest, IPropertyRequest, IPropertyResponse };

import * as yup from "yup";
import { SchemaOf } from "yup";
import { ILogin } from "../../interfaces/sessions/sessionInterfaces";

const loginSerializer: SchemaOf<ILogin> = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export { loginSerializer };

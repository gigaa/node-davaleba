import * as Yup from "yup";

export const SignUSchema = Yup.object().shape({
  fullName: Yup.string().required("require"),
  email: Yup.string().email().required("require"),
  password: Yup.string().required("require").min(6, "min6").max(20, "max20"),
});

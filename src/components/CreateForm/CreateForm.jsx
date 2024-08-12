//import { Form } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import styles from "./CreateForm.module.css";
import * as Yup from "yup";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { createContact } from "../../services/requests";

import ButtonComponent from "../Shared/ButtonComponent";
const validationSchema = Yup.object()
  .shape({
    firstName: Yup.string().max(
      20,
      "First name is too long (max 20 characters)"
    ),
    lastName: Yup.string().max(20, "Last name is too long (max 20 characters)"),
    email: Yup.string()
      .email("Invalid email format")
      .max(50, "Email is too long (max 50 characters)")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      )
      .required("Email is required"),
  })

  .test(
    "firstNameOrLastName",
    "Either first name or last name must be provided",
    function (value) {
      const { firstName, lastName } = value;

      if (!firstName && !lastName) {
        return this.createError({
          path: "firstNameOrLastName",
          message: "Either first name or last name must be provided",
        });
      }
      return true;
    }
  );

const CreateForm = () => {
  const navigate = useNavigate();
  return (
    <div className="container stickyContainer">
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // if (values.firstName === "" && values.lastName === "") {
          //   alert("First Name or Last Name cannot be empty");
          //   setSubmitting(false);
          //   return;
          // } else {

          const contactWithAdditionalFields = {
            fields: {
              email: [
                {
                  value: values.email,
                },
              ],
              "first name": [
                {
                  value: values.firstName,
                },
              ],
              "last name": [
                {
                  value: values.lastName,
                },
              ],
            },
            record_type: "person",
            privacy: {
              edit: null,
              read: null,
            },
            owner_id: null,
          };

          await createContact(contactWithAdditionalFields);
          setSubmitting(false);
          resetForm();
          navigate("/", { replace: true });
          // }
        }}
      >
        {({ errors, touched, handleChange, handleBlur, isSubmitting }) => {
          console.log("Errors: ", errors);
          console.log("Is submitting: ", isSubmitting);
          return (
            <Form className={styles.formWrp}>
              <h3 className={styles.sectionTitle}>Create Contact</h3>
              <div style={{ marginBottom: "16px" }}>
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Field name="firstName">
                  {({ field }) => (
                    <FormControl
                      fullWidth
                      error={touched.firstName && !!errors.firstName}
                    >
                      <OutlinedInput
                        id="firstName"
                        size="small"
                        {...field}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <FormHelperText>
                        {touched.firstName && errors.firstName}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <Field name="lastName">
                  {({ field }) => (
                    <FormControl
                      fullWidth
                      error={touched.lastName && !!errors.lastName}
                    >
                      <OutlinedInput
                        size="small"
                        id="lastName"
                        {...field}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <FormHelperText>
                        {touched.lastName && errors.lastName}
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>
              </div>
              {errors.firstNameOrLastName && (
                <FormHelperText error>
                  {errors.firstNameOrLastName}
                </FormHelperText>
              )}

              <div style={{ marginBottom: "16px" }}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Field name="email">
                  {({ field }) => (
                    <FormControl
                      fullWidth
                      error={touched.email && !!errors.email}
                    >
                      <OutlinedInput
                        size="small"
                        id="email"
                        {...field}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormHelperText>{errors.email}</FormHelperText>
                    </FormControl>
                  )}
                </Field>
              </div>

              <ButtonComponent
                text="Add Contact"
                width="100%"
                type="submit"
                disabled={
                  isSubmitting || !!errors.firstNameOrLastName || !!errors.email
                }
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateForm;

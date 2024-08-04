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
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),
});
const CreateForm = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
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
          console.log(
            "contactWithAdditionalFields ",
            contactWithAdditionalFields
          );
          await createContact(contactWithAdditionalFields);
          setSubmitting(false);
          resetForm();
          navigate("/", { replace: true });
        }}
      >
        {({ errors, touched, isSubmitting, handleChange, handleBlur }) => (
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
                      //   placeholder="First name"
                      {...field}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {/* <FormHelperText>{errors.firstName}</FormHelperText> */}
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
                      //   placeholder="Last name"
                      {...field}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {/* <FormHelperText>{errors.lastName}</FormHelperText> */}
                    <FormHelperText>
                      {touched.lastName && errors.lastName}
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>
            </div>

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
                      //   placeholder="Enter email"
                      {...field}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormHelperText>{errors.email}</FormHelperText>
                  </FormControl>
                )}
              </Field>
            </div>

            {/* <Button
              type="submit"
              // color="primary"
              disabled={isSubmitting}
              variant="outlined"
              sx={{
                color: "rgba(0, 0, 0, 0.6)",
                borderColor: "rgba(0, 0, 0, 0.6)",
              }}
            >
              Add Contact
            </Button> */}
            <ButtonComponent text="Add Contact" width="100%" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

// const CreateForm = () => {
//   return (
//     <Form method="post" id="contact-form">
//       <label>First Name</label>
//       <input
//         placeholder="First name"
//         aria-label="First name"
//         type="text"
//         name="first name"
//       />
//       <label>Last Name</label>
//       <input
//         placeholder="Last name"
//         aria-label="Last name"
//         type="text"
//         name="last name"
//         // defaultValue={contact?.last}
//       />

//       <label>Email</label>
//       <span>Email</span>
//       <input
//         type="text"
//         name="email"
//         placeholder="enter email"
//         // defaultValue={contact?.twitter}
//       />

//       <p>
//         <button type="submit">Add Contact</button>
//       </p>
//     </Form>
//   );
// };

export default CreateForm;

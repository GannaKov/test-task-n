//import { Form } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import styles from "./CreateForm.module.css";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
} from "@mui/material";
import { createContact } from "../../services/requests";
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
      <h1 className={styles.sectionTitle}>Create Contact</h1>
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
            <div style={{ marginBottom: "16px" }}>
              <Field name="firstName">
                {({ field }) => (
                  <FormControl
                    fullWidth
                    error={touched.firstName && !!errors.firstName}
                  >
                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                    <Input
                      id="firstName"
                      placeholder="First name"
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
              <Field name="lastName">
                {({ field }) => (
                  <FormControl
                    fullWidth
                    error={touched.lastName && !!errors.lastName}
                  >
                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                    <Input
                      id="lastName"
                      placeholder="Last name"
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
              <Field name="email">
                {({ field }) => (
                  <FormControl
                    fullWidth
                    error={touched.email && !!errors.email}
                  >
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                      id="email"
                      placeholder="Enter email"
                      {...field}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormHelperText>{errors.email}</FormHelperText>
                  </FormControl>
                )}
              </Field>
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Add Contact
            </Button>
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

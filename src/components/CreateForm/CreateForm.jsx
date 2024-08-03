import { Form } from "react-router-dom";

const CreateForm = () => {
  return (
    <Form method="post" id="contact-form">
      <label>First Name</label>
      <input
        placeholder="First name"
        aria-label="First name"
        type="text"
        name="first name"
      />
      <label>Last Name</label>
      <input
        placeholder="Last name"
        aria-label="Last name"
        type="text"
        name="last name"
        // defaultValue={contact?.last}
      />

      <label>Email</label>
      <span>Email</span>
      <input
        type="text"
        name="email"
        placeholder="enter email"
        // defaultValue={contact?.twitter}
      />

      <p>
        <button type="submit">Add Contact</button>
      </p>
    </Form>
  );
};

export default CreateForm;

import { Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";

import { Head, Form, LogbookCard, SearchBar } from "~/components";

import styles from "./styles.module.css";

interface FormValues {
  title: string;
  description: string;
}

const EditLogbookSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(45, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .min(2, "Too Short!")
    .max(240, "Too Long!")
    .required("Required"),
});

const Library: React.FC = () => {
  const initialValues: FormValues = { title: "", description: "" };

  const handleSubmit = ({ title, description }: FormValues) => {
    console.log({ title, description });
  };

  return (
    <>
      <Head title="Library" />

      <section className={styles.header}>
        <h1 className={styles.title}>Library</h1>
        <div className={styles.searchBarWrapper}>
          <SearchBar onSearch={(e) => console.log(e)} />
        </div>
      </section>

      <ul>
        <li>
          <Link href="/">Homepage</Link>
        </li>
        <li>
          <Link href="logbook">Logbook Detail</Link>
        </li>
        <li>
          <Link href="bookcase">Bookcase</Link>
        </li>
      </ul>

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={EditLogbookSchema}
      >
        {({ values }) => (
          <Form>
            <Form.Field
              as="input"
              name="title"
              hint={`Max length: ${values.title.length}/45}`}
              label="Title"
            />
            <Form.Field
              as="textarea"
              name="description"
              hint={`Max length: ${values.description.length}/240}`}
              label="Summary"
            />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>

      <div className="l-col-full">
        <LogbookCard padding="base"></LogbookCard>
        <hr></hr>
        <LogbookCard padding="base"></LogbookCard>
        <br></br>
        <LogbookCard padding="loose" shadow border></LogbookCard>
        <br></br>
        <LogbookCard padding="loose" shadow borderHover></LogbookCard>
        <br></br>
      </div>
    </>
  );
};

export default Library;

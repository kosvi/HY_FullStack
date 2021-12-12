import React from "react";
import { OccupationalHealthCareEntry } from "../types";
import { Formik, Form, Field } from "formik";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { Button } from "semantic-ui-react";
import { useStateValue } from "../state";

export type OccupationalFormValues = Omit<OccupationalHealthCareEntry, "id">;

interface Props {
  onSubmit: (values: OccupationalFormValues) => void;
  onCancel: () => void;
}

const AddOccupationalEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <h4>Add occupational healthcare entry</h4>
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Employer name"
              palceholder="employer name"
              name="employerName"
              component={TextField}
            />
            <div>Sick leave:</div>
            <Field
              label="Start date"
              placeholder="start date"
              name="startDate"
              component={TextField}
            />
            <Field
              label="End date"
              placeholder="end date"
              name="endDate"
              component={TextField}
            />
            <Button type="button" onClick={onCancel} color="red">
              Cancel
            </Button>
            <Button type="submit" color="green" disabled={!dirty || !isValid}>
              Save
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddOccupationalEntryForm;
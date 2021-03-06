import React from "react";
import { HospitalEntry } from "../types";
import { Formik, Form, Field } from "formik";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { Button } from "semantic-ui-react";
import { useStateValue } from "../state";

export type HospitalFormValues = Omit<HospitalEntry, "id">;

interface Props {
  onSubmit: (values: HospitalFormValues) => void;
  onCancel: () => void;
}

const AddHospitalEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: ""
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
        if(!values.discharge.date){
          errors.dischargeDate = requiredError;
        }
        if(!values.discharge.criteria){
          errors.dischargeCriteria = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <h4>Add hospital entry</h4>
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
              label="Discharge date"
              placeholder="discharge date"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="discharge criteria"
              name="discharge.criteria"
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

export default AddHospitalEntryForm;
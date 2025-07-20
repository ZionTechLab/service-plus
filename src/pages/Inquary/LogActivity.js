import * as Yup from "yup";
import { useFormikBuilder } from "../../helpers/formikBuilder";
import InputField from "../../helpers/InputField";

const fields = {
    datetime: {
        name: "datetime",
        type: "date",
        placeholder: "Date Time",
        initialValue: "",
        validation: Yup.string().required("Date Time is required"),
    },
    assignee: {
        name: "assignee",
        type: "text",
        placeholder: "Assignee",
        initialValue: "",
        validation: Yup.string().required("Assignee is required"),
    },
    comment: {
        name: "comment",
        type: "textarea",
        placeholder: "Comment",
        initialValue: "",
        validation: Yup.string().required("Comment is required"),
    },
};

function LogActivity({ inquiryId, onLogActivitySubmit }) {
    const handleLogActivitySubmit = (values, { resetForm }) => {
        onLogActivitySubmit(values);
        resetForm();
    };

    const formik = useFormikBuilder(fields, handleLogActivitySubmit);

    return (
        <div>
            <h4>Add Log Activity</h4>
            <form onSubmit={formik.handleSubmit} noValidate>
                <div className="row g-3">
                    <InputField {...fields.datetime} formik={formik} />
                    <InputField {...fields.assignee} formik={formik} />
                    <InputField {...fields.comment} formik={formik} />
                    <button className="w-100 btn btn-primary btn-lg" type="submit">
                        Add Log
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LogActivity;

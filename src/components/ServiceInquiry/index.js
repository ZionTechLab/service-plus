import * as Yup from "yup";
import InputField from "../../helpers/InputField";
import {useFormikBuilder} from "../../helpers/formikBuilder";

const inquiryTypes =

[
  {key:1,value: "quotation"},
  {key:2,value: "technical_support"},
  {key:3,value: "complain"},
  {key:4,value: "repair"},
  {key:5,value: "new_order"},
];

// const priorities = {
//   LOW: "low",
//   MEDIUM: "medium",
//   HIGH: "high",
// };

const priorities =[
  {key:1,value:"low"},
    {key:2,value:"medium"},
      {key:3,value:"high"}

]



const fields = {
  firstName: {
    name: "firstName",
    type: "text",
    placeholder: "First Name",
    initialValue: "",
    validation: Yup.string().required("First Name is required"),
  },
  lastName: {
    name: "lastName",
    type: "text",
    placeholder: "Last Name",
    initialValue: "",
    validation: Yup.string().required("Last Name is required"),
  },
  email: {
    name: "email",
    type: "email",
    placeholder: "Email",
    initialValue: "",
    validation: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  },
  phone: {
    name: "phone",
    type: "text",
    placeholder: "Phone",
    initialValue: "",
    validation: Yup.string().required("Phone number is required"),
  },
  serviceType: {
    name: "serviceType",
    type: "select", // assuming it's a dropdown
    placeholder: "Service Type",
    dataBinding: {data:inquiryTypes,keyField:'key',valueField:'value'},//Object.values(inquiryTypes),
    initialValue: inquiryTypes.QUOTATION,
    validation: Yup.string(), // optional validation
  },
  priority: {
    name: "priority",
    type: "select", // assuming dropdown
    placeholder: "Priority",
      dataBinding: {data:priorities,keyField:'key',valueField:'value'},// options: Object.values(priorities),
    initialValue: priorities.MEDIUM,
    validation: Yup.string(), // optional
  },
  subject: {
    name: "subject",
    type: "text",
    placeholder: "Subject",
    initialValue: "",
    validation: Yup.string().required("Subject is required"),
  },
  message: {
    name: "message",
    type: "textarea",
    placeholder: "Message",
    initialValue: "",
    validation: Yup.string().required("Message is required"),
  },
};


function ServiceInquiry() {

 const handleInquirySubmit = (values, { resetForm }) => {
  const inquiries = JSON.parse(localStorage.getItem("inquiries")) || [];

  const newInquiry = {
    ...values,
    id: new Date().getTime(),
    status: "new",
    log: [{ status: "new", timestamp: new Date() }],
  };

  inquiries.push(newInquiry);
  localStorage.setItem("inquiries", JSON.stringify(inquiries));
  resetForm();
};

  const formik = useFormikBuilder(fields, handleInquirySubmit);
  
  return (
    <div className="container">
        <div className="py-5 text-center">
            <h1 className="h2">Service Inquiry</h1>
            <p className="lead">Complete your purchase below</p>
        </div>

        <div className="row g-5">
            <div className="col-md-5 col-lg-4 order-md-last">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-primary">Your cart</span>
                    <span className="badge bg-primary rounded-pill">3</span>
                </h4>
                <ul className="list-group mb-3">
                    <li className="list-group-item d-flex justify-content-between lh-sm"><div><h6 className="my-0">Product name</h6><small className="text-body-secondary">Brief description</small></div><span className="text-body-secondary">$12</span></li>
                    <li className="list-group-item d-flex justify-content-between lh-sm"><div><h6 className="my-0">Second product</h6><small className="text-body-secondary">Brief description</small></div><span className="text-body-secondary">$8</span></li>
                    <li className="list-group-item d-flex justify-content-between lh-sm"><div><h6 className="my-0">Third item</h6><small className="text-body-secondary">Brief description</small></div><span className="text-body-secondary">$5</span></li>
                    <li className="list-group-item d-flex justify-content-between bg-body-tertiary"><div className="text-success"><h6 className="my-0">Promo code</h6><small>EXAMPLECODE</small></div><span className="text-success">−$5</span></li>
                    <li className="list-group-item d-flex justify-content-between"><span>Total (USD)</span><strong>$20</strong></li>
                </ul>
                <form className="card p-2">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Promo code"/>
                        <button type="submit" className="btn btn-secondary">Redeem</button>
                    </div>
                </form>
            </div>

            <div className="col-md-7 col-lg-8">
                <h4 className="mb-3">Billing address</h4>
                <form onSubmit={formik.handleSubmit} noValidate>
                    <div className="row g-3">
                        <div className="col-sm-6">
                          <label htmlFor="firstName" className="form-label">First name</label>
                          <InputField {...fields.firstName} formik={formik} />
                        </div>
                        <div className="col-sm-6">
                          <label htmlFor="lastName" className="form-label">Last name</label>
                          <InputField {...fields.lastName} formik={formik} />
                        </div>
                        <div className="col-12">
                          <label htmlFor="email" className="form-label">Email</label>
                          <InputField {...fields.email} formik={formik} />
                        </div>
                        <div className="col-12">
                          <label htmlFor="address" className="form-label">Address</label>
                          <InputField {...fields.phone} formik={formik} />
                        </div>
                        <div className="col-md-5">
                          <label htmlFor="country" className="form-label">Country</label>
                          <InputField {...fields.serviceType} formik={formik} />
                        </div>
                        <div className="col-md-4">
                          <label htmlFor="state" className="form-label">State</label>
                          <InputField {...fields.priority} formik={formik} />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="zip" className="form-label">Zip</label>
                          <InputField {...fields.subject} formik={formik} />
                        </div>
                    </div>

                    <hr className="my-4"/>

                    <h4 className="mb-3">Payment</h4>
                    <div className="my-3">
                        <div className="form-check"><input id="credit" name="paymentMethod" type="radio" className="form-check-input" checked required/><label className="form-check-label" htmlFor="credit">Credit card</label></div>
                        <div className="form-check"><input id="debit" name="paymentMethod" type="radio" className="form-check-input" required/><label className="form-check-label" htmlFor="debit">Debit card</label></div>
                        <div className="form-check"><input id="paypal" name="paymentMethod" type="radio" className="form-check-input" required/><label className="form-check-label" htmlFor="paypal">PayPal</label></div>
                    </div>
                    <div className="row gy-3">
                        <div className="col-md-6">
                          <label htmlFor="cc-name" className="form-label">Name on card</label>
                          <InputField {...fields.message} formik={formik} />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="cc-number" className="form-label">Credit card number</label>
                          <input type="text" className="form-control" id="cc-number" required/>
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                          <input type="text" className="form-control" id="cc-expiration" required/>
                        </div>
                        <div className="col-md-3"><label htmlFor="cc-cvv" className="form-label">CVV</label><input type="text" className="form-control" id="cc-cvv" required/></div>
                    </div>

                    <hr className="my-4"/>
                    <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default ServiceInquiry;
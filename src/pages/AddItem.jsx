// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import InputField from '../helpers/InputField';
// import { useNavigate } from 'react-router-dom';

// const initialValues = {
//   name: '',
//   description: '',
// };

// const validationSchema = Yup.object({
//   name: Yup.string().required('Name is required'),
//   description: Yup.string().required('Description is required'),
// });

// function AddItem() {
//   const navigate = useNavigate();
//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit: (values, { resetForm }) => {
//       const items = JSON.parse(localStorage.getItem('items')) || [];
//       const newItem = { ...values, id: new Date().getTime() };
//       items.push(newItem);
//       localStorage.setItem('items', JSON.stringify(items));
//       resetForm();
//       navigate('/item-master');
//     },
//   });

//   return (
//     <div>
//       <h1>Add Item</h1>
//       <form onSubmit={formik.handleSubmit} noValidate>
//         <InputField name="name" type="text" placeholder="Name" formik={formik} />
//         <InputField name="description" type="text" placeholder="Description" formik={formik} />
//         <button type="submit">Add Item</button>
//       </form>
//     </div>
//   );
// }

// export default AddItem;

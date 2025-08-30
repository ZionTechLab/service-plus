import DataTable from '../../components/DataTable';
import ApiService from './InvoiceService';
import { useEffect, useState } from 'react';
import { useFormikBuilder, FieldsRenderer } from '../../helpers/formikBuilder';

function InvoiceIndex() {
  const [uiData, setUiData] = useState({loading: false, success: false, error: '', data: {} });
  const [reportData, setReportData] = useState({loading: false, success: false, error: '', data: {} });

  const fields = {
    txnType: {
      name: 'txnType',
      type: 'select',
      placeholder: 'Report Type',
      initialValue: 'NT',
      className: "col-md-4 col-sm-6",
      dataBinding: {
        data: uiData.data?.reports,
        keyField: "txnType",
        valueField: "txnTypename",
      },
    },
    fromDate: {
      name: 'fromDate',
      type: 'date',
      placeholder: 'From Date',className: "col-md-4 col-sm-6",
      initialValue: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .split('T')[0],
    },
    toDate: {
      name: 'toDate',
      type: 'date',
      placeholder: 'To Date',
      initialValue: new Date().toISOString().split('T')[0],
      className: "col-md-4 col-sm-6",
    },
    partner: {
      name: 'partner',
      type: 'partner-select',
      placeholder: 'Partner',
      initialValue: '',
      className: "col-md-8 col-sm-6",
    },
    ref1: {
      name: 'ref1',
      type: 'select',
      placeholder: 'Vehicle Type',
      initialValue: '',
      className: "col-md-4 col-sm-6",
      dataBinding: {
        data: uiData.data?.vehicleType,
        keyField: "id",
        valueField: "value",
      },
    },
  };

  const handleSubmit = async (values, { resetForm } ) => {
    setReportData(prev => ({ ...prev, loading: true, error: '', data: {} }));
    const response = await ApiService.getReport({ ...values });
    setReportData(prev => ({ ...prev, ...response , loading: false }));
  };
  
  const formik = useFormikBuilder(fields, handleSubmit);
    
  useEffect(() => {
    const fetchUi = async () => {
      setUiData(prev => ({ ...prev, loading: true, error: '', data: {} }));
      const data = await ApiService.getUi();
      setUiData(prev => ({ ...prev, ...data , loading: false }));
    };
    fetchUi();
  }, []);

 useEffect(() => {
   setReportData(prev => ({ ...prev, data:{} }));
 }, [formik.values]);

  const handleClear = () => {
    formik.resetForm();  
     setReportData(prev => ({ ...prev, data:{} }));
  };

  return (
    <div>
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={formik.handleSubmit} className="row g-2">
            <FieldsRenderer fields={fields} formik={formik} inputProps={{ autocomplete: 'off' }} />

            <div className="d-flex justify-content-end mt-3">
              <button type="button" className="btn btn-secondary me-2" onClick={() => handleClear()}>Clear</button>
              <button type="submit" className="btn btn-primary">View Report</button>
            </div>
          </form>
        </div>
      </div>

      { reportData.data.result && !reportData.loading && !reportData.error && (
        <DataTable name="Invoice Report" data={reportData.data.result} columns={reportData.data.columns} showHeader={false} />
      )}
      {reportData.error && <div className="alert alert-danger mt-3">{reportData.error}</div>}
    </div>
  );
}

export default InvoiceIndex;
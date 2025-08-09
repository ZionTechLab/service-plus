import { Link, useNavigate } from 'react-router-dom';
import DataTable from '../../components/DataTable';
import { useEffect, useState } from 'react';
import MessageBoxService from '../../services/MessageBoxService';
import { useLoadingSpinner } from '../../hooks/useLoadingSpinner';

function VehicaleConfirmation() {
  const [uiData, setUiData] = useState({ error: '', data: [] });
  const navigate = useNavigate();
  const { showSpinner, hideSpinner } = useLoadingSpinner();

  useEffect(() => {
    const fetchConfirmations = async () => {
      showSpinner();
      try {
        // TODO: Replace with actual service call
        setUiData({ error: '', data: [] });
      } catch (error) {
        setUiData({ error: 'Failed to fetch vehicle confirmations. Please try again later.', data: [] });
      } finally {
        hideSpinner();
      }
    };
    fetchConfirmations();
  }, []);

  const handleDelete = (id) => {
    MessageBoxService.show({
      message: 'Are you sure you want to delete this confirmation?',
      type: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => {
        const updated = uiData.data.filter((data) => data.id !== id);
        setUiData({ ...uiData, data: updated });
      },
      onClose: null
    });
  };

  const handleEdit = (id) => {
    navigate(`/vehicale-confirmation/edit/${id}`);
  };

  const columns = [
    { header: 'Actions', isAction: true, actionTemplate: (row) => (
      <div className="d-flex gap-2 justify-content-center">
        <button className="btn btn-outline-primary btn-icon btn-sm" title="Edit" onClick={() => handleEdit(row.id)}>
          <i className="bi bi-pencil"></i>
        </button>
        <button className="btn btn-outline-danger btn-icon btn-sm" title="Delete" onClick={() => handleDelete(row.id)}>
          <i className="bi bi-trash"></i>
        </button>
      </div>
    ) },
    { header: 'Vehicle Model', field: 'vehicleModel' },
    { header: 'Grade', field: 'grade' },
    { header: 'Colour', field: 'colour' },
    { header: 'Year', field: 'year' },
    { header: 'KM', field: 'km' },
    { header: 'Chassis No', field: 'chassisNo' },
    { header: 'Supplier/Customer', field: 'supplierCustomer' },
    { header: 'Purchase Date', field: 'purchaseDate' },
    { header: 'CIF YEN', field: 'cifYen' },
    { header: 'Auction Price', field: 'auctionPrice' },
    { header: 'TAX', field: 'tax' },
    { header: 'Frate', field: 'frate' },
    { header: 'Payment Details', field: 'paymentDetails' },
    { header: 'L.C Open Details', field: 'lcOpenDetails' },
    { header: 'L.C Margin Amount', field: 'lcMarginAmount' },
    { header: 'L.C Settlement Amount', field: 'lcSettlementAmount' },
    { header: 'Duty Amount', field: 'dutyAmount' },
    { header: 'Clearing Date & Chargers', field: 'clearingDateChargers' },
    { header: 'Sale tax & transport cost', field: 'saleTaxTransportCost' },
    { header: 'Total Cost', field: 'totalCost' },
    { header: 'Discription', field: 'discription' },
  ];

  return (
    <div>
      <DataTable name="Vehicle Confirmation" data={uiData.data} columns={columns} >
        <Link to="/vehicale-confirmation/add">
          <button className="btn btn-primary">New</button>
        </Link>
      </DataTable>
      {uiData.error && (
        <div className="alert alert-danger mt-3">{uiData.error}</div>
      )}
    </div>
  );
}

export default VehicaleConfirmation;

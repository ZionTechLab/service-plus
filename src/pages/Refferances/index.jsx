import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectInitData } from '../../features/auth/authSlice';
import DataTable from '../../components/DataTable';
import { useEffect, useState } from 'react';
import ApiService from './RefferanceService';
import MessageBoxService from '../../services/MessageBoxService';

function RefferanceListing() {
  const [uiData, setUiData] = useState({loading: false, success: false, error: '', data: [] });
  const navigate = useNavigate();
  const { category } = useParams();
  const initData = useSelector(selectInitData);
  const slugify = (s) => String(s || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  const metaList = initData?.meta || [];
  const matched = category ? metaList.find(m => slugify(m.categoryName) === category) : null;
  const categoryType = matched?.categoryType || 70;

  useEffect(() => {
    const fetchUi = async () => {
      setUiData((prev) => ({ ...prev, loading: true, error: '', data: [] }));
  const data = await ApiService.getAll({ categoryType });
console.log(data);

      setUiData((prev) => ({ ...prev, ...data, loading: false }));
    };
    fetchUi();
    // eslint-disable-next-line
  }, [categoryType]);

  const handleDelete = async (id) => {
       MessageBoxService.show({
      message: 'Are you sure you want to delete this invoice?',
      type: 'danger',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => {
        const updated = uiData.data.filter((data) => data.id !== id);
        setUiData({ ...uiData, data: updated });
        localStorage.setItem('invoices', JSON.stringify(updated));
      },
      onClose: null
    });
  };

  const handleEdit = (id) => {
  const base = category ? `/refferance/${category}` : '/refferance';
  navigate(`${base}/edit/${id}`);
  };

  const columns = [
    {
      header: 'Actions',
      isAction: true,
      actionTemplate: (row) => (
        <div className="d-flex gap-2 justify-content-center">
          <button className="btn btn-outline-primary btn-icon btn-sm" title="Edit" onClick={() => handleEdit(row.id)}>
            <i className="bi bi-pencil"></i>
          </button>
          <button className="btn btn-outline-danger btn-icon btn-sm" title="Delete" onClick={() => handleDelete(row.id)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      )
    },
    { header: 'ID', field: 'id' },
    { header: uiData.data.meta?.metaValue,field: 'value', class:'text-nowrap'  },
    { header: uiData.data.meta?.metaDesc, field: 'description', class:'text-nowrap'  },
    { header: 'Active', field: 'active', type: "boolean" , class:'text-center'  },

  ];

  return (
    <div>
      {!uiData.loading && !uiData.error && (
        <DataTable name={uiData.data.meta?.metaName || 'References'} data={uiData.data.data} columns={columns}>
          <Link to={category ? `/refferance/${category}/add` : '/refferance/add'}>
            <button className="btn btn-primary">New</button>
          </Link>
        </DataTable>
      )}
      {uiData.error && (
        <div className="alert alert-danger mt-3">{uiData.error}</div>
      )}
    </div>
  );
}

export default RefferanceListing;
import { Button } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
const PaymentHistoryTable = ({ paymentCamps }) => {
    const TextField = styled.input`
    height: 32px;
    width: 200px;
    border-radius: 3px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #e5e5e5;
    padding: 0 32px 0 16px;
    
    &:hover {
        cursor: pointer;
    }
    `;

    const FilterComponent = ({ filterText, onFilter, onClear }) => (
        <>
            <TextField
                id="search"
                type="text"
                placeholder="Filter By Name"
                aria-label="Search Input"
                value={filterText}
                onChange={onFilter}
            />
            <Button
                className='px-5 py-2 mr-10 ml-3' type="button" onClick={onClear}>
                X
            </Button>
        </>
    );

    const columns = [
        {
            name: 'ID',
            selector: (id, idx) => <span>{`${idx + 1} .`}</span>,
            maxWidth: "100px",
        },
        {
            name: 'Camp Name',
            selector: (camp) => camp.campName,
            width: "25%"
        },
        {
            name: 'Camp Fees',
            selector: (camp) => <span>{`$ ${camp.campFees}`}</span>,

        },
        {
            name: 'Payment Status',
            selector: (camp) => camp.paymentStatus,
        },
        {
            name: 'Confirmation Status',
            selector: (camp) => camp.confirmationStatus,
        },
        {
            name: 'Transection ID',
            selector: (camp) => camp.transectionId,
            width: "25%"
        },

    ]

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = paymentCamps.filter(
        item => item.campName && item.campName.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);



    return <DataTable columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        highlightOnHover
        selectableRows
        persistTableHead />
};


PaymentHistoryTable.propTypes = {
    paymentCamps: PropTypes.array,
    onFilter: PropTypes.func,
    onClear: PropTypes.func,
    filterText: PropTypes.string,
};

export default PaymentHistoryTable;
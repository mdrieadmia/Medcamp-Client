import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
const PaymentHistoryTable = ({ paymentCamps }) => {

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
            width : "25%"
        },
        
    ]

    return <DataTable columns={columns} data={paymentCamps} fixedHeader highlightOnHover pagination />
};


PaymentHistoryTable.propTypes = {
    paymentCamps: PropTypes.array,
};

export default PaymentHistoryTable;
import { Button } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import { FaCheck } from 'react-icons/fa6';


const ManageRegisteredCampTable = ({allRegisteredCamps, handleCampDelete}) => {
    const columns = [
        {
            name: 'ID',
            selector: (id, idx) => <span>{`${idx + 1} .`}</span>,
            maxWidth: "100px",
        },
        {
            name: 'Participant Name',
            selector: (camp) => camp.participantName,
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
            name: 'Cancel',
            selector: (camp) => <Button disabled={camp.paymentStatus === 'Paid' || camp.confirmationStatus === 'Confirmed'} onClick={()=>handleCampDelete(camp._id)} className='bg-red-500'> <FaCheck/> </Button>,
        },
        
    ]

    return <DataTable columns={columns} data={allRegisteredCamps} fixedHeader highlightOnHover pagination />
};


ManageRegisteredCampTable.propTypes = {
    allRegisteredCamps: PropTypes.array,
    handleCampDelete: PropTypes.func,
};

export default ManageRegisteredCampTable;
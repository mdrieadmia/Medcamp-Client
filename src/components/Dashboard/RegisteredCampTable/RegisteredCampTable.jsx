import { Button } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import { FaXmark } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
const RegisteredCampTable = ({ registeredCamps, handleDelete }) => {

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
            name: 'Participant Name',
            selector: (camp) => camp.participantName,
        },
        {
            name: 'Payment Status',
            selector: (camp) => <div>
                {
                    camp.paymentStatus === 'Unpaid' && <Link to={`/dashboard/payment/${camp._id}`}> <Button className='bg-gray-700 py-[5px] px-[20px] normal-case'>Pay</Button> </Link>
                }
                {
                    camp.paymentStatus === 'Paid' && <Button className='py-[5px] px-[18px] bg-green-500 normal-case' disabled>Paid</Button>
                }
            </div>
        },
        {
            name: 'Confirmation Status',
            selector: (camp) => camp.confirmationStatus
        },
        {
            name: 'Cancel',
            selector: (camp) => <div>
                {
                    camp.paymentStatus === 'Unpaid' ?
                        <Button onClick={() => handleDelete(camp._id)} className='bg-red-500 py-[5px] px-[10px]'> <FaXmark /> </Button>
                        :
                        <Button disabled className='bg-red-500 py-[5px] px-[10px]'> <FaXmark /> </Button>
                }
            </div>
        },
        {
            name: 'Feedback',
            selector: (camp) => <div>
                {
                    camp.paymentStatus === 'Unpaid' || camp.confirmationStatus === "Pending" ?
                        <p className='text-white px-[38px] rounded-md bg-gray-700 py-[5px] normal-case'>N/A</p>
                        :
                        camp.paymentStatus === 'Paid' && camp.confirmationStatus === "Confirmed" && <Link to={'/dashboard/feedback'}><Button className='py-[7px] normal-case bg-green-500'>Feedback</Button> </Link>
                }
            </div>
        },
    ]

    return <DataTable columns={columns} data={registeredCamps} fixedHeader highlightOnHover pagination />
};

RegisteredCampTable.propTypes = {
    registeredCamps: PropTypes.array,
    handleDelete: PropTypes.func,
};

export default RegisteredCampTable;
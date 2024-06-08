import { Button } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import { FaXmark } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
const RegisteredCampTable = ({ registeredCamps }) => {

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
                    camp.paymentStatus === 'Unpaid' && <Link to={`/dashboard/payment/${camp.campFees}`}> <Button className='bg-gray-700 py-[5px] normal-case'>Pay</Button> </Link>
                }
                {
                    camp.paymentStatus === 'Paid' && <Button className='py-[5px] bg-green-500' disabled>Paid</Button>
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
                    camp.paymentStatus === 'Unpaid' && <Button className='bg-red-500 py-[5px] px-[10px]'> <FaXmark /> </Button>
                }
            </div>
        },
        {
            name: 'Feedback',
            selector: (camp) => <div>
                {
                    camp.paymentStatus === 'Unpaid' && <Link> <Button className='bg-gray-700 py-[5px] normal-case'>N/A</Button> </Link>
                }
                {
                    camp.paymentStatus === 'Paid' && <Button className='py-[5px] bg-green-500' disabled>Feedback</Button>
                }
            </div>
        },
    ]

    return <DataTable columns={columns} data={registeredCamps} fixedHeader highlightOnHover pagination />
};

RegisteredCampTable.propTypes = {
    registeredCamps: PropTypes.array,
};

export default RegisteredCampTable;
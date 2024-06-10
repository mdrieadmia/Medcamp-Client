import { Button } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import { FaXmark } from 'react-icons/fa6';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
const RegisteredCampTable = ({ registeredCamps, handleDelete }) => {

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
            <Button className='px-5 py-2 mr-10 ml-3' type="button" onClick={onClear}>
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
    
    const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const filteredItems = registeredCamps.filter(
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
            highlightOnHover
			pagination
			paginationResetDefaultPage={resetPaginationToggle} 
			subHeader
			subHeaderComponent={subHeaderComponentMemo}
			persistTableHead />
};

RegisteredCampTable.propTypes = {
    registeredCamps: PropTypes.array,
    handleDelete: PropTypes.func,
    onFilter: PropTypes.func,
    onClear: PropTypes.func,
    filterText: PropTypes.string,
};

export default RegisteredCampTable;
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { BiSolidEdit } from "react-icons/bi";
import { ImBin } from "react-icons/im";
import { Button } from '@material-tailwind/react';
import styled from 'styled-components';
import { useMemo, useState } from 'react';


const ManageCampTable = ({ camps, handleCampDelete, }) => {

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
            sortable: true,
            maxWidth: "100px",
        },
        {
            name: 'Camp Name',
            selector: (camp) => camp.campName,
            sortable: true,
            width: "25%"
        },
        {
            name: 'Date',
            selector: (camp) => camp.date,
            sortable: true,
            maxWidth: "200px"

        },
        {
            name: 'Time',
            selector: (camp) => <span>{`${camp.time} AM`}</span>,
            sortable: true,
            maxWidth: "120px",
        },
        {
            name: 'Location',
            selector: (camp) => camp.location,
            sortable: true
        },
        {
            name: 'Healtcare Professional',
            selector: (camp) => camp.professionalName,
            sortable: true
        },
        {
            name: 'Actions',
            selector: (camp) => <>
                <div className='py-5 flex justify-center gap-3 items-center text-lg'>
                    <Link to={`/dashboard/camp/update/${camp._id}`} className='text-green-500 font-bold mr-2'><BiSolidEdit className='text-xl' /></Link>
                    <span onClick={() => handleCampDelete(camp._id)} className='text-red-500 font-bold ml-2'> <ImBin /> </span>
                </div>
            </>
        },
    ]


    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = camps.filter(
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

ManageCampTable.propTypes = {
    camps: PropTypes.array,
    handleCampDelete: PropTypes.func,
    onFilter: PropTypes.func,
    onClear: PropTypes.func,
    filterText: PropTypes.string,
};

export default ManageCampTable;
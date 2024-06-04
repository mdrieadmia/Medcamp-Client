import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { BiSolidEdit } from "react-icons/bi";
import { ImBin } from "react-icons/im";


const ManageCampTable = ({ camps,  handleCampDelete,  }) => {
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
                    <span onClick={()=>handleCampDelete(camp._id)} className='text-red-500 font-bold ml-2'> <ImBin /> </span>
                </div>
            </>
        },
    ]


    return <DataTable columns={columns} data={camps} fixedHeader highlightOnHover pagination />
};

ManageCampTable.propTypes = {
    camps: PropTypes.array,
    handleCampDelete: PropTypes.func,
};

export default ManageCampTable;
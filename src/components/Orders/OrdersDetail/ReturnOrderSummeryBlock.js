import React  from 'react';
import DataTable from 'react-data-table-component';
 
 

function ReturnOrderSummeryBlock(props) {
    
    
    
    const columns = () => {
        return [
            {
                name: " PRODUCT IMAGE",
                selector: (row) => row.items,
                cell: row => <>{row?.items?.map((img,i)=>(<img key={i} className="avatar rounded lg border me-1" src={img?.sparePartImage} alt="" />))}</>,
                sortable: true,
            },
            {
                name: "PRODUCT NAME",
                selector: (row) => row.items,
                sortable: true,
                cell: row => <>
                   {row?.items?.map((d,i)=>( <div key={i} className='row'><h6 className="title ">{d?.sparePartName} </h6></div>) )}</>,

            },
            {
                name: "QUANTITY",
                selector: (row) => row.quanty,
                sortable: true,
                cell: row => <>
                {row?.items?.map((d,i)=>( <div key={i} className='row'><span>{d?.quantity}</span></div>) )}</>,

            },
            {
                name: "PRICE",
                selector: (row) => row.price,
                sortable: true,
                cell: row => <>
                {row?.items?.map((d,i)=>( <div key={i} className='row'> <span>{d?.MRP}</span></div>) )}</>,

            },
            {
                name: "TECHNICIAN",
                selector: (row) => row.technician,
                sortable: true,
                cell: row => <>
                {row?.items?.map((d,i)=>( <div key={i} className='row'> <span>{d?.technician>0 ? `Booked for ${d?.technician}` : "No" }</span></div>) )}</>,

            },
            {
                name: "ORDER DATE & TIME",
                selector: (row) => row.date,
                sortable: true,
                cell: row => <>
                {<div className='row'> <span>({new Date(row?.createdAt)?.toLocaleDateString()}) {new Date(row?.createdAt)?.toLocaleTimeString()}</span></div>}</>,

            },
            {
                name: " Recieve Return ",
                selector: (row) => row.date,
                sortable: true,
                cell: row => <>
                {<div className='row'> <span>({new Date(row?.updatedAt)?.toLocaleDateString()}) {new Date(row?.createdAt)?.toLocaleTimeString()}</span></div>}</>,

            },
        ]
    }

    
    return (
        <div className="col-sm-12">
            <DataTable
                columns={columns()}
                data={props?.orders}
                defaultSortField="title"
                pagination
                selectableRows={false}
                className="table myDataTable table-hover align-middle mb-0 d-row nowrap dataTable no-footer dtr-inline"
                highlightOnHover={true}
            />
        </div>
    )
}
export default ReturnOrderSummeryBlock;
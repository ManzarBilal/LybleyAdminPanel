import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
 
 

function OrderSummeryBlock(props) {
    
    
    
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
                {row?.items?.map((d,i)=>( <div key={i} className='row'><h6 className="title me-2">{d?.sparePartName} : <span>{d?.quantity}</span></h6></div>) )}</>,

            },
            {
                name: "PRICE",
                selector: (row) => row.price,
                sortable: true,
                cell: row => <>
                {row?.items?.map((d,i)=>( <div key={i} className='row'><h6 className="title me-2">{d?.sparePartName} : <span>{d?.MRP}</span></h6></div>) )}</>,

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
export default OrderSummeryBlock;
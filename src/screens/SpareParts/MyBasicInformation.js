import React, { useState } from 'react';
import httpCommon from "../../http-common";
import style from "./search.module.css";


function MyBasicInformation(props) {
    // const [category,setCategory]=useState();
    const [search, setSearch] = useState("");
    const [sparePart, setSparePart] = useState([])


    const [fault, setFault] = useState("");
    const [technicianPrice] = useState(["350", "600"]);
    const fault1 = (f) => {
        setFault(f);
        props.onSubmit(f);
    }
    const debounceTimeout = 300;
    const getSparePart = async (query) => {
        try {
            let response = await httpCommon.get(`/allSparePart?sparePart=${query}`);
            let { data } = response;
            setSparePart(data);
        } catch (err) {
            console.log(err);
        }
    }
    console.log(sparePart);
    // Debounce function
    const debounce = (func, delay) => {
        let timerId;
        return function (...args) {
            clearTimeout(timerId);
            timerId = setTimeout(() => func.apply(this, args), delay);
        };
    };

    // Handle user input and debounce API calls
    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearch(value);

        // Debounce the API call
        debounce(getSparePart, debounceTimeout)(value);
    };

    const handleIndex = (i) => {
        props.onDelete(i);
        setFault("");
    }
    let { partName, description, partNo, skuNo, length, breadth, height, weight, faultType, MRP, bestPrice, technician, productModel, category, brandName, compactibleWith } = props?.sparePart;
  //  let { categories } = props;

    // let product1 = props?.products?.data?.filter(f1 => f1?.brandName === brandName)?.map(m1 => ({ status: "ACTIVE", categoryName: m1?.productCategory }));
    // let category1 = categories?.filter(f1 => f1?.brandName === brandName)?.map(m1 => ({ status: "ACTIVE", categoryName: m1?.categoryName }));
    // let merge = product1.concat(category1);
    // let unique1 = Array.from(new Set(merge.map(JSON.stringify))).map(JSON.parse);

    // let categories1 = props?.user?.role === "RESELLER" ? unique1 : categories;
    // let products1 = props?.products?.data?.filter(p1 => p1?.productCategory === category && p1?.brandName === brandName)

    return (
        <>
            <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
                <h6 className="mb-0 fw-bold ">Basic information</h6>

            </div>
            <div className='d-flex ps-3'>
                {compactibleWith?.map(c1 =>
                    <div className="px-2"> <div><div style={{ borderEndEndRadius: "0px", borderTopRightRadius: "0px" }} className='btn btn-info text-white fw-bold m-0'>{c1}</div><div style={{ borderEndStartRadius: "0px", borderTopLeftRadius: "0px" }} className='btn btn-danger text-white' onClick={() => props?.deleteCompactible(c1)}>X</div></div> </div>
                )}
            </div>
            <div className="card-body">

                <form>
                    <div className="row g-3 align-items-center">
                        <div className={`${style.searchBody1} `}>

                            <div className=''>
                                <div className={`${sparePart?.length > 0 ? style.searchBoxClick : style.searchBox} shadow`}>
                                    <input onChange={(e) => handleInputChange(e)} name='search' value={search} type="text" placeholder="Search..." />
                                </div>
                                {sparePart?.length > 0 ?
                                    <div className={`${style.categoryList} shadow`}>
                                        <h5 className="row d-flex justify-content-between text-start align-items-center ps-3 pe-3 pt-2 fw-bold">  <div className='col-3'>Part Name</div><div className='col-2'>Image</div> <div className='col-3'>Model</div><div className='col-2'>Brand</div> <div className='col-2'>Price <button className='btn btn-danger btn-sm text-white ms-3 mt-0 fw-bold' onClick={() => { setSparePart([]); setSearch("") }}>Close</button> </div></h5>
                                        <div style={{ height: `${sparePart?.length >= 6 ? "460px" : ""}`, overflowY: `${sparePart?.length >= 6 ? "scroll" : ""}`, overflowX: "hidden" }}>
                                            {sparePart?.map(sp1 =>
                                                <div onClick={(e) => props?.handleCompactible(sp1?.partName)} className={`${compactibleWith?.find(f1 => f1 === sp1?.partName) ? "bg-info text-white" : "text-secondary"} row w-100 border d-flex justify-content-between ps-3 pe-3 align-items-center pt-2 pb-2 fw-bold`}>  <div className='col-3'>{sp1?.partName}</div><div className='col-2'><img src={sp1?.images?.[0]} alt="..." className='shadow' height="60px" width="60px" /> </div> <div className='col-3'>{sp1?.productModel}</div><div className='col-2'>{sp1?.brandName}</div> <div className='col-2'>{sp1?.bestPrice}</div> </div>
                                            )}
                                        </div>
                                    </div>
                                    : (search && sparePart?.length===0) ? <h5 className='text-center'>Not found</h5> : ""
                                }
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label"> Spare Part Name</label>
                            <input type="text" className="form-control" name='partName' value={partName} onChange={(e) => { props.onChange(e) }} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label"> Spare Part No.</label>
                            <input type="text" className="form-control" name='partNo' value={partNo} onChange={(e) => { props.onChange(e) }} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label"> SKU No.</label>
                            <input type="text" className="form-control" name='skuNo' value={skuNo} onChange={(e) => { props.onChange(e) }} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label"> Length</label>
                            <input type="text" className="form-control" name='length' value={length} onChange={(e) => { props.onChange(e) }} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label"> Breadth</label>
                            <input type="text" className="form-control" name='breadth' value={breadth} onChange={(e) => { props.onChange(e) }} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label"> Height</label>
                            <input type="text" className="form-control" name='height' value={height} onChange={(e) => { props.onChange(e) }} />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label"> Weight</label>
                            <input type="text" className="form-control" name='weight' value={weight} onChange={(e) => { props.onChange(e) }} />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Description</label>
                            <textarea type="text" className="form-control" name='description' value={description} onChange={(e) => { props.onChange(e) }} ></textarea>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label"> MRP</label>
                            <input type="number" className="form-control" name='MRP' value={MRP} onChange={(e) => { props.onChange(e) }} />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label"> Best Price</label>
                            <input type="number" className="form-control" name='bestPrice' value={bestPrice} onChange={(e) => { props.onChange(e) }} />
                        </div>
                        {/* {props?.user?.role==="RESELLER" ?  <div className="col-xl-12 col-lg-12">
                        <div className="card-body m-0 p-0">
                            <label className="form-label">Brand</label>
                            <select className="form-select" name='brandName' value={brandName} onChange={(e)=>props.onChange(e)}  >
                                <option value="" selected>Choose Brand</option>
                                {props?.brands?.filter(f1=>f1?.approval==="APPROVED")?.map(c1=>
                                    <option value={c1.brandName} >{c1.brandName}</option>
                                    )}
                            </select>
                        </div>
                    </div> : ""}
                        <div className="col-xl-12 col-lg-12">
                        <div className="card-body m-0 p-0">
                            <label className="form-label">Category</label>
                            <select className="form-select" name='category' value={category} onChange={(e)=>props.onChange(e)}  >
                                <option value="" selected>Choose Category</option>
                                {categories1?.filter(f1=>(f1?.status==="ACTIVE"))?.map(c1=>
                                    <option value={c1.categoryName} >{c1.categoryName}</option>
                                    )}
                            </select>
                        </div>
                    </div> */}
                        {/* <div className="col-xl-12 col-lg-12">
                        <div className="card-body m-0 p-0">
                            <label className="form-label">Product Model</label>
                            <select className="form-select" name='productModel' value={productModel} onChange={(e)=>props.onChange(e)}  >
                                <option value="" selected>Choose Model</option>
                                {category && products1.map(c1=>
                                    <option value={c1.productName} >{c1.productName}</option>
                                    )}
                            </select>
                        </div>
                    </div> */}
                        <div className="col-xl-12 col-lg-12">
                            <div className="card-body m-0 p-0">
                                <label className="form-label">Fault Type </label>{" "} <span className='text-muted'>(Select max 5)</span>
                                <select className="form-select" name='fault' value={fault} onChange={(e) => fault1(e.currentTarget.value)}  >
                                    <option value="" selected>Choose Fault</option>
                                    {productModel && props?.faultType?.filter(f1 => f1?.productModel === productModel)?.map(c1 =>
                                        <option value={c1.faultName} >{c1.faultName}</option>
                                    )}
                                </select>
                            </div>
                            {faultType?.map((f1, i) => <div className='btn btn-sm bg-dark text-white m-1'>{f1} <i className='ms-2 icofont-close-circled' onClick={(e) => handleIndex(i)}></i></div>)}
                        </div>
                        {/* <div className="col-xl-12 col-lg-12">
                        <div className="card-body m-0 p-0">
                            <label className="form-label">Technician Price </label>
                            <select className="form-select" name='technician' value={technician} onChange={(e)=>props.onChange(e)}  >
                                <option value="" selected>Select Price</option>
                                {technicianPrice?.map(t1=>
                       s             <option value={t1} >{t1}</option>
                                    )}
                            </select>
                        </div>
                    </div> */}

                    </div>
                </form>
            </div>
        </>
    )
}
export default MyBasicInformation;
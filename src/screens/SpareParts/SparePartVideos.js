import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import PageHeader1 from '../../components/common/PageHeader1';
import httpCommon from "../../http-common";
import { ToastMessage } from "../../components/common/ToastMessage";
import { ConfirmBox } from '../../components/common/ConfirmBox';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../Redux/Actions/product';
import ReactPlayer from 'react-player'
import { useRef } from 'react';
import { ReactLoader } from '../../components/common/ReactLoader';


function SparePartVideos() {
    const [table_row, setTable_row] = useState([]);
    const [randomValue, setRandomValue] = useState("");
    const [ismodal, setIsmodal] = useState(false);
    const [iseditmodal, setIseditmodal] = useState(false);
    const [faultVideo, setFaultVideo] = useState({ video: "", brandId: "", productModel: "" });
    const [v_id, setCatId] = useState("");
    const [videoId, setVideoId] = useState("");
    const [confirmBoxView, setConfirmBoxView] = useState(false);
    const [hasWindow, setHasWindow] = useState(false);
    const [video, setVideo] = useState([])
    const [videoUrl, setVideoUrl] = useState("")
    const [loading, setLoading] = useState(false);
    const [loadingSp, setLoadingSp] = useState(false);
    let table_row1 = table_row.map((t1, i) => ({ ...t1, i: i + 1 }));

    const playerRef = useRef(null);
    const columns = () => {
        return [
            {
                name: "SR. NO.",
                selector: (row) => row?.i,
                sortable: true, width: "100px",
            },
            {
                name: " FAULT VIDEO",
                selector: (row) => row?.video,
                cell: row => <>
                    {hasWindow && <ReactPlayer ref={playerRef} url={row?.video} controls height="60px" />}
                </>,
                sortable: true, width: "200px",
            },
            {
                name: "FAULT PRODUCT",
                selector: (row) => row?.productModel,
                sortable: true,
            },

            {
                name: "ACTION",
                selector: (row) => { },
                sortable: true,
                cell: (row) => <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button onClick={() => { edit(row?._id) }} type="button" className="btn btn-outline-secondary"><i className="icofont-edit text-success"></i></button>
                    <button onClick={() => { handleFault(row?._id) }} type="button" className="btn btn-outline-secondary deleterow"><i className="icofont-ui-delete text-danger"></i></button>
                </div>
            }
        ]
    }
    const dispatch = useDispatch();

    useEffect(() => {
        let user = localStorage.getItem("user");
        let obj = JSON.parse(user);
        dispatch(getProduct(obj?._id));
        obj?.role === 'ADMIN' ?  GetAllFaultVideo()
        : GetAllFaultVideoByBrand()
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, [randomValue, dispatch])

    const products = useSelector(state => state?.products)

    const GetAllFaultVideo = async () => {
        let user = localStorage.getItem("user");
        let obj = JSON.parse(user);
        try {
            setLoadingSp(true)
            let response = await httpCommon.get(`/getAllVideos`)
            let { data } = response
            setTable_row(data)
            setLoadingSp(false)

        }
        catch (err) {
            console.log(err)
            setLoadingSp(false)

        }
    }
    const GetAllFaultVideoByBrand = async () => {
        let user = localStorage.getItem("user");
        let obj = JSON.parse(user);
        try {
            setLoadingSp(true)
            let response = await httpCommon.get(`/getAllVideosBybrand/${obj?._id}`)
            let { data } = response
            setTable_row(data)
            setLoadingSp(false)

        }
        catch (err) {
            console.log(err)
            setLoadingSp(false)

        }
    }
    const edit = (id) => {
        setIseditmodal(true);
        let table_row1 = [...table_row];
        let editData = table_row1.find(c1 => c1._id === id);

        setFaultVideo({ video: editData?.video, productModel: editData?.productModel });
        setCatId(id);
    }

    const editFaultVideo = async () => {
        const formData = new FormData()
        formData.append("productModel", faultVideo?.productModel);
        formData.append("video", video);

        try {
            setLoading(true);
            let response = await httpCommon.patch(`/editVideo/${v_id}`, formData);
            let { data } = response;
            setIseditmodal(false)
            let x = Math.floor((Math.random() * 10) + 1);
            setRandomValue(x)
            setLoading(false)
            ToastMessage(data);
        } catch (err) {
            console.log(err);
        }
    }
    const addFaultVideo = async () => {
        let product = products?.data?.find(p1 => p1?.productName === faultVideo?.productModel);
        let user = localStorage.getItem("user");
        let obj = JSON.parse(user);
        const formData = new FormData()
        formData.append("productModel", product?.productName);
        formData.append("brandId", obj?._id);
        formData.append("video", video);
        try {
            setLoading(true);
            let response = await httpCommon.post("/uploadVideo", formData);
            let { data } = response;
            setLoading(false);
            setIsmodal(false)
            let x = Math.floor((Math.random() * 10) + 1);
            setRandomValue(x)
            ToastMessage(data);
        } catch (err) {
            console.log(err);
        }
    }
    const deleteFaultVideo = async () => {
        try {
            let response = await httpCommon.deleteData(`/deleteVideo/${videoId}`);
            let { data } = response;
            setConfirmBoxView(false);
            let x = Math.floor((Math.random() * 10) + 1);
            setRandomValue(x);
            ToastMessage(data);
        } catch (err) {
            console.log(err);
        }
    }
    const handleFault = (id) => {
        setVideoId(id)
        setConfirmBoxView(true);
    }

    const handleChange = (e) => {
        const { currentTarget: input } = e;
        let fault1 = { ...faultVideo };
        fault1[input.name] = input.value;
        setFaultVideo(fault1);
    }


    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     if (!file) return;
    //     setVideo(URL.createObjectURL(file));
    // };
    const handleFileChange = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        if (!file) return;
        setVideoUrl(URL.createObjectURL(file));
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            if (e.target.name === "file") {
                // setImage(e.target.files[0]);
                setVideo(e.target.files[0])
            }
        }
    };

    return (
        <div className="body d-flex py-lg-3 py-md-2">
            <div className="container-xxl">
                <PageHeader1 pagetitle='All Videos' modalbutton={() => {
                    return <div className="col-auto d-flex w-sm-100">
                        <button type="button" onClick={() => { setIsmodal(true) }} className="btn btn-primary btn-set-task w-sm-100"  ><i className="icofont-plus-circle me-2 fs-6"></i>Upload Video</button>
                    </div>
                }} />
                <div className="row clearfix g-3">
                    <div className="col-sm-12">
                        {loadingSp ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div> :
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div id="myProjectTable_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <DataTable
                                                    columns={columns()}
                                                    data={table_row1}
                                                    defaultSortField="title"
                                                    pagination
                                                    selectableRows={false}
                                                    className="table myDataTable table-hover align-middle mb-0 d-row nowrap dataTable no-footer dtr-inline"
                                                    highlightOnHover={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Modal show={iseditmodal} onHide={() => { setIseditmodal(false) }} className="" style={{ display: 'block' }}>
                <Modal.Header className="modal-header" closeButton>
                    <h5 className="modal-title  fw-bold" id="expeditLabel"> Edit Video</h5>
                </Modal.Header>
                <Modal.Body className="modal-body">

                    <div className="deadline-form">
                        <form>
                            <div className="row g-3 mb-3">
                                <div className="col-md-12">
                                    <label className="form-label">Product video Upload</label>
                                    <small className="d-block text-muted mb-2">Only portrait or square video, 2M max and 2000px max-height.</small>
                                    <div id='create-token' className='dropzoneww'>

                                        <div className='mb-3' >
                                            <input id='filesize' onChange={(e) => handleFileChange(e)} name="file" type="file" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff, .mp4, .webm, .mp3, awv, .ogg, .glb"></input>
                                        </div>
                                        <ReactPlayer ref={playerRef} url={faultVideo?.video} controls width="100%" height="200px" />
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card-body m-0 p-0">
                                        <label className="form-label">Product Model</label>
                                        <select className="form-select" name='productModel' value={faultVideo?.productModel} onChange={handleChange}  >
                                            <option value="" selected>Choose Model</option>
                                            {products?.data?.map((c1, i) =>
                                                <option key={i} value={c1.productName} >{c1.productName}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </Modal.Body>
                <div className="modal-footer">
                    <button type="button" onClick={() => { setIseditmodal(false) }} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" disabled={loading} onClick={() => editFaultVideo()}> {loading ? "Uploading" : "Edit "}  </button>
                </div>

            </Modal>
            <Modal show={ismodal} style={{ display: 'block' }}>
                <Modal.Header className="modal-header" onClick={() => { setIsmodal(false) }} closeButton>
                    <h5 className="modal-title  fw-bold" id="expaddLabel">Add Fault Video</h5>
                </Modal.Header>
                <Modal.Body className="modal-body">
                    <div className="deadline-form">
                        <form>
                            <div className="row g-3 mb-3">
                                <div className="border border-5 border-primary"
                                >
                                <div className="col-md-12">
                                    <label className="form-label">Product video Upload</label>
                                    <small className="d-block text-muted mb-2">Only portrait or square video, 2M max and 2000px max-height.</small>
                                    <div id='create-token' className='dropzoneww'>
                                        <div className='mb-3' >
                                            <input id='filesize' onChange={(e) => handleFileChange(e)} name="file" type="file" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff, .mp4, .webm, .mp3, awv, .ogg, .glb"></input>
                                        </div>
                                        {videoUrl === "" ? <div className='text-danger fw-bold text-center'></div> : <ReactPlayer ref={playerRef} url={videoUrl} controls width="100%" height="200px" />}

                                    </div>
                                </div>
                                <h4 className='text-center fw-bold'>Or</h4>
                                <div className="col-xl-12 col-lg-12 mb-1">
                                    <div className="card-body m-0 p-0">
                                        <label className="form-label">Enter URL</label>
                                        <input type="text" className='form-control' placeholder='Youtube url' />
                                    </div>
                                </div>
                                </div>
                                 <hr />
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card-body m-0 p-0">
                                        <label className="form-label">Product Model</label>
                                        <select className="form-select" name='productModel' value={faultVideo?.productModel} onChange={handleChange}  >
                                            <option value="" selected>Choose Model</option>
                                            {products?.data?.map((c1, i) =>
                                                <option key={i} value={c1.productName} >{c1.productName}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </Modal.Body>
                <Modal.Footer className="modal-footer">
                    <button onClick={() => { setIsmodal(false) }} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" disabled={loading} onClick={addFaultVideo}>{loading ? "Uploading" : "Add Video"}</button>
                </Modal.Footer>

            </Modal>
            <ConfirmBox bool={confirmBoxView} setConfirmBoxView={setConfirmBoxView} onSubmit={deleteFaultVideo} />

        </div>
    )
}
export default SparePartVideos;
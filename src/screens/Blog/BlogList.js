import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import PageHeader1 from '../../components/common/PageHeader1';
import httpCommon from "../../http-common";
import { ConfirmBox } from '../../components/common/ConfirmBox';
import { ToastMessage } from '../../components/common/ToastMessage';
import Avatar4 from "../../assets/images/lg/avatar4.svg";
import { ReactLoader } from '../../components/common/ReactLoader';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { userEmail } from '../../Redux/Actions/userEmail';

const defaultBanner = "https://visme.co/blog/wp-content/uploads/2021/01/header-3.png"
function BlogList() {
    const [table_row, setTable_row] = useState([]);
    const [viewDetail, setViewDetail] = useState([]);
    const [ismodal, setIsmodal] = useState(false);
    const [iseditmodal, setIseditmodal] = useState(false);
    const [randomValue, setRandomValue] = useState("");
    const [confirmBoxView, setConfirmBoxView] = useState(false);
    const [blogId, setBlogId] = useState("");
    const [loading, setLoading] = useState(false)

    const [imageView, setImageView] = useState(false)
    const [image, setImage] = useState("")

    const columns = () => {
        return [

            {
                name: "TITLE",
                selector: (row) => row?.title,
                cell: row => row?.title,
                sortable: true, minWidth: "200px"
            },

            {
                name: "CONTENT",
                selector: (row) => row?.content,
                sortable: true
            },

            {
                name: "BLOG IMAGE",
                selector: (row) => <div className='text-primary'  ><img className="avatar rounded lg border" src={row?.image} alt="blog" />  </div>,
                sortable: true
            },
            {
                name: "ACTION",
                selector: (row) => { },
                sortable: true,
                cell: (row) => <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button onClick={() => { handleBlogEdit(row?._id) }} type="button" className="btn btn-outline-secondary"><i className="icofont-edit text-success"></i></button>
                    <button type="button" onClick={() => { handleBlog(row?._id) }} className="btn btn-outline-secondary deleterow"><i className="icofont-ui-delete text-danger"></i></button>
                </div>
            }
        ]
    }

    useEffect(() => {
        GetAllBlogs()
    }, [randomValue])
    const GetAllBlogs = async () => {
        try {
            setLoading(true)
            let response = await httpCommon.get("/getAllBlogs")
            let { data } = response
            setTable_row(data)
            setLoading(false)
        }
        catch (err) {
            console.log(err)
            setLoading(false)

        }
    }

    const deleteBlog = async () => {
        try {
            let response = await httpCommon.deleteData(`/deleteBlog/${blogId}`);
            let { data } = response;
            setConfirmBoxView(false);
            let x = Math.floor((Math.random() * 10) + 1);
            setRandomValue(x);
            ToastMessage(data);
        } catch (err) {
            console.log(err);
        }
    }
    const handleBlog = (id) => {
        setBlogId(id)
        setConfirmBoxView(true);
    }
    const handleBlogEdit = (id) => {
        const findData = table_row.find(obj => {
            return obj._id === id
        })
        setBlogId(id)
        setBlogData({ title: findData?.title, content: findData?.content })
        setBlogImage(findData?.image)
        setIseditmodal(true)

    }

    const handleViewDetail = (id) => {
        const findData = table_row.find(obj => {
            return obj._id === id
        })
        setViewDetail(findData)
        setIseditmodal(true);

    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(' Blog Name is required')
            .min(4, "Blog title must be at least 4 characters"),
        content: Yup.string().required('Blog content is required')
            .min(4, "Blog content must be at least 4 characters"),

    });


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const handleFileChange = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            if (e.target.name === "image") {
                // console.log(e.target.files[0]);
                setImage(e.target.files[0]);
            }
        }
    };

    const createBlog = async (obj) => {

        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("image", image);
            formData.append("title", obj.title);
            formData.append("content", obj.content,)

            // const fullData={...body ,gstDocument:gstDocument}
            // console.log(fullData,"fullData");
            let response = await httpCommon.post("/createBlog", formData);
            let { data } = response;
            setLoading(false)
            setIsmodal(false)
            ToastMessage(data)
            let x = Math.floor((Math.random() * 10) + 1);
            setRandomValue(x);
        } catch (err) {
            console.log(err);
        }
    }

    const history = useHistory()
    const onRegister = data => {
        // console.log("data", gstDocument);
        setImageView(true)
        createBlog(data);

    }
    const onUpdate = data => {
        updateBlog(data);

    }
    const updateImage = async (obj) => {
    
        const formData = new FormData()
            formData.append("image", file);
        try {
            setLoading(true)
            let response = await httpCommon.patch(`/updateImage/${blogId}`, formData);
            let { data } = response;
            setIseditmodal(false)
            ToastMessage(data)
            setLoading(false)
            let x = Math.floor((Math.random() * 10) + 1);
            setRandomValue(x);
        } catch (err) {
            console.log(err);
        }
    }
    const updateBlog = async (obj) => {
    
        const dataObj={title:obj?.title,content:obj?.content}
        try {
            setLoading(true)
            let response = await httpCommon.patch(`/updateBlog/${blogId}`, dataObj);
            let { data } = response;
            setIseditmodal(false)
            ToastMessage(data)
            setLoading(false)
            let x = Math.floor((Math.random() * 10) + 1);
            setRandomValue(x);
        } catch (err) {
            console.log(err);
        }
    }
    const [file, setFile] = useState("")
    const [blogImage, setBlogImage] = useState("")
    const [blogData, setBlogData] = useState("")


    const handleFileChangeImage = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            if (e.target.name === "file") {
                // console.log(e.target.files[0]);
                setFile(e.target.files[0]);
            }
        }
    };
    const uploadBlogImage = async () => {

        const formData = new FormData();
        formData.append("image", file);
        try {
            let response = await httpCommon.patch(`/updateBrandLogoBy/${blogId}`, formData);
            let { data } = response;
            setFile("")
            let x = Math.floor((Math.random() * 10) + 1);
            setRandomValue(x);
            ToastMessage(data);
            setIseditmodal(false)
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className="body d-flex py-lg-3 py-md-2">
                <div className="container-xxl">
                    <PageHeader1 pagetitle='Blog Information' modalbutton={() => {
                        return <div className="col-auto d-flex w-sm-100">
                            <button type="button" onClick={() => { setIsmodal(true) }} className="btn btn-primary btn-set-task w-sm-100" data-bs-toggle="modal" data-bs-target="#expadd"><i className="icofont-plus-circle me-2 fs-6"></i>Add Blog</button>
                        </div>
                    }} />
                    <div className="row clearfix g-3">
                        <div className="col-sm-12">
                            {loading ? <div className='d-flex justify-content-center align-items-center' > <ReactLoader /> </div>
                                : <div className="card mb-3">
                                    <div className="card-body">
                                        <div id="myProjectTable_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <DataTable
                                                        columns={columns()}
                                                        data={table_row}
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
                        <h5 className="modal-title  fw-bold" id="expeditLabel">Blog Details</h5>
                    </Modal.Header>
                    <Modal.Body className="modal-body">

                        <div className="card-body d-flex profile-fulldeatil flex-column">
                            <div className="profile-block text-center w220 mx-auto">
                                <a href="#!">
                                    <img src={blogImage ? blogImage : Avatar4} alt="blogLogo" className="avatar xl rounded img-thumbnail shadow-sm" />
                                </a>
                            </div>
                            <div className='row'>
                                <div className="col-md-6 col-12 col-lg-6">
                                    <div className="mt-2 mb-1">
                                        <label className="form-label">Upload Blog Image</label>
                                        <input type="file" name="file" onChange={(e) => handleFileChangeImage(e)} id="myfile" className="form-control"


                                        />

                                    </div>
                                </div>
                                <div className="col-md-6 col-12 col-lg-6">
                                    <div style={{ marginTop: "40px" }}>
                                        <button type="submit" className="btn btn-primary" disabled={loading} onClick={()=>updateImage()}>Upload Image</button>
                                    </div>
                                </div>
                            </div>
                            <div className="profile-info w-100">
                                <h6 className="mb-0 mt-2 fw-bold d-block fs-6 text-center"> {viewDetail?.brandName}</h6>
                                <div className="row g-2 pt-2">
                                    <div className="col-12">
                                        <div className="mb-1">
                                            <label className="form-label">Blog Title</label>
                                            <input type="email" defaultValue={blogData?.title} className={(errors && errors.title) ? "form-control   border-danger " : "form-control  "} placeholder="Blog Title"
                                                {...register('title')}

                                            />
                                            <div className='text-danger'>
                                                {errors.title?.message}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="mb-1">
                                            <label className="form-label">Blog Content</label>
                                            <input type="email" defaultValue={blogData?.content} className={(errors && errors.content) ? "form-control  border-danger " : "form-control"} placeholder="Blog Content"
                                                {...register('content')}

                                            />
                                            <div className='text-danger'>
                                                {errors.content?.message}
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <div className="modal-footer">
                        <button type="button" onClick={() => { setIseditmodal(false) }} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary"disabled={loading} onClick={handleSubmit(onUpdate)}>Update</button>
                    </div>

                </Modal>
                <Modal className="modal fade show" id="expadd" show={ismodal} onHide={() => { setIsmodal(false) }} style={{ display: 'block' }}>
                    <Modal.Header className="modal-header" closeButton>
                        <h5 className="modal-title  fw-bold" id="expaddLabel">Add Blog</h5>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                        <div className="deadline-form">
                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label">Blog Title</label>
                                    <input type="email" className={(errors && errors.title) ? "form-control   border-danger " : "form-control  "} placeholder="Blog Title"
                                        {...register('title')}

                                    />
                                    <div className='text-danger'>
                                        {errors.title?.message}
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label">Blog Content</label>
                                    <input type="email" className={(errors && errors.content) ? "form-control  border-danger " : "form-control"} placeholder="Blog Content"
                                        {...register('content')}

                                    />
                                    <div className='text-danger'>
                                        {errors.content?.message}
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="mb-1">
                                    <label className="form-label">Upload Blog Image</label>
                                    <input type="file" name="image" onChange={(e) => handleFileChange(e)} id="myfile" className="form-control"
                                    // {...register('gstDocument')}

                                    />
                                    {imageView ? <> {image === "" ? <div className='text-danger'>
                                        Blog Image is required.
                                    </div> : ""}
                                    </> : ""}
                                </div>
                            </div>

                        </div>

                    </Modal.Body>
                    <Modal.Footer className="modal-footer">
                        <button onClick={() => { setIsmodal(false) }} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleSubmit(onRegister)} disabled={loading} className="btn btn-primary">Add Blog</button>
                    </Modal.Footer>

                </Modal>

            </div>
            <ConfirmBox bool={confirmBoxView} setConfirmBoxView={setConfirmBoxView} onSubmit={deleteBlog} />
        </>
    )
}
export default BlogList;
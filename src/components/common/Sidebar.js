import React, {useState } from "react";
import { Link } from "react-router-dom";
import { menu } from '../Data/Menu/menu.json';
import {brand} from '../Data/Menu/brand.json';
import {reseller} from '../Data/Menu/reseller.json'
import ImageLogo from "../../assets/images/spareLogo.png";

function Sidebar(props) {

    const [isSidebarMini, setIsSidebarMini] = useState(false);
   // const [menuData, setMenuData] = useState([...menu]);
    const menuData=props?.user && props?.user?.role==="ADMIN" ? [...menu] :props?.user?.role==="BRAND" ? [...brand] :  [...reseller];
    const openChildren = (id) => {
        var otherTabs = document.getElementsByClassName("has-children")
        if (otherTabs) {
            for (var i = 0; i < otherTabs.length; i++) {
                if (otherTabs[i].id !== id) {
                    otherTabs[i].className = otherTabs[i].className.replace(" show", "");
                    if (otherTabs[i].parentElement.children.length > 1) {
                        otherTabs[i].parentElement.children[0].setAttribute("aria-expanded", "false")
                    }
                }
            }
        }
        var menutab = document.getElementById(id)
        if (menutab) {
            if (menutab.classList.contains("show")) {
                menutab.classList.remove("show")
                if (menutab.parentElement.children.length > 1) {
                    menutab.parentElement.children[0].setAttribute("aria-expanded", "false")
                }
            } else {
                menutab.classList.add("show")
                if (menutab.parentElement.children.length > 1) {
                    menutab.parentElement.children[0].setAttribute("aria-expanded", "true")
                }
            }
        }
    }
    const openChildren1 = (id) => {
        var otherTabs = document.getElementsByClassName("has-children")
        if (otherTabs) {
            for (var i = 0; i < otherTabs.length; i++) {
                otherTabs[i].className = otherTabs[i].className.replace(" show", "");
            }
        }
        var menutab = document.getElementById(id)
        if (menutab) {
            menutab.classList.add("show")
            if (menutab.parentElement.children.length > 1) {
                menutab.parentElement.children[0].setAttribute("aria-expanded", "true")
            }
        }
    }
    // const GotoChangeMenu = (val) => {
    //     if (val === "UI Components") {
    //         props.history.push("ui-alerts");
    //         setMenuData([...menu2]);
    //     } else {
    //         props.history.push("dashboard");
    //         setMenuData([...menu]);
    //     }
    // }
    // const GotoChangeMenu = (val) => {
    //     if (val === "ADMIN") {
    //         props.history.push("dashboard");
    //         setMenuData([...menu]);
    //     } else {
    //         props.history.push("brand");
    //         setMenuData([...brand]);
    //     }
    // }

    const { activekey } = props;

    return (<div id="mainsidemenu" className={`sidebar px-4 py-4 py-md-4 me-0 ${isSidebarMini ? "sidebar-mini" : ""}`} style={{ overflow: 'scroll' }}>
        <div className="d-flex flex-column h-100">
            <a href="/" className="mb-0 brand-icon" >
                <span className="logo-icon">
                    {/* <i className="bi bi-bag-check-fill fs-4"></i> */}
                    <img src={ImageLogo} height="50" width="50" />
                </span>
                <span className="logo-text"  >SPARE TRADE</span>
            </a>
            <ul className="menu-list flex-grow-1 mt-3">
                {
                    menuData.map((d, i) => {
                        if (d.isToggled) {
                            return <li key={"shsdg" + i}>
                                <a className={`m-link `} href="#!" onClick={(e) => { e.preventDefault(); 
                                    // GotoChangeMenu(d.name);
                                     }}>
                                    <i className={d.iconClass}></i>
                                    <span>{d.name}</span>
                                </a>
                            </li>
                        }
                        if (d.children.length === 0) {
                            return <li key={"dsfshsdg" + i} className=" collapsed">
                                <Link to={props?.url + "/" + d.routerLink[0]} className={`m-link ${(d.routerLink[0] === activekey) ? "active" : ""}`} >
                                    <i className={d.iconClass}></i>
                                    <span>{d.name}</span>
                                    <span className="ms-auto text-end fs-5">
                                    </span>
                                </Link>
                            </li>
                        }
                        return <li key={"shsdg" + i} className=" collapsed">
                            <a className={`m-link ${d.children.filter((d) => "/" + d.routerLink[0] === activekey).length > 0 ? "active" : ""}`} href="#!" onClick={(e) => { e.preventDefault(); openChildren("menu-Pages" + i) }}>
                                <i className={d.iconClass}></i>
                                <span>{d.name}</span>
                                <span className="arrow icofont-dotted-down ms-auto text-end fs-5">
                                </span>
                            </a>
                            {
                                d.children.length > 0 ?
                                    <ul className="sub-menu collapse has-children" id={"menu-Pages" + i}>
                                        {d.children.map((data, ind) => {
                                            if (d.children.length > 0) {
                                                if (activekey === "/" + data.routerLink[0]) {
                                                    setTimeout(() => {
                                                        openChildren1("menu-Pages" + i)
                                                    }, 500);
                                                }

                                            }
                                            return <li key={"jfdgj" + ind}>
                                                <Link className={activekey === "/" + data.routerLink[0] ? "ms-link active" : "ms-link"} to={props?.url + "/" + data.routerLink[0]}> <span>{data.name}</span></Link>
                                            </li>
                                        })}
                                    </ul>
                                    : null
                            }
                        </li>
                    })
                }
            </ul>
            <button type="button" className="btn btn-link sidebar-mini-btn text-light" onClick={() => { setIsSidebarMini(!isSidebarMini) }}>
                <span className="ms-2"><i className="icofont-bubble-right"></i></span>
            </button>
        </div>
    </div>
    )
}

export default Sidebar
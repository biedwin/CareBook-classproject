import React from 'react'
import {Link, NavLink} from "react-router-dom"
import logo from "../../../assets/logo/logo.svg"
import { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { CiHome } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { MdOutlinePayment } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FaStethoscope } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaUndo } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import logoOnDark from "../../../assets/logo/logo-on-dark.svg"
import { MdLogout } from "react-icons/md";
import { useAuth } from '../../../context/AuthContext';

const ASIDEMENUS = {
    patient: {
        heading: "My health",
        items: [
            {to: "/patient", label: "Overview", icon: CiHome},
            {to: "/doctors", label: "Find the doctor", icon: FaSearch},
            {to: "/patient/appointment", label: "My appointments", icon: CiCalendar},
            {to: "/patient/notes", label: "Visit notes", icon: BsFileEarmarkTextFill},
            {to: "/patient/payment", label: "Payment", icon: MdOutlinePayment},
        ]
    },
    doctor: {
        heading: "Doctor workspace",
        items: [
             {to: "/doctor", label: "Overview", icon: CiHome},
            {to: "/doctors/schedule", label: "Schedule", icon: CiCalendar},
            {to: "/doctor/profile", label: "Profile & availability", icon: FaRegClock},
              {to: "/doctor/notes", label: "Visit notes", icon: BsFileEarmarkTextFill},
            {to: "/doctor/earnings", label: "Earnings", icon: GiMoneyStack },
              
        ]
    },
    admin: {
        heading: "Admin",
        items: [
             {to: "/admin", label: "Overview", icon:  CiHome },
            {to: "/admin/doctors", label: "Doctor approval", icon: FaStethoscope, notificationBadge: "pendingDoctors" },
            {to: "/admin/users", label: "Users", icon: FiUsers},
            {to: "/admin/appointments", label: "Appointments", icon: CiCalendar},
            {to: "/admin/payment", label: "Payment & refunds", icon: FaUndo, notificationBadge: "refundsNeeded"},
            {to: "/admin/revenue", label: "Revenue", icon: FaChartLine},
        ]
    }
}

const ROLE_LABEL = {
    patient: "Patient",
    doctors: "Doctor",
    admin: "Administrator"
}
function DashboardLayout({role}) {
    const {user, logout} = useAuth();
    const [open, setOpen] = useState(false);
    const menu = ASIDEMENUS[role]

  return (
    <div className='dash'>
        <header className="dash-topbar">
        <Link to={"/"} className="dash-logo">
           <img src={logo} alt="CareBook logo" />
        </Link>
          <button className="dash-menu-btn">
             {open ? <IoClose /> : <IoMdMenu />}
          </button>
        </header>
        <aside id='dash-sidebar' className={`dash-side ${open ? 'open' : ''}`}>
           <Link to={"/"} className='dash-logo'>
             <img src={logoOnDark} alt="CareBook logo" />
           </Link>
            <p className="dash-side-heading">{menu.heading}</p>
            <nav className="dash-nav">
                {menu.items.map((item) => {
                    const MenuIcon = item.icon;
                    return (
                     <NavLink to={item.to} key={item.to}>
                       {MenuIcon && <MenuIcon size={18} />}
                       <span>{item.label}</span>
                     </NavLink>
                    )
                })
            }
            </nav>
            <button className="dash-logout" onClick={logout}>
                <MdLogout />
                <span className="sr-only">Log out</span>
            </button>
        </aside>
        <main className="dash-main">

        </main>
    </div>
  )
}

export default DashboardLayout
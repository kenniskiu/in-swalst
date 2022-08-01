import { useState } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import { FaInfo, FaUserTie, FaUserLock ,FaThList,FaHome, FaUser, FaSearch } from "react-icons/fa";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
  SubMenu
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import styled from "styled-components";
import Name from "./Name";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router";
import Logout from "./Logout";

const Menuitem = styled(MenuItem)`
  :hover {
    background-color: #ffdb58;
    padding: 5px;
    border-radius: 10px;
  }`;

const SideNavigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [active,setActive] = useState(false)
  let navigate = useNavigate();
  function logout(){
    navigate.push("/");
  }
  const styles = {
    sideBarHeight: {
      minHeight: "100"
    },
    menuIcon: {
      margin: "20px",
      paddingLeft: "10px"
    }
  };
  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
    setActive(!active)
  };
  return (
    <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>
      <SidebarHeader>
        <div style={styles.menuIcon} onClick={onClickMenuIcon}>
            {active === true && <AiOutlineMenuFold/>}
            {active === false && <Name/>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="square">
          <Menuitem icon={<FaHome />}>
              <NavLink to="/main">
                  Home
              </NavLink>
          </Menuitem>
          <Menuitem icon={<FaUserTie />}>
              <NavLink to="/profile">
                  Personal Info
              </NavLink>
          </Menuitem>
          <SubMenu title="Health data" icon={<FaThList />}>
              <Menuitem icon={<FaUserTie />}>
                  <NavLink to="/realtime">
                      Real Time
                  </NavLink>
              </Menuitem>
              <Menuitem icon={<FaUserTie />}>
                  <NavLink to="/tables">
                      History
                  </NavLink>
              </Menuitem>
          </SubMenu>
              <Menuitem icon={<FaUserLock/>}>
                <NavLink to="/security">
                      Security
                </NavLink>
              </Menuitem>
              <Menuitem icon={<FaSearch/>}>
                <NavLink to="/navigate">
                      Find My In-SWALST
                </NavLink>
              </Menuitem>
          <Menuitem icon={<FaInfo />}>
                <NavLink to="/about">
                      About
                </NavLink>
          </Menuitem>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        {active === true && <Logout/>}
        {active === false && 
        <>
          <div className="text-center">
            <Button variant="dark" onClick={logout}>
              Logout
          </Button>
          </div>
        </>}
      </SidebarFooter>
    </ProSidebar>
  );
};
export default SideNavigation;

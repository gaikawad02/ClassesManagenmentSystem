/* eslint-disable react/prop-types */
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { tokens } from "../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  DashboardOutlined,
  PeopleAltOutlined,
  GroupAddOutlined,
  PersonPinOutlined,
  HowToRegOutlined,
  AssignmentOutlined,
  HistoryOutlined,
  AttachMoneyOutlined,
  PersonOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import logo from "../../../assets/images/logo.png";
import Item from "./Item";
import { ToggledContext } from "../../../App";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [role, setRole] = useState(null);

  // Extract role from JWT token stored in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        const decoded = JSON.parse(jsonPayload);

        // Extract role (handle different casing or claim names)
        const roleFromClaim =
          decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
          decoded.Role ||
          decoded.role ||
          null;

        if (roleFromClaim) {
          setRole(roleFromClaim.toLowerCase());
        } else {
          setRole(null);
        }
      } catch (error) {
        console.error("Invalid token", error);
        setRole(null);
      }
    }
  }, []);

  const renderAdminMenu = () => (
    <>
      <Item title="Dashboard" path="/dashboard" colors={colors} icon={<DashboardOutlined />} />
      <Item title="Manage Students" path="/StudentDetailAdmin" colors={colors} icon={<PeopleAltOutlined />} />
      <Item title="Student Admission" path="/StudentAddmission" colors={colors} icon={<GroupAddOutlined />} />
      <Item title="Manage Teachers" path="/TeacherDetailAdmin" colors={colors} icon={<PersonPinOutlined />} />
      <Item title="Register Teacher" path="/TeacherReg" colors={colors} icon={<HowToRegOutlined />} />
      <Item title="Teacher Attendance" path="/TeacherAttendancePage" colors={colors} icon={<AssignmentOutlined />} />
      <Item title="All Teacher Attendance" path="/AllTeacherAttendanceHistory" colors={colors} icon={<HistoryOutlined />} />
      <Item title="All Student Attendance" path="/AllStudentAttendanceHistory" colors={colors} icon={<HistoryOutlined />} />
      <Item title="Student Fees" path="/StudentFees" colors={colors} icon={<AttachMoneyOutlined />} />
    </>
  );

  const renderTeacherMenu = () => (
    <>
      <Item title="Teacher Dashboard" path="/TeacherDashboard" colors={colors} icon={<DashboardOutlined />} />
      <Item title="Profile" path="/TeacherProfile" colors={colors} icon={<PersonOutlined />} />
      <Item title="Student Attendance" path="/StudentAttendance" colors={colors} icon={<AssignmentOutlined />} />
      <Item title="Attendance History" path="/TeacherAttendanceHistory" colors={colors} icon={<HistoryOutlined />} />
    </>
  );

  const renderStudentMenu = () => (
    <>
      <Item title="Student Dashboard" path="/StudentDashboard" colors={colors} icon={<DashboardOutlined />} />
      <Item title="Profile" path="/StudentProfile" colors={colors} icon={<PersonOutlined />} />
      <Item title="Attendance History" path="/StudentAttendanceHistory" colors={colors} icon={<HistoryOutlined />} />
    </>
  );

  return (
    <Sidebar
      backgroundColor={colors.primary[400]}
      rootStyles={{ border: 0, height: "100%" }}
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="md"
    >
      <Menu
        menuItemStyles={{
          button: { ":hover": { background: "transparent" } },
        }}
      >
        <MenuItem
          rootStyles={{
            margin: "10px 0 20px 0",
            color: colors.gray[100],
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                alignItems="center"
                gap="12px"
                sx={{ transition: ".3s ease" }}
              >
                <img
                  style={{ width: "30px", height: "30px", borderRadius: "8px" }}
                  src={logo}
                  alt="Argon"
                />
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  textTransform="capitalize"
                  color={colors.greenAccent[500]}
                >
                  AcademyHub
                </Typography>
              </Box>
            )}
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>

      <Box mb={5} pl={collapsed ? undefined : "5%"}>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          {role === "admin" && renderAdminMenu()}
          {role === "teacher" && renderTeacherMenu()}
          {role === "student" && renderStudentMenu()}
          <Item title="All Teacher" path="/AllTeachersOfClass" colors={colors}/>
          <Item title="Logout" path="/Logout" colors={colors} icon={<LogoutOutlined />} />
        </Menu>
      </Box>
    </Sidebar>
  );
};

export default SideBar;

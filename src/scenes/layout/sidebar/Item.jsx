/* eslint-disable react/prop-types */
import { MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";

const Item = ({ title, path, icon }) => {
  const location = useLocation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isActive = location.pathname === path;

  return (
    <MenuItem
      component={<Link to={path} />}
      icon={icon}
      rootStyles={{
        color: isActive ? colors.greenAccent[400] : colors.gray[200],
        fontWeight: isActive ? "bold" : "normal",
        background: isActive ? "rgba(3, 218, 198, 0.12)" : "transparent",
        borderLeft: isActive ? `4px solid ${colors.greenAccent[500]}` : "4px solid transparent",
        margin: "2px 8px",
        borderRadius: "8px",
        transition: "all 0.3s ease",
        ":hover": {
          color: colors.greenAccent[300],
          background: "rgba(3, 218, 198, 0.08)",
          transform: "scale(1.02)",
        },
      }}
    >
      {title}
    </MenuItem>
  );
};

export default Item;

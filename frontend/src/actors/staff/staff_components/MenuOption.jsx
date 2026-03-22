import React from 'react';
import { Box, Stack, Typography } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';

const MenuOption = ({
  menuItems = [],
  icon,
  defaultActiveId = null,
  onSelect,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveId = () => {
  const match = menuItems.find(item => {
    if (!item.path) return false;
    if (item.matchPaths) {
      return item.matchPaths.some(p => location.pathname.startsWith(p));
    }
    return location.pathname.startsWith(item.path);
  });
  return match?.id || defaultActiveId;
};

  const activeId = getActiveId();

  const handleClick = (item) => {
  if (item.onClick) {
    item.onClick();
  } else if (item.path) {
    navigate(item.path);
  }
  if (onSelect) onSelect(item);
};

  const renderIcon = (item, isActive) => {
    const iconSource = item.icon || icon;
    if (!iconSource) return null;

    if (typeof iconSource === "string") {
      return (
        <Box
          component="img"
          src={iconSource}
          alt="icon"
          sx={{
            width: 32,
            height: 32,
            filter: isActive
              ? "brightness(0) invert(1)"
              : "brightness(0) invert(0.3)",
          }}
        />
      );
    }

    return React.createElement(iconSource, {
      sx: {
        width: 32,
        height: 32,
        color: isActive ? "#ffffff" : "#343330",
      },
    });
  };

  return (
    <Box sx={{ width: 220 }}>
        <Stack>
          {menuItems.map((item) => {
            const isActive = activeId === item.id;

            return (
              <Box
                key={item.id}
                onClick={() => handleClick(item)}
                sx={{
                  backgroundColor: isActive ? "#B4463C" : "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  gap: "17px",
                  padding:" 8px 16px",
                  marginTop: "10px",
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                  "&:hover": {
                    backgroundColor: isActive ? "#B4463C" : "#fff3e0",
                  },
                }}
              >
                {renderIcon(item, isActive)}
                <Typography
                  sx={{
                    flex: 1,
                    fontWeight: 500,
                    fontSize: 14,
                    color: isActive ? "#ffffff" : "#737373",
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Box>
  );
};

export default MenuOption;
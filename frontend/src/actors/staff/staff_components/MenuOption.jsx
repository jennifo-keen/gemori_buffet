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
    let bestMatch = null;
    let maxMatchLength = 0;

    menuItems.forEach(item => {
      const pathsToCheck = [];
      if (item.path) pathsToCheck.push(item.path);
      if (item.matchPaths) pathsToCheck.push(...item.matchPaths);

      pathsToCheck.forEach(p => {
        if (location.pathname.startsWith(p)) {
          if (location.pathname === p || location.pathname[p.length] === '/') {
            if (p.length > maxMatchLength) {
              maxMatchLength = p.length;
              bestMatch = item;
            }
          }
        }
      });
    });

    return bestMatch?.id || defaultActiveId;
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
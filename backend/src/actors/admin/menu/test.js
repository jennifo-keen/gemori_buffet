import { Stack, Typography } from "@mui/material";

// Column header definitions for the menu table
const columns = [
  { label: "ẢNH MÓN", align: "center", flex: 1.25 },
  { label: "TÊN MÓN", align: "left", flex: 2.7 },
  { label: "DANH MỤC", align: "center", flex: 1.3 },
  { label: "GIÁ NIÊM YẾT", align: "center", flex: 1.5 },
  { label: "TRẠNG THÁI", align: "center", flex: 1.4 },
  { label: "HÀNH ĐỘNG", align: "center", flex: 1.4 },
];

export const MenuTableHeaderSection = () => {
  return (
    <Stack
      component="thead"
      direction="row"
      sx={{
        width: "100%",
        backgroundColor: "tableHeader.main",
        borderBottom: "1px solid",
        borderColor: "border.main",
      }}
    >
      {columns.map((col) => (
        <Stack
          key={col.label}
          component="th"
          direction="row"
          alignItems="center"
          justifyContent={col.align === "left" ? "flex-start" : "center"}
          sx={{ flex: col.flex, px: 3, py: 2 }}
        >
          <Typography
            variant="labelLabel3Bold"
            sx={{
              color: "tableHeader.contrastText",
              whiteSpace: "nowrap",
              textAlign: col.align,
            }}
          >
            {col.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Switch,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

// Menu item data
const menuItem = {
  image:
    "https://ab6axubnnispo1icxciwqt3uj7yorxkqhgtpiuptdogjxnoiktozj-9f8k58xupdrlanjrq6jli7acjhn36herciiavjkxagkbt1sh7ee7-h-fpawayd83kba-hziu96j1amthll2eql30krk6txf86gt3zncwvamty7sgudgtstzaiiqvwk2s7-qjojwpdjvxe2vburcz-cmztlpbp2z5gjepfbog2ncbwmfgeezvxbcft6bsafushccoyw7tdvthmrtako9-xqqpve3gzb-6.png",
  name: "Thịt bò Wagyu thượng hạng",
  code: "Mã: MW-BEEF-001",
  category: "Thịt bò",
  price: "289.000đ",
  isActive: true,
  statusLabel: "Đang bán",
};

export const MenuTableBodySection = () => {
  return (
    <TableRow
      sx={{
        height: "84px",
        borderBottom: "1px solid",
        borderColor: "border.main",
        "&:last-child td": { borderBottom: 0 },
      }}
    >
      {/* Product Image */}
      <TableCell sx={{ width: "125px", px: 3, py: 2 }}>
        <Box
          component="img"
          src={menuItem.image}
          alt={menuItem.name}
          sx={{
            width: 48,
            height: 48,
            borderRadius: "8px",
            objectFit: "cover",
            boxShadow: 5,
            display: "block",
          }}
        />
      </TableCell>
      {/* Product Name & Code */}
      <TableCell sx={{ width: "271px", px: 3, py: 0 }}>
        <Stack spacing={0}>
          <Typography
            variant="body1"
            sx={{
              fontFamily: '"Be Vietnam Pro", Helvetica',
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "16px",
              color: "text.primary",
            }}
          >
            {menuItem.name}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Be Vietnam Pro", Helvetica',
              fontSize: "9px",
              fontWeight: 500,
              lineHeight: "17px",
              color: "text.secondary",
            }}
          >
            {menuItem.code}
          </Typography>
        </Stack>
      </TableCell>
      {/* Category Badge */}
      <TableCell sx={{ width: "131px", px: 2, py: 0, textAlign: "center" }}>
        <Chip
          label={menuItem.category}
          size="small"
          sx={{
            backgroundColor: "neutral.main",
            color: "common.white",
            fontFamily: '"Be Vietnam Pro", Helvetica',
            fontSize: "12px",
            fontWeight: 500,
            lineHeight: "20px",
            height: "20px",
            borderRadius: "4px",
            "& .MuiChip-label": {
              px: 1,
            },
          }}
        />
      </TableCell>
      {/* Price */}
      <TableCell sx={{ width: "124px", py: 0, textAlign: "center" }}>
        <Typography
          sx={{
            fontFamily: '"Be Vietnam Pro", Helvetica',
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "16px",
            color: "primary.main",
            textAlign: "center",
          }}
        >
          {menuItem.price}
        </Typography>
      </TableCell>
      {/* Status Toggle */}
      <TableCell sx={{ width: "167px", pl: 6, pr: 3, py: 0 }}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Switch
            checked={menuItem.isActive}
            size="small"
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "common.white",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "primary.main",
                opacity: 1,
              },
              "& .MuiSwitch-track": {
                backgroundColor: "primary.main",
                opacity: 1,
              },
            }}
          />
          <Typography
            sx={{
              fontFamily: '"Be Vietnam Pro", Helvetica',
              fontSize: "10px",
              fontWeight: 700,
              lineHeight: "18px",
              color: menuItem.isActive ? "primary.main" : "slate.main",
            }}
          >
            {menuItem.statusLabel}
          </Typography>
        </Stack>
      </TableCell>
      {/* Action Icons */}
      <TableCell sx={{ textAlign: "right", pr: 2, py: 0 }}>
        <Stack direction="row" justifyContent="flex-end" spacing={0.5}>
          <IconButton size="small" aria-label="edit">
            <EditOutlinedIcon
              sx={{ width: 18, height: 18, color: "text.secondary" }}
            />
          </IconButton>
          <IconButton size="small" aria-label="delete">
            <DeleteOutlineIcon
              sx={{ width: 18, height: 18, color: "text.secondary" }}
            />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default MenuTableBodySection;
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import EditOutlined from "@mui/icons-material/EditOutlined";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";

const IMAGE_URL =
  "https://ab6axubnnispo1icxciwqt3uj7yorxkqhgtpiuptdogjxnoiktozj-9f8k58xupdrlanjrq6jli7acjhn36herciiavjkxagkbt1sh7ee7-h-fpawayd83kba-hziu96j1amthll2eql30krk6txf86gt3zncwvamty7sgudgtstzaiiqvwk2s7-qjojwpdjvxe2vburcz-cmztlpbp2z5gjepfbog2ncbwmfgeezvxbcft6bsafushccoyw7tdvthmrtako9-xqqpve3gzb-8.png";

export const MenuRowEntrySection = () => {
  const [active, setActive] = React.useState(true);

  return (
    <Box
      component="article"
      sx={{
        display: "flex",
        alignItems: "center",
        height: 84,
        width: "100%",
        borderBottom: "1px solid",
        borderColor: "border.main",
        borderTop: "1px solid",
        px: 0,
      }}
    >
      {/* Product Image */}
      <Box
        sx={{
          flexShrink: 0,
          width: 125,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
        }}
      >
        <Box
          component="img"
          src={IMAGE_URL}
          alt="Thịt bò Wagyu thượng hạng"
          sx={{
            width: 64,
            height: 48,
            borderRadius: "8px",
            objectFit: "cover",
            objectPosition: "center",
            boxShadow: 5,
            flexShrink: 0,
          }}
        />
      </Box>
      {/* Product Name & Code */}
      <Box
        sx={{
          width: 272,
          flexShrink: 0,
          px: 3,
          py: "25.5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="labelLabel2Bold"
          sx={{
            color: "text.primary",
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "16px",
            letterSpacing: 0,
          }}
        >
          Thịt bò Wagyu thượng hạng
        </Typography>
        <Typography
          variant="captionCaption2Medium"
          sx={{
            color: "text.secondary",
            fontSize: "9px",
            fontWeight: 500,
            lineHeight: "17px",
            letterSpacing: 0,
            mt: "2px",
          }}
        >
          Mã: MW-BEEF-001
        </Typography>
      </Box>
      {/* Category Badge */}
      <Box
        sx={{
          width: 131,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Chip
          label="Thịt bò"
          size="small"
          sx={{
            backgroundColor: "neutral.main",
            color: "common.white",
            fontFamily: '"Be Vietnam Pro", Helvetica',
            fontSize: "12px",
            fontWeight: 500,
            lineHeight: "20px",
            height: "auto",
            borderRadius: "4px",
            "& .MuiChip-label": {
              px: "8px",
              py: 0,
            },
          }}
        />
      </Box>
      {/* Price */}
      <Box
        sx={{
          width: 124,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            color: "primary.main",
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "16px",
            letterSpacing: 0,
            textAlign: "center",
            fontFamily: '"Be Vietnam Pro", Helvetica',
          }}
        >
          289.000đ
        </Typography>
      </Box>
      {/* Status Toggle */}
      <Box
        sx={{
          width: 167,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pl: "48px",
          pr: 3,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Switch
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            size="small"
            sx={{
              width: 36,
              height: 20,
              padding: 0,
              "& .MuiSwitch-switchBase": {
                padding: 0,
                margin: "2px",
                transitionDuration: "300ms",
                "&.Mui-checked": {
                  transform: "translateX(16px)",
                  color: "#fff",
                  "& + .MuiSwitch-track": {
                    backgroundColor: "primary.main",
                    opacity: 1,
                    border: 0,
                  },
                },
              },
              "& .MuiSwitch-thumb": {
                boxSizing: "border-box",
                width: 16,
                height: 16,
                boxShadow: "0px 1px 2px rgba(0,0,0,0.2)",
              },
              "& .MuiSwitch-track": {
                borderRadius: 10,
                backgroundColor: "slate.main",
                opacity: 1,
              },
            }}
          />
          <Typography
            sx={{
              color: active ? "primary.main" : "slate.main",
              fontSize: "10px",
              fontWeight: 700,
              lineHeight: "18px",
              letterSpacing: 0,
              fontFamily: '"Be Vietnam Pro", Helvetica',
              whiteSpace: "nowrap",
            }}
          >
            {active ? "Đang bán" : "Ngừng bán"}
          </Typography>
        </Stack>
      </Box>
      {/* Action Icons */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 1,
          pr: 2,
        }}
      >
        <IconButton size="small" aria-label="Edit item">
          <EditOutlined
            sx={{
              width: 18,
              height: 18,
              color: "#D4A017",
            }}
          />
        </IconButton>
        <IconButton size="small" aria-label="Delete item">
          <DeleteOutlined
            sx={{
              width: 18,
              height: 18,
              color: "#3B82F6",
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MenuRowEntrySection;
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

const IMAGE_URL =
  "https://ab6axubnnispo1icxciwqt3uj7yorxkqhgtpiuptdogjxnoiktozj-9f8k58xupdrlanjrq6jli7acjhn36herciiavjkxagkbt1sh7ee7-h-fpawayd83kba-hziu96j1amthll2eql30krk6txf86gt3zncwvamty7sgudgtstzaiiqvwk2s7-qjojwpdjvxe2vburcz-cmztlpbp2z5gjepfbog2ncbwmfgeezvxbcft6bsafushccoyw7tdvthmrtako9-xqqpve3gzb-9.png";

export const MenuRowContentSection = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        height: 84,
        width: "100%",
        borderBottom: "1px solid rgba(177, 65, 53, 0.1)",
        borderTop: "1px solid rgba(177, 65, 53, 0.1)",
        pr: "140px",
      }}
    >
      {/* Thumbnail */}
      <Box sx={{ px: 3, py: "16.5px", flexShrink: 0 }}>
        <Box
          component="img"
          src={IMAGE_URL}
          alt="Thịt bò Wagyu thượng hạng"
          sx={{
            width: 64,
            height: 48,
            borderRadius: "8px",
            objectFit: "cover",
            boxShadow: "0px 1px 2px #0000000d",
          }}
        />
      </Box>
      {/* Name & Code */}
      <Box sx={{ width: 271, px: 3, py: "25.5px", flexShrink: 0 }}>
        <Typography
          variant="subtitle2"
          sx={{
            color: "text.primary",
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "16px",
            letterSpacing: 0,
          }}
        >
          Thịt bò Wagyu thượng hạng
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "9px",
            fontWeight: 500,
            lineHeight: "17px",
            letterSpacing: 0,
          }}
        >
          Mã: MW-BEEF-001
        </Typography>
      </Box>
      {/* Category Badge */}
      <Box
        sx={{
          width: 131,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 4,
          flexShrink: 0,
        }}
      >
        <Chip
          label="Thịt bò"
          size="small"
          sx={{
            backgroundColor: "neutral.main",
            color: "neutral.contrastText",
            fontSize: "12px",
            fontWeight: 500,
            lineHeight: "20px",
            height: "auto",
            borderRadius: "4px",
            "& .MuiChip-label": {
              px: "8px",
              py: 0,
            },
          }}
        />
      </Box>
      {/* Price */}
      <Box
        sx={{
          width: 124,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            color: "primary.main",
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "16px",
            letterSpacing: 0,
            textAlign: "center",
          }}
        >
          289.000đ
        </Typography>
      </Box>
      {/* Status Toggle */}
      <Box
        sx={{
          width: 167,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          pl: 6,
          pr: 3,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Switch
            defaultChecked
            size="small"
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#fff",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "primary.main",
                opacity: 1,
              },
              "& .MuiSwitch-track": {
                borderRadius: "10px",
              },
            }}
          />
          <Typography
            sx={{
              color: "primary.main",
              fontSize: "10px",
              fontWeight: 700,
              lineHeight: "18px",
              letterSpacing: 0,
            }}
          >
            Đang bán
          </Typography>
        </Stack>
      </Box>
      {/* Actions */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
        sx={{ flex: 1 }}
      >
        <IconButton size="small" sx={{ color: "#b8860b" }}>
          <EditOutlinedIcon sx={{ width: 18, height: 18 }} />
        </IconButton>
        <IconButton size="small" sx={{ color: "#1565c0" }}>
          <DeleteOutlineOutlinedIcon sx={{ width: 18, height: 18 }} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default MenuRowContentSection;
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const MenuRowCollectionSection = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Stack
      component="article"
      direction="row"
      alignItems="center"
      sx={{
        width: "100%",
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "border.main",
        pr: "140px",
      }}
    >
      {/* Thumbnail */}
      <Box sx={{ px: 3, py: 2, flexShrink: 0 }}>
        <Box
          component="img"
          src=""
          alt="Thịt bò Wagyu thượng hạng"
          sx={{
            width: 64,
            height: 48,
            borderRadius: 2,
            boxShadow: 5,
            background:
              "linear-gradient(0deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.5) 100%)",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>
      {/* Name & Code */}
      <Stack
        direction="column"
        justifyContent="center"
        sx={{ px: 3, py: "25.5px", width: 271, flexShrink: 0 }}
      >
        <Typography
          variant="labelLabel2Bold"
          sx={{ color: "neutral.dark", lineHeight: "16px" }}
        >
          Thịt bò Wagyu thượng hạng
        </Typography>
        <Typography
          variant="captionCaption2Medium"
          sx={{ color: "text.secondary" }}
        >
          Mã: MW-BEEF-001
        </Typography>
      </Stack>
      {/* Category Chip */}
      <Box
        sx={{
          width: 131,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 4,
        }}
      >
        <Chip
          label="Thịt bò"
          size="small"
          sx={{
            backgroundColor: "neutral.main",
            color: "neutral.contrastText",
            borderRadius: "4px",
            height: "20px",
            "& .MuiChip-label": {
              px: 1,
              ...{
                fontFamily: '"Be Vietnam Pro", Helvetica',
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: "20px",
              },
            },
          }}
        />
      </Box>
      {/* Price */}
      <Box
        sx={{
          width: 124,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="labelLabel2Bold"
          sx={{ color: "neutral.dark", textAlign: "center" }}
        >
          289.000đ
        </Typography>
      </Box>
      {/* Status Toggle */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        sx={{
          width: 167,
          flexShrink: 0,
          pl: 6,
          pr: 3,
          py: "31.5px",
        }}
      >
        <Switch
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          size="small"
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "primary.main",
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "primary.main",
            },
            "& .MuiSwitch-track": {
              backgroundColor: "slate.main",
            },
            "& .MuiSwitch-switchBase": {
              color: "white",
            },
          }}
        />
        <Typography
          variant="captionCaption1Bold"
          sx={{
            color: "slate.main",
            whiteSpace: "nowrap",
          }}
        >
          Ngưng bán
        </Typography>
      </Stack>
      {/* Action Icons */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
        sx={{ flex: 1 }}
      >
        <IconButton size="small" aria-label="Edit item">
          <EditOutlinedIcon sx={{ width: 18, height: 18, color: "#D97706" }} />
        </IconButton>
        <IconButton size="small" aria-label="Delete item">
          <DeleteOutlineIcon sx={{ width: 18, height: 18, color: "#3B82F6" }} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default MenuRowCollectionSection;
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const MenuRowActionSection = () => {
  const [active, setActive] = useState(false);

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.5)",
        border: "1px solid rgba(177, 65, 53, 0.1)",
        pr: "140px",
      }}
    >
      {/* Product image */}
      <Box sx={{ px: 3, py: "16.5px", flexShrink: 0 }}>
        <Box
          sx={{
            width: 64,
            height: 48,
            borderRadius: "8px",
            boxShadow: "0px 1px 2px #0000000d",
            background:
              "linear-gradient(0deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.5) 100%), url('https://via.placeholder.com/64x48') center/cover no-repeat",
            backgroundColor: "#e0e0e0",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </Box>
      {/* Product name and code */}
      <Box sx={{ px: 3, py: "25.5px", width: "271.55px", flexShrink: 0 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontFamily: '"Be Vietnam Pro", Helvetica',
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "16px",
            letterSpacing: "0px",
            color: "text.primary",
          }}
        >
          Thịt bò Wagyu thượng hạng
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Be Vietnam Pro", Helvetica',
            fontSize: "9px",
            fontWeight: 500,
            lineHeight: "17px",
            letterSpacing: "0px",
            color: "secondary.main",
            mt: "2px",
          }}
        >
          Mã: MW-BEEF-001
        </Typography>
      </Box>
      {/* Category badge */}
      <Box
        sx={{
          width: "131.06px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 4,
        }}
      >
        <Chip
          label="Thịt bò"
          size="small"
          sx={{
            backgroundColor: "neutral.main",
            color: "neutral.contrastText",
            fontFamily: '"Be Vietnam Pro", Helvetica',
            fontSize: "12px",
            fontWeight: 500,
            lineHeight: "20px",
            height: "auto",
            borderRadius: "4px",
            "& .MuiChip-label": {
              px: "8px",
              py: 0,
            },
          }}
        />
      </Box>
      {/* Price */}
      <Box
        sx={{
          width: "124.25px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Be Vietnam Pro", Helvetica',
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "16px",
            letterSpacing: "0px",
            color: "text.primary",
            textAlign: "center",
          }}
        >
          289.000đ
        </Typography>
      </Box>
      {/* Toggle switch with label */}
      <Box
        sx={{
          width: "166.7px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pl: 6,
          pr: 3,
          py: "31.5px",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Switch
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            size="small"
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "primary.main",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "primary.main",
              },
              "& .MuiSwitch-track": {
                backgroundColor: "slate.main",
              },
              "& .MuiSwitch-switchBase": {
                color: "#fff",
              },
            }}
          />
          <Typography
            sx={{
              fontFamily: '"Be Vietnam Pro", Helvetica',
              fontSize: "10px",
              fontWeight: 700,
              lineHeight: "18px",
              letterSpacing: "0px",
              color: "slate.main",
              textAlign: "right",
              whiteSpace: "nowrap",
            }}
          >
            Ngưng bán
          </Typography>
        </Stack>
      </Box>
      {/* Action icons */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ flex: 1, justifyContent: "flex-end" }}
      >
        <IconButton size="small" sx={{ color: "#D4A017", p: "2px" }}>
          <EditOutlinedIcon sx={{ width: 18, height: 18 }} />
        </IconButton>
        <IconButton size="small" sx={{ color: "#5B8DD9", p: "2px" }}>
          <DeleteOutlineIcon sx={{ width: 18, height: 18 }} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default MenuRowActionSection;
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

const IMAGE_URL =
  "https://storage.googleapis.com/ab6axubnnispo1icxciwqt3uj7yorxkqhgtpiuptdogjxnoiktozj-9f8k58xupdrlanjrq6jli7acjhn36herciiavjkxagkbt1sh7ee7-h-fpawayd83kba-hziu96j1amthll2eql30krk6txf86gt3zncwvamty7sgudgtstzaiiqvwk2s7-qjojwpdjvxe2vburcz-cmztlpbp2z5gjepfbog2ncbwmfgeezvxbcft6bsafushccoyw7tdvthmrtako9-xqqpve3gzb.png";

export const MenuItemStatusColumnSection = () => {
  return (
    <Stack
      component="article"
      direction="row"
      alignItems="center"
      sx={{
        width: "100%",
        minHeight: 84,
        borderBottom: "1px solid",
        borderColor: "border.main",
        borderTop: "1px solid",
        borderLeft: "1px solid",
        borderRight: "1px solid",
        pr: "140px",
      }}
    >
      {/* Thumbnail */}
      <Box sx={{ px: 3, py: 2, flexShrink: 0 }}>
        <Box
          component="img"
          src={IMAGE_URL}
          alt="Thịt bò Wagyu thượng hạng"
          sx={{
            width: 64,
            height: 48,
            borderRadius: "8px",
            objectFit: "cover",
            objectPosition: "center",
            boxShadow: 5,
            display: "block",
          }}
        />
      </Box>
      {/* Name & Code */}
      <Box sx={{ width: 271, px: 3, py: "25.5px", flexShrink: 0 }}>
        <Typography
          variant="labelLabel2Bold"
          component="p"
          sx={{
            color: "text.primary",
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "16px",
            mb: 0.5,
          }}
        >
          Thịt bò Wagyu thượng hạng
        </Typography>
        <Typography
          component="div"
          sx={{
            color: "text.secondary",
            fontSize: "9px",
            fontWeight: 500,
            lineHeight: "17px",
          }}
        >
          Mã: MW-BEEF-001
        </Typography>
      </Box>
      {/* Category Badge */}
      <Box
        sx={{
          width: 131,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 4,
          flexShrink: 0,
        }}
      >
        <Chip
          label="Thịt bò"
          size="small"
          sx={{
            backgroundColor: "neutral.main",
            color: "common.white",
            fontSize: "12px",
            fontWeight: 500,
            lineHeight: "20px",
            height: "auto",
            borderRadius: "4px",
            "& .MuiChip-label": {
              px: 1,
              py: 0,
            },
          }}
        />
      </Box>
      {/* Price */}
      <Box
        sx={{
          width: 124,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            color: "primary.main",
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "16px",
            textAlign: "center",
          }}
        >
          289.000đ
        </Typography>
      </Box>
      {/* Status Toggle */}
      <Box
        sx={{
          width: 167,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pl: 6,
          pr: 3,
          flexShrink: 0,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Switch
            defaultChecked
            size="small"
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "common.white",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "primary.main",
                opacity: 1,
              },
              "& .MuiSwitch-track": {
                borderRadius: "10px",
              },
            }}
          />
          <Typography
            sx={{
              color: "primary.main",
              fontSize: "10px",
              fontWeight: 700,
              lineHeight: "18px",
              whiteSpace: "nowrap",
            }}
          >
            Đang bán
          </Typography>
        </Stack>
      </Box>
      {/* Actions */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ flex: 1, justifyContent: "flex-end" }}
      >
        <IconButton size="small" aria-label="Edit item">
          <EditOutlinedIcon
            sx={{ width: 18, height: 18, color: "text.secondary" }}
          />
        </IconButton>
        <IconButton size="small" aria-label="Delete item">
          <DeleteOutlineIcon
            sx={{ width: 18, height: 18, color: "text.secondary" }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default MenuItemStatusColumnSection;
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Chip, Stack, Switch, Typography } from "@mui/material";

const IMAGE_URL =
  "https://ab6axubnnispo1icxciwqt3uj7yorxkqhgtpiuptdogjxnoiktozj-9f8k58xupdrlanjrq6jli7acjhn36herciiavjkxagkbt1sh7ee7-h-fpawayd83kba-hziu96j1amthll2eql30krk6txf86gt3zncwvamty7sgudgtstzaiiqvwk2s7-qjojwpdjvxe2vburcz-cmztlpbp2z5gjepfbog2ncbwmfgeezvxbcft6bsafushccoyw7tdvthmrtako9-xqqpve3gzb-7.png";

export const MenuItemEntryOneSection = () => {
  return (
    <Box
      component="article"
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: 84,
        borderBottom: "1px solid",
        borderColor: "border.main",
        borderTop: "1px solid",
        px: 0,
      }}
    >
      {/* Thumbnail */}
      <Box
        sx={{
          width: 125,
          display: "flex",
          alignItems: "center",
          px: 3,
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={IMAGE_URL}
          alt="Thịt bò Wagyu thượng hạng"
          sx={{
            width: 64,
            height: 48,
            borderRadius: "8px",
            objectFit: "cover",
            objectPosition: "center",
            boxShadow: 5,
          }}
        />
      </Box>
      {/* Name & Code */}
      <Box sx={{ width: 272, px: 3, flexShrink: 0 }}>
        <Typography
          variant="subtitle2"
          sx={{
            color: "text.primary",
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "16px",
            letterSpacing: 0,
          }}
        >
          Thịt bò Wagyu thượng hạng
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "9px",
            fontWeight: 500,
            lineHeight: "17px",
            letterSpacing: 0,
            mt: 0.25,
          }}
        >
          Mã: MW-BEEF-001
        </Typography>
      </Box>
      {/* Category Badge */}
      <Box
        sx={{
          width: 131,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Chip
          label="Thịt bò"
          size="small"
          sx={{
            backgroundColor: "neutral.main",
            color: "common.white",
            fontSize: "12px",
            fontWeight: 500,
            lineHeight: "20px",
            height: "auto",
            borderRadius: "4px",
            "& .MuiChip-label": {
              px: 1,
              py: 0,
            },
          }}
        />
      </Box>
      {/* Price */}
      <Box
        sx={{
          width: 124,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            color: "primary.main",
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "16px",
            letterSpacing: 0,
            textAlign: "center",
          }}
        >
          289.000đ
        </Typography>
      </Box>
      {/* Status Toggle */}
      <Box
        sx={{
          width: 167,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          pl: 6,
          pr: 3,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Switch
            defaultChecked
            size="small"
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "common.white",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "primary.main",
                opacity: 1,
              },
              "& .MuiSwitch-track": {
                borderRadius: "10px",
              },
            }}
          />
          <Typography
            sx={{
              color: "primary.main",
              fontSize: "10px",
              fontWeight: 700,
              lineHeight: "18px",
              letterSpacing: 0,
              whiteSpace: "nowrap",
            }}
          >
            Đang bán
          </Typography>
        </Stack>
      </Box>
      {/* Actions */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="flex-end"
        sx={{ flex: 1, pr: 2 }}
      >
        <EditOutlinedIcon
          sx={{ width: 18, height: 18, color: "#D4A017", cursor: "pointer" }}
        />
        <DeleteOutlineIcon
          sx={{ width: 18, height: 18, color: "#3B82F6", cursor: "pointer" }}
        />
      </Stack>
    </Box>
  );
};

export default MenuItemEntryOneSection;
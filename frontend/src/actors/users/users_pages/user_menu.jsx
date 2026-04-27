import React, { useEffect, useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_SOCKET_URL}/menu`;

const FALLBACK_IMAGE =
  "https://res.cloudinary.com/dbifhgaic/image/upload/v1771769449/ChatGPT_Image_21_10_29_22_thg_2_2026_yfyu9j.png";

const formatPrice = (price) => {
  if (price === null || price === undefined) return "0 đ";
  return `${Number(price).toLocaleString("vi-VN")} đ`;
};

export const Main = () => {
  const [expandedSections, setExpandedSections] = useState({
    buffet: true,
    "mon-don": false,
  });

  const [buffetList, setBuffetList] = useState([]);
  const [activeItem, setActiveItem] = useState("");
  const [buffetDetail, setBuffetDetail] = useState(null);

  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState("");

  const [menuPage, setMenuPage] = useState(1);
  const itemsPerPage = 6;

  const comboMenus = buffetDetail?.menus || [];
  const totalMenuPages = Math.ceil(comboMenus.length / itemsPerPage);

  const paginatedComboMenus = comboMenus.slice(
    (menuPage - 1) * itemsPerPage,
    menuPage * itemsPerPage
  );

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const menu = useMemo(() => {
    return [
      {
        id: "buffet",
        label: "Buffet",
        items: buffetList.map((item) => ({
          id: item.code,
          label: item.name,
        })),
      },
      {
        id: "mon-don",
        label: "Món đơn",
        items: [],
      },
    ];
  }, [buffetList]);

  useEffect(() => {
    const fetchBuffetList = async () => {
      try {
        setLoadingList(true);
        setError("");

        const response = await axios.get(`${API_BASE_URL}/buffet-tickets`);
        const list = response?.data?.data || [];

        setBuffetList(list);

        if (list.length > 0) {
          setActiveItem(list[0].code);
        }
      } catch (err) {
        console.error("Lỗi lấy danh sách buffet:", err);
        setError("Không thể tải danh sách buffet");
      } finally {
        setLoadingList(false);
      }
    };

    fetchBuffetList();
  }, []);

  useEffect(() => {
    if (!activeItem) return;

    const fetchBuffetDetail = async () => {
      try {
        setLoadingDetail(true);

        const response = await axios.get(
          `${API_BASE_URL}/buffet-tickets/${activeItem}`
        );

        setBuffetDetail(response?.data?.data || null);
      } catch (err) {
        console.error("Lỗi lấy chi tiết buffet:", err);
        setBuffetDetail(null);
      } finally {
        setLoadingDetail(false);
      }
    };

    fetchBuffetDetail();
  }, [activeItem]);

  useEffect(() => {
    setMenuPage(1);
  }, [activeItem]);

  const currentIndex = buffetList.findIndex((item) => item.code === activeItem);

  const handlePrev = () => {
    if (buffetList.length === 0) return;

    const prevIndex =
      currentIndex <= 0 ? buffetList.length - 1 : currentIndex - 1;

    setActiveItem(buffetList[prevIndex].code);
  };

  const handleNext = () => {
    if (buffetList.length === 0) return;

    const nextIndex =
      currentIndex >= buffetList.length - 1 ? 0 : currentIndex + 1;

    setActiveItem(buffetList[nextIndex].code);
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 3, sm: 4, md: 5, lg: 6 }}
      sx={{
        px: { xs: 2, sm: 3, md: 5, lg: 9 },
        py: { xs: 3, sm: 4 },
        alignItems: "flex-start",
        justifyContent: "center",
        width: "100%",
        maxWidth: "1400px",
        mx: "auto",
      }}
    >
      {/* Left Sidebar Navigation */}
      <Box
        sx={{
          width: { xs: "100%", md: 256 },
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            borderTop: "1px solid",
            borderColor: "grey.100",
            borderRadius: { xs: 2, md: 0 },
            overflow: "hidden",
            bgcolor: "background.paper",
          }}
        >
          {menu.map((section) => (
            <Box
              key={section.id}
              sx={{ borderBottom: "1px solid", borderColor: "grey.100" }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                onClick={() => toggleSection(section.id)}
                sx={{
                  px: { xs: 1.5, sm: 2 },
                  py: 2,
                  bgcolor: "background.paper",
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={
                    section.id === "buffet"
                      ? {
                          pb: "2px",
                          borderBottom: "2px solid",
                          borderColor: "primary.main",
                        }
                      : {}
                  }
                >
                  <Typography
                    sx={{
                      fontFamily: '"Be Vietnam Pro", Helvetica',
                      fontSize: { xs: "15px", sm: "16px" },
                      fontWeight: 700,
                      lineHeight: "24px",
                      color: section.id === "buffet" ? "#f97316" : "#64748b",
                    }}
                  >
                    {section.label}
                  </Typography>
                </Box>

                <ExpandMoreIcon
                  sx={{
                    width: 16,
                    height: 16,
                    color: section.id === "buffet" ? "#f97316" : "#64748b",
                    transform: expandedSections[section.id]
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                />
              </Stack>

              {expandedSections[section.id] && (
                <Stack
                  spacing={1.5}
                  sx={{
                    pl: { xs: 1.5, sm: 2 },
                    pr: { xs: 1.5, sm: 1 },
                    py: 1,
                  }}
                >
                  {loadingList && section.id === "buffet" ? (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <CircularProgress size={16} />
                      <Typography sx={{ fontSize: "14px", color: "#64748b" }}>
                        Đang tải...
                      </Typography>
                    </Stack>
                  ) : error && section.id === "buffet" ? (
                    <Typography sx={{ fontSize: "14px", color: "error.main" }}>
                      {error}
                    </Typography>
                  ) : section.items.length > 0 ? (
                    section.items.map((item, index) => (
                      <Stack
                        key={item.id}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        onClick={() => setActiveItem(item.id)}
                        sx={{
                          cursor: "pointer",
                          pb: index === section.items.length - 1 ? 1 : 0,
                          gap: 1.5,
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: '"Be Vietnam Pro", Helvetica',
                            fontSize: { xs: "15px", sm: "16px" },
                            fontWeight: 500,
                            lineHeight: "24px",
                            color:
                              activeItem === item.id ? "#f97316" : "#4b5563",
                            wordBreak: "break-word",
                            flex: 1,
                          }}
                        >
                          {item.label}
                        </Typography>

                        {activeItem === item.id ? (
                          <Box
                            sx={{
                              width: 16,
                              height: 2,
                              bgcolor: "#f97316",
                              flexShrink: 0,
                            }}
                          />
                        ) : (
                          <AddIcon
                            sx={{
                              width: 16,
                              height: 16,
                              color: "#4b5563",
                              flexShrink: 0,
                            }}
                          />
                        )}
                      </Stack>
                    ))
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#94a3b8",
                        py: 1,
                      }}
                    >
                      Chưa có dữ liệu
                    </Typography>
                  )}
                </Stack>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Main Content Area */}
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={{ xs: 3, sm: 4 }}
        sx={{ flex: 1, alignItems: "flex-start", width: "100%" }}
      >
        {/* Image */}
        <Box sx={{ width: "100%", flex: 1, position: "relative" }}>
          <Box
            sx={{
              borderRadius: "16px",
              boxShadow: "0px 1px 2px #0000000d",
              aspectRatio: {
                xs: "1 / 1.15",
                sm: "1 / 1",
                md: "0.9",
                lg: "0.75",
              },
              backgroundImage: `url(${
                buffetDetail?.image_url || FALLBACK_IMAGE
              })`,
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
              width: "100%",
              backgroundColor: "#f8fafc",
            }}
          />

          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: { xs: 8, sm: 12 },
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(255,255,255,0.8)",
              borderRadius: "50%",
              p: { xs: 0.75, sm: 1 },
              "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: { xs: 8, sm: 12 },
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(255,255,255,0.8)",
              borderRadius: "50%",
              p: { xs: 0.75, sm: 1 },
              "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* Product Info */}
        <Box
          sx={{
            width: { xs: "100%", lg: 420 },
            flexShrink: 0,
          }}
        >
          <Box
            component="header"
            sx={{
              borderBottom: "1px solid",
              borderColor: "grey.100",
              pb: 1.5,
            }}
          >
            {loadingDetail ? (
              <Stack direction="row" alignItems="center" spacing={1}>
                <CircularProgress size={20} />
                <Typography sx={{ fontSize: "14px", color: "#64748b" }}>
                  Đang tải chi tiết...
                </Typography>
              </Stack>
            ) : (
              <>
                <Typography
                  sx={{
                    fontFamily: '"Be Vietnam Pro", Helvetica',
                    fontSize: { xs: "24px", sm: "28px", md: "32px" },
                    fontWeight: 700,
                    lineHeight: { xs: "32px", sm: "36px", md: "40px" },
                    color: "#1f2937",
                    wordBreak: "break-word",
                  }}
                >
                  {buffetDetail?.name || "Chưa có dữ liệu"}
                </Typography>

                <Stack
                  direction="row"
                  alignItems="baseline"
                  spacing={0.5}
                  sx={{ flexWrap: "wrap", mt: 0.5 }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Be Vietnam Pro", Helvetica',
                      fontSize: { xs: "20px", sm: "22px", md: "24px" },
                      fontWeight: 700,
                      lineHeight: "32px",
                      color: "#1f2937",
                    }}
                  >
                    {formatPrice(buffetDetail?.price)}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: '"Be Vietnam Pro", Helvetica',
                      fontSize: { xs: "14px", sm: "15px", md: "16px" },
                      fontWeight: 500,
                      lineHeight: "24px",
                      color: "#6b7280",
                    }}
                  >
                    /người
                  </Typography>
                </Stack>

                <Typography
                  component="p"
                  sx={{
                    fontFamily: '"Be Vietnam Pro", Helvetica',
                    fontSize: "12px",
                    lineHeight: "20px",
                    color: "#9ca3af",
                  }}
                >
                  (Giá chưa bao gồm VAT)
                </Typography>

                {/* Danh sách món trong combo */}
                <Box sx={{ mt: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: '"Be Vietnam Pro", Helvetica',
                      fontSize: { xs: "16px", sm: "17px" },
                      fontWeight: 700,
                      color: "#1f2937",
                      mb: 1.5,
                    }}
                  >
                    Các món có trong combo
                  </Typography>

                  {comboMenus.length > 0 ? (
                    <>
                      <Stack spacing={1}>
                        {paginatedComboMenus.map((menuItem) => (
                          <Box
                            key={menuItem.id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.2,
                              p: 1.2,
                              borderRadius: "10px",
                              bgcolor: "#fff7ed",
                              border: "1px solid #fed7aa",
                            }}
                          >
                            <Box
                              sx={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                bgcolor: "#f97316",
                                flexShrink: 0,
                              }}
                            />

                            <Box sx={{ flex: 1 }}>
                              <Typography
                                sx={{
                                  fontFamily: '"Be Vietnam Pro", Helvetica',
                                  fontSize: { xs: "14px", sm: "15px" },
                                  fontWeight: 600,
                                  color: "#374151",
                                }}
                              >
                                {menuItem.name}
                              </Typography>

                              {menuItem.category && (
                                <Typography
                                  sx={{
                                    fontFamily: '"Be Vietnam Pro", Helvetica',
                                    fontSize: "12px",
                                    color: "#9ca3af",
                                  }}
                                >
                                  {menuItem.category}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        ))}
                      </Stack>

                      {totalMenuPages > 1 && (
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{ mt: 1.5 }}
                        >
                          <Button
                            size="small"
                            disabled={menuPage === 1}
                            onClick={() => setMenuPage((prev) => prev - 1)}
                            sx={{
                              textTransform: "none",
                              fontWeight: 700,
                              color: "#f97316",
                              "&.Mui-disabled": {
                                color: "#d1d5db",
                              },
                            }}
                          >
                            Trước
                          </Button>

                          <Typography
                            sx={{
                              fontSize: "13px",
                              color: "#6b7280",
                              fontWeight: 600,
                            }}
                          >
                            {menuPage}/{totalMenuPages}
                          </Typography>

                          <Button
                            size="small"
                            disabled={menuPage === totalMenuPages}
                            onClick={() => setMenuPage((prev) => prev + 1)}
                            sx={{
                              textTransform: "none",
                              fontWeight: 700,
                              color: "#f97316",
                              "&.Mui-disabled": {
                                color: "#d1d5db",
                              },
                            }}
                          >
                            Sau
                          </Button>
                        </Stack>
                      )}
                    </>
                  ) : (
                    <Typography
                      sx={{
                        fontFamily: '"Be Vietnam Pro", Helvetica',
                        fontSize: "14px",
                        color: "#9ca3af",
                      }}
                    >
                      Combo này chưa có món ăn.
                    </Typography>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Main;
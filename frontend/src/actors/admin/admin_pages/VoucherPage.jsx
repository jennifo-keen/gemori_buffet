import { Box, Stack } from "@mui/material";
import { CampaignManagementHeaderSection } from "../admin_components/Voucher/CampaignManagementHeaderSection";
import { ThemeProvider } from "../../users/users_components/layout/ThemeProvider";
import { VoucherCampaignListSection } from "../admin_components/Voucher/VoucherCampaignListSection";

const VoucherPage = () => {
    return (
        <ThemeProvider>
            <Box sx={{ maxWidth: "xl", width: "100%" }} mx="auto">
                <Stack direction="column" spacing={4} p={4}>
                    <CampaignManagementHeaderSection />
                    <VoucherCampaignListSection />
                </Stack>
            </Box>
        </ThemeProvider>
    );
};

export default VoucherPage;

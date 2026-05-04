import { Box, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import { ThemeProvider } from "../../users/users_components/layout/ThemeProvider";
import { UserDirectoryTableSection } from "../admin_components/User/UserDirectoryTableSection";
import UserManagementHeaderSection from "../admin_components/User/UserManagementHeaderSection";
import UserStatsOverviewSection from "../admin_components/User/UserStatsOverviewSection";

const UserPageContent = () => {
    const [stats, setStats] = useState({ total: 0, active: 0, locked: 0 });

    const handleStatsUpdate = (newStats) => {
        if (newStats) {
            setStats(newStats);
        }
    };

    return (
        <Box component="main" sx={{ width: "100%", py: 3 }}>
            <Container maxWidth={false} sx={{ px: { xs: 3, sm: 3, md: 3 } }}>
                <Stack spacing={3} width="100%">
                    <Box component="section" width="100%">
                        <UserManagementHeaderSection />
                    </Box>
                    <Box component="section" width="100%">
                        <UserStatsOverviewSection statsData={stats} />
                    </Box>
                    <Box component="section" width="100%">
                        <UserDirectoryTableSection onStatsUpdate={handleStatsUpdate} />
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

const UserPage = () => {
    return (
        <ThemeProvider>
            <UserPageContent />
        </ThemeProvider>
    );
};

export default UserPage;
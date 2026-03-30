import React from 'react';
import { Box, TextField, IconButton, Typography, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export const AiAssistantChatSection = () => {
    return (
        <Paper sx={{ p: 3, borderRadius: 4, height: 400, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Trợ lý ảo AI</Typography>
            <Box sx={{ flexGrow: 1, bgcolor: '#f8f9fa', borderRadius: 2, p: 2, mb: 2, overflowY: 'auto' }}>
                <Typography variant="body2" sx={{ p: 1, bgcolor: '#eee', borderRadius: 1, width: 'fit-content' }}>
                    Chào Nam! Hôm nay tôi có thể giúp gì cho bạn?
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField fullWidth size="small" placeholder="Hỏi về doanh thu hôm nay..." />
                <IconButton sx={{ bgcolor: '#6C0D0A', color: 'white', '&:hover': { bgcolor: '#4a0a07' } }}>
                    <SendIcon />
                </IconButton>
            </Box>
        </Paper>
    );
};
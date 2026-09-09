import React from 'react';
import { Fab } from '@mui/material';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';

export const FloatingChatButton: React.FC = () => {
  return (
    <Fab
      color="primary"
      aria-label="Open HR Assistant Chat"
      title="HR Assistant / Chat"
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 40,
        backgroundColor: '#0b4668',
        '&:hover': {
          backgroundColor: '#08354f',
          transform: 'scale(1.05)',
        },
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 24, color: '#ffffff' }} />
    </Fab>
  );
};

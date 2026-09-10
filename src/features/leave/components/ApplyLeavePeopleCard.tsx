import React from 'react';
import { Alert, Avatar, Box, Paper, Stack, Typography } from '@mui/material';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ApplyLeaveSectionHeader } from './ApplyLeaveSectionHeader';
import type { LeavePerson } from '../core/types/applyLeave.types';

export const ApplyLeavePeopleCard: React.FC<{ title: string; subtitle: string; people: LeavePerson[] }> = ({ title, subtitle, people }) => (
  <Paper elevation={0} sx={{ border: '1px solid #E2E8F0', borderRadius: 2, p: 2 }}>
    <ApplyLeaveSectionHeader icon={<GroupsOutlinedIcon />} title={title} subtitle={subtitle} />
    <Stack spacing={1.1} sx={{ mt: 2 }}>
      {people.map((person) => (
        <Stack key={person.id} direction="row" spacing={1.4} alignItems="center" sx={{ p: 1.25, borderRadius: 1.5, border: '1px solid #E2E8F0', bgcolor: '#fff' }}>
          <Avatar sx={{ width: 30, height: 30, fontSize: 13, bgcolor: '#eef4f6', color: 'primary.main', fontWeight: 700 }}>
            {person.name.split(' ').map((word) => word[0]).join('').slice(0, 2)}
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#172033' }}>{person.name}</Typography>
            <Typography sx={{ fontSize: 10, color: '#667085' }}>{person.role}</Typography>
          </Box>
        </Stack>
      ))}
    </Stack>
    <Alert icon={<InfoOutlinedIcon sx={{ fontSize: 18 }} />} severity="info" sx={{ mt: 1.5, py: 0.3, border: '1px solid #d8e2ff', bgcolor: '#f8faff', color: '#3150c8', '& .MuiAlert-message': { fontSize: 10 } }}>
      You will be notified once your request is reviewed.
    </Alert>
  </Paper>
);

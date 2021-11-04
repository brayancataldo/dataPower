import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Progress() {
    return (
        <div style={{justifyContent: "center", alignItems: "center", display: "flex", height: "100vh"}}>
             <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </div>
    )
}

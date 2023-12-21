import React from 'react';
import './Footer.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import Typography from '@mui/material/Typography';

export default function Footer() {

  return (

    <footer className="footer">
      <Box sx={{p:2}} >
        <Grid container spacing={2}>
          <Grid item xs={9} sm={8} md={8} lg={8}>
            <Stack direction="row"  flexWrap="wrap">
              {/* <Typography variant='caption' textAlign='left' mr='1rem'>About</Typography> */}
              <Typography variant='caption' textAlign='left'>Copyright @ TinggIT. All Rights Reserved</Typography>
            </Stack>
          </Grid>
          <Grid item xs={3} sm={4} md={4} lg={4}>
            <Stack spacing={2} direction="row"  justifyContent="flex-end"  flexWrap="wrap">
            {/* <Typography variant='caption' textAlign='right'>Privacy Policy</Typography>
            <Typography variant='caption' textAlign='right'>Terms of use</Typography>
            <Typography variant='caption' textAlign='right'>Blog</Typography>  */}
              {/* <Box>Privacy Policy</Box>
              <Box>Terms of use</Box>
              <Box>Blog</Box> */}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </footer>

  )
};

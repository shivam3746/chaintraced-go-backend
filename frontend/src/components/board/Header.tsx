import { Avatar, Box, Grid, Typography } from '@mui/material';

interface HeaderProps {
  authorName: string;
}
export const Header = ({ authorName }: HeaderProps) => {
  return (
    <>
      <Box>
        <Grid container direction='row'>
          <Grid item xs={4}>
            <Avatar sx={{ width: 50, height: 50, backgroundColor: '#B6BBC4' }}>
              SS
            </Avatar>
          </Grid>
          <Grid item xs={8}>
            <Typography variant='h6'>{authorName}</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

import { Box, Typography } from '@mui/material';
import { StyledDeleteButton } from './styles/CustomStyles';
import { Dispatch } from 'react';
import { MessageResponse } from './constants';

export const StoreMessages = ({
  storeMessages,
  setStoreMessages,
}: {
  storeMessages: MessageResponse[];
  setStoreMessages: Dispatch<React.SetStateAction<MessageResponse[]>>;
}) => {

  const handleDeleteMessage = async (id: string) => {
    await fetch(`http://localhost:8080/messages/${id}`, {
      method: 'DELETE',
      mode: 'cors',
    });
    setStoreMessages(storeMessages.filter((item) => item.id !== id));
  };

  return (
    <>
      {storeMessages.map((item, index) => {
        return (
          <Box
            key={index}
            sx={{
              backgroundColor: '#EDEDED',
              borderRadius: '1rem',
              p: 5,
              m: 2,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant='h5'>{item.author}</Typography>
              <Typography variant='h4'>{item.text}</Typography>
            </Box>
            <Box>
              <StyledDeleteButton
                variant='contained'
                onClick={() => handleDeleteMessage(item.id)}
              >
                Delete
              </StyledDeleteButton>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

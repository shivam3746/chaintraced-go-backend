import { Box, IconButton } from '@mui/material';
import { Header } from './Header';
import { StyledTextArea } from './styles/CustomStyles';
import { useEffect, useState } from 'react';
import { StoreMessages } from './StoreMessage';
import { MessageResponse } from './constants';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const Message = () => {
  const [addMessage, setAddMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [storeMessage, setStoreMessage] = useState<MessageResponse[]>([]);

  const handleAddPost = () => {
    setAddMessage(true);
  };
  const handleMessageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleMessageSubmit = async () => {
    await fetch('http://localhost:8080/messages', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        Text: message,
        Author: 'User',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const newData = { ...data, replyMode: false };
        setStoreMessage([...storeMessage, newData]);
      });
    setAddMessage(false);
    setMessage('');
  };

  useEffect(() => {
    async function getMessages() {
      (await fetch('http://localhost:8080/messages')).json().then((data) => {
        setStoreMessage(data);
      });
    }
    getMessages();
  }, []);

  return (
    <>
      <Box>
        <Box
          sx={{
            backgroundColor: '#FFF',
            borderRadius: '1rem',
            p: 5,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Header authorName='Anonymous User' />
          {/* <Message /> */}
          {!addMessage && (
            <IconButton onClick={handleAddPost}>
              <AddBoxIcon sx={{ fontSize: '50px', color: '#3559E0' }} />
            </IconButton>
          )}
        </Box>
        {addMessage && (
          <Box
            sx={{
              m: 2,
              backgroundColor: '#FFF',
              borderRadius: '1rem',
              width: '50%',
              height: '20%',
              p: 2,
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <StyledTextArea
              placeholder='Write a message...'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleMessageInput(event);
              }}
            />
            <Box>
              {message !== '' && (
                <IconButton onClick={handleMessageSubmit}>
                  <AddCircleIcon sx={{ color: '#3559E0', fontSize: '3rem' }} />
                </IconButton>
              )}
              <IconButton
                onClick={() => {
                  setAddMessage(false);
                  setMessage('');
                }}
              >
                <CancelIcon sx={{ color: '#BF3131', fontSize: '3rem' }} />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>

      {storeMessage.length > 0 && (
        <>
          <StoreMessages
            storeMessages={storeMessage}
            setStoreMessages={setStoreMessage}
          />
        </>
      )}
    </>
  );
};
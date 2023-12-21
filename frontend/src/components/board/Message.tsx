import { Box } from '@mui/material';
import { Header } from './Header';
import {
  StyledButton,
  StyledCancelButton,
  StyledTextArea,
} from './styles/CustomStyles';
import { useEffect, useState } from 'react';
import { StoreMessages } from './StoreMessage';
import { MessageResponse } from './constants';

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
        setStoreMessage([...storeMessage, data]);
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
          <Header authorName='Shivam Srivastava' />
          {/* <Message /> */}
          {!addMessage && (
            <StyledButton variant='contained' onClick={handleAddPost}>
              New Message
            </StyledButton>
          )}
        </Box>
        {addMessage && (
          <Box sx={{ m: 3 }}>
            <Box>
              <StyledTextArea
                placeholder='Write a message...'
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleMessageInput(event);
                }}
              />
            </Box>
            <Box sx={{ textAlign: 'right', my: 3 }}>
              <StyledCancelButton
                variant='contained'
                onClick={() => {
                  setAddMessage(false);
                  setMessage('');
                }}
              >
                Cancel
              </StyledCancelButton>
              {message !== '' && (
                <StyledButton variant='contained' onClick={handleMessageSubmit}>
                  Post
                </StyledButton>
              )}
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

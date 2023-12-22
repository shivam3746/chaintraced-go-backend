import { Box, IconButton, Typography } from '@mui/material';
import { StyledTextArea } from './styles/CustomStyles';
import { Dispatch, useState } from 'react';
import { MessageResponse } from './constants';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send';
import QuickreplyOutlinedIcon from '@mui/icons-material/QuickreplyOutlined';

export const StoreMessages = ({
  storeMessages,
  setStoreMessages,
}: {
  storeMessages: MessageResponse[];
  setStoreMessages: Dispatch<React.SetStateAction<MessageResponse[]>>;
}) => {


  const [reply, setReply] = useState<string>('');
  const [replyMode, setReplyMode] = useState<boolean>(false);
  const [showReplyArea, setShowReplyArea] = useState<string | null>(null);

  const handleDeleteMessage = async (id: string) => {
    await fetch(`http://localhost:8080/messages/${id}`, {
      method: 'DELETE',
      mode: 'cors',
    });
    setStoreMessages(storeMessages.filter((item) => item.id !== id));
  };

  const handleReply = async (id: string) => {
    // setReplyMode(true);
    await fetch(`http://localhost:8080/messages/${id}/reply`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        text: reply,
        author: 'User',

      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {

        const newData = { ...data, replyMode: true };
        setStoreMessages([...storeMessages, newData]);
      });

    setReply('');
    setReplyMode(false);
    setShowReplyArea(null);
  }

  const handleReplyMode = (id: string) => {
    setReplyMode(true);
    setShowReplyArea(id);
  }

console.log(storeMessages)
  return (
    <>
      {storeMessages.map((item, index) => {
        return (
          <Box key={index}>
            {!item.replyMode &&
              <Box
                sx={{
                  backgroundColor: '#FFECD6',
                  borderRadius: '1rem',
                  p: 2,
                  m: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '50%',
                  height: '20%',
                }}
              >
                <Box>
                  <Typography variant='h5' >{item.author}</Typography>
                  <Typography variant='h4' >{item.text}</Typography>
                </Box>
                <Box>
                  {!replyMode && (
                    <IconButton
                      onClick={() => handleReplyMode(item.id)}
                      sx={{ width: '50%', height: '50%', color: '#3559E0' }}
                    >
                      <QuickreplyOutlinedIcon />
                    </IconButton>
                  )}
                  <IconButton
                    aria-label='delete'
                    onClick={() => handleDeleteMessage(item.id)}
                    sx={{ color: '#BF3131' }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Box>
              </Box>
            }
            {
              item.replyMode &&
              <Box
                sx={{
                  backgroundColor: '#7BD3EA',
                  borderRadius: '1rem',
                  width: '50%',
                  height: '20%',
                  marginLeft: 'auto',
                  marginRight: '30px',
                  p: 2,
                  my: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography variant='h5'>{item.author}</Typography>
                  <Typography variant='h4'>{item.text}</Typography>
                </Box>
              </Box>
            }
            {showReplyArea === item.id && (
              <Box
                sx={{
                  backgroundColor: '#FFF',
                  borderRadius: '1rem',
                  width: '50%',
                  height: '20%',
                  marginLeft: 'auto',
                  marginRight: '30px',
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <StyledTextArea
                  placeholder='Reply to this message'
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                />
                {reply !== '' &&
                  <IconButton
                    sx={{ color: '#3559E0' }}
                    onClick={() => handleReply(item.id)}
                  >
                    <SendIcon />
                  </IconButton>
                }
              </Box>
            )}

          </Box >
        );
      })}
    </>
  );
};
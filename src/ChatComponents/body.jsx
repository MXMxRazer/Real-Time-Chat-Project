import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, withStyles } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import Chat from './chatSender';
import { useState } from 'react';
import { useEffect } from 'react';
import { TextField } from '@mui/material';

export default function Body({ socket, details }) {

    const [currentMessage, current] = useState("");
    const [messageList, list] = useState([]);
    const send = async () => {
        const dataVar = {
            message: currentMessage,
            direction: 'right',
            time: (new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours())
                + ':' +
                (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes())
                + ' ' +
                (new Date().getHours() > 12 ? "PM" : "AM"),
            messenger: details.messenger,
            roomID: details.ID
        }

        await socket.emit('send_message', dataVar);
        list(prev => {
            return [...prev, dataVar];
        })
    }

    useEffect(() => {
        socket.on('receive_message', data => {
            data.direction = 'left';
            console.log(
                `RoomID: ${data.ID}\n
                Messenger: ${data.messenger}`
            )
            list(prev => {
                return [...prev, data];
            })
        })
    }, [socket]);

    const darkTheme = createTheme(
        {
            palette: {
                mode: 'dark'
            }
        }
    );

    return (
        <ThemeProvider theme={darkTheme}>
            <Box
                onSubmit={e => {
                    e.preventDefault();
                }}
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '100%',
                    justifyContent: 'center',
                    '& >: not(style)': {
                        m: 2,
                        width: '600px',
                        height: '100%',
                    },
                }}
            >
                <Paper
                    sx={{
                        borderRadius: 8,
                        zIndex: 10000,
                        overflow: 'hidden',
                    }}
                    elevation={20} >
                    <AppBar
                        position="static"
                        sx={{
                            p: 1,
                            borderRadius: 8,
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0
                        }}
                    >
                        <ToolBar
                            sx={{
                                borderRadius: 8,
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0
                            }}
                        >
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    ml: 2
                                }}
                            >
                                {`Chat Room: ${details.ID}`}
                            </Typography>
                        </ToolBar>
                    </AppBar>
                    <Container
                        sx={{
                            pt: '12px',
                            pb: '12px',
                            positon: 'relative',
                            height: 480,
                            overflowY: 'auto',
                            overflowX: 'hidden'
                        }}
                    >
                        {
                            messageList.map(item => {
                                return (
                                    <Chat
                                        Message={item.messenger + ':' + item.message}
                                        Direction={item.direction}
                                        Time={item.time}
                                    />
                                )
                            }
                            )
                        }
                    </Container>
                    <Box
                        sx={{
                            borderRadius: 8,
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderTop: '1px solid #555555',
                            zIndex: 1000,
                        }}
                    >
                        <InputBase
                            style={{
                                fontSize: '1.2rem',
                                padding: '0.6rem 1rem',
                                width: '100%',
                                borderRadius: 8,
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                                fontFamily: 'cursive',
                                color: 'white'
                            }}
                            placeholder={"Type here..."}
                            value={currentMessage}
                            onChange={e => {
                                current(e.target.value);
                            }}
                            onKeyPress={e => {
                                if (e.key === "Enter") {
                                    current('');
                                    send();
                                }
                            }}
                        />
                    </Box>
                </Paper>
            </Box>
        </ThemeProvider >
    );
}

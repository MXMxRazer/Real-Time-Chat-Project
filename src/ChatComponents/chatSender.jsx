import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Sender = ({ Message, Direction, Time }) => {

    return (
        <Box
            component="div"
            sx={{
                width: '100%',
                display: 'block',
                transform: (Direction == "right") ? 'translateX(32%)' : 'none'
            }}
        >
            <Box
                component="div"
                sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: (Direction == "right") ? "flex-end" : "flex-start"
                }}
            >
                <Paper
                    elevation={3}
                    component="div"
                    sx={{
                        display: 'inline-flex',
                        maxWidth: '70%',
                    }}
                >
                    <Container
                        sx={{
                            p: 1.6,
                            borderRadius: '8px',
                            background: (Direction == "right") ? "blue" : 'transparent'
                        }}
                    >
                        <Typography
                            variant="p"
                            component="div"
                            sx={{
                                fontFamily: 'cursive',
                                fontSize: '1rem',
                                background: (Direction == "right") ? "blue" : 'transparent'
                            }}
                        >
                            {Message}
                        </Typography>
                    </Container>
                </Paper>
                <Typography
                    variant="small"
                    sx={{
                        position: 'relative',
                        width: '68%',
                        display: 'flex',
                        padding: '0.3rem 0.2rem',
                        fontSize: '0.8rem',
                        color: 'darkgray',
                        fontFamily: 'cursive',
                        justifyContent: (Direction == "right") ? "flex-end" : "flex-start"
                    }}
                >
                    {Time}
                </Typography>
            </Box>
        </Box >
    );
}

export default Sender; 
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Backdrop from '@mui/material/Backdrop';
import { Box, Button, Container, Fab, Fade, Grid, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from "@mui/material";
import './discus.css'
import { QuestionAnswer } from "@mui/icons-material";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useDiscussData from '../hooks/useDiscussData';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const page = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();
    console.log(user)
    const router = useRouter();
    const [discuss, reload] = useDiscussData()
    console.log(discuss, discuss?.likes?.length)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handlePost = e => {
        e.preventDefault()
        if (user && user?.email) {

            const from = e.target
            const title = from.title.value
            const description = from.description.value
            const category = from.category.value
            // console.log(title, description, category)

            const discusItem = {
                name: user?.displayName,
                email: user?.email,
                photo: user?.photoURL,
                title,
                description,
                category,
            }

            axiosSecure.post('/discus', discusItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.__v === 0) {
                        toast.success("Your question has been posted");
                    }
                })
        } else {
            toast.success("You are not Logged In!");
            router.push("/login");
        }
    }

    const likePost = (id) => {
        const uId = {
            postId: id
        }
        axiosSecure.put('/questionLike', uId)
            .then(res => {
                console.log(res.data)
                if (res.data) {
                    toast.success("You like this question");
                    reload()
                }
            })
    }


    return (
        <Container maxWidth="xl">
            <Box className="discussion">
                {/*header part*/}
                <Stack className="discusHeader"
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1}
                >
                    <Typography className="topQus" variant="h4">Top Questions</Typography>
                    <div>
                        <Button className="askBtn" variant="outlined" onClick={handleOpen}>Ask Question</Button>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            slots={{ backdrop: Backdrop }}
                            slotProps={{
                                backdrop: {
                                    timeout: 500,
                                },
                            }}
                        >
                            <Fade in={open}>
                                <Box sx={style}>
                                    <form onSubmit={handlePost} className='from'>
                                        <TextField name='title'
                                            required
                                            className='input'
                                            id="outlined-multiline-flexible"
                                            label="Title"
                                            multiline
                                            maxRows={4}
                                        />
                                        <TextField name='description'
                                            required
                                            className='input'
                                            id="outlined-multiline-static"
                                            label="Description"
                                            multiline
                                            rows={4}
                                        />
                                        <InputLabel id="demo-select-small-label">Age</InputLabel>
                                        <Select className='input' name='category'
                                            required
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            autoWidth
                                            label="Age"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                        <Button type='submit' className="qusPost" variant="outlined">Post Question</Button>
                                    </form>
                                </Box>
                            </Fade>
                        </Modal>
                    </div>
                </Stack>
                <Box className="borderBot"></Box>

                {/* question part */}

                <Grid container className="discusContainer" spacing={2}>
                    <Grid item xs={0} md={6} lg={4} >content</Grid>
                    <Grid item xs={12} md={6} lg={8} className="qusContainer">
                        {
                            discuss?.map(question => <div key={question?._id}>

                                <Box sx={{
                                    width: {xs: 400 , md:700}
                                    }}>
                                    <h4>How do I break a string into words and track the index of is a each word (within the original string)?</h4>
                                    <p>50 Answers · 10 hours ago</p>
                                    <div className="btnIcon">
                                        <Button> <QuestionAnswer /> Answer</Button>
                                        <div className="like">
                                            <Button
                                                onClick={() => { likePost(question?._id) }}
                                            ><ThumbUpOffAltIcon /></Button>
                                            <span>{question?.likes?.length} links</span>
                                        </div>
                                    </div>
                                    <div className="qusDivider"></div>
                                </Box>
                            </div>)
                        }
                    </Grid>
                </Grid>

            </Box>
        </Container>
    );
};

export default page;
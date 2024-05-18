import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Button from "./button";
import TextInput from "./TextInput";
import { AutoAwesome, CreateRounded } from '@mui/icons-material';
import { GenerateAIImage } from './../api/index';
import CreatePost from './../pages/CreatePost';

const Form = styled.div`
    flex: 1;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 9%;
    justify-content: center;
`;
const Top = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;
const Title = styled.div`
    font-size: 25px;
    font-weight: 500;
    color: ${({theme}) => theme.text_primary};
`;
const Desc = styled.div`
    font-size: 17px;
    font-weight: 400;
    color: ${({theme}) => theme.text_secondary};
`;
const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    font-size: 12px;
    font-weight: 400;
    color: ${({theme}) => theme.text_secondary};
`;
const Actions = styled.div`
    display: flex;
    flex: 1;
    gap: 8px;
`;

const GenerateImageForm = ({
    post,
    setPost,
    createPostLoading,
    setCreatePostLoading,
    generatedImageLoading, 
    setGenerateImageLoading,
}) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const generateImageFun = async () => {
        setGenerateImageLoading(true);
        await GenerateAIImage({ prompt: post.prompt }).then((res) => {
            setPost({ ...post, photo: `data:image/jpeg;base64, ${res?.data?.photo}` });
        setGenerateImageLoading(false);
        })
        .catch((error) => {
            setError(error?.response?.data?.message);
            setGenerateImageLoading(false);
        });
    };

    const CreatePostFun = async () => {
        setCreatePostLoading(true);
        await CreatePost(post).then((res) => {
            setCreatePostLoading(false);
            navigate("/");
        })
        .catch((error) => {
            setError(error?.response?.data?.message);
            setCreatePostLoading(false);
        });
    };
  
    return (
    <Form>
        <Top>
            <Title>Generate AI Image with Prompt</Title>
            <Desc>Write a creative prompt to generate AI Image</Desc>
        </Top>
        <Body>
            <TextInput 
                label="Author" 
                placeholder="Enter Your Name . . . ."
                name="name"
                value={post.name}
                handelChange={(e)=>setPost({...post, name: e.target.value})}
            />
            <TextInput 
                label="Prompt" 
                placeholder="Write a detailed prompt about the image . . . ."
                rows="8"
                textArea
                value={post.prompt}
                handelChange={(e)=>setPost({...post, prompt: e.target.value})}
            />
            {error && <div style={{color: "red"}}>{error}</div>}
            ** You can post the AI Generated Image to the Community**
        </Body>
        <Actions>
            <Button 
                text="Generate Image" 
                flex leftIcon={<AutoAwesome />}                
                isLoading={generatedImageLoading}
                isDisabled={post.prompt === ""}
                onClick={() => generateImageFun()}
            />
            <Button 
                text="Upload Image" 
                flex type="secondary" 
                leftIcon={<CreateRounded />}
                isLoading={createPostLoading}
                isDisabled={post.name === "" || post.prompt === "" || post.photo === ""}
                onClick={() => CreatePostFun()}
            />
        </Actions>
    </Form>
  )
}

export default GenerateImageForm
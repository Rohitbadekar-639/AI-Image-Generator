import React from 'react'
import styled from 'styled-components'
import {useNavigate, useLocation} from "react-router-dom"
import Button from "./button";
import { AddRounded, ExploreRounded } from "@mui/icons-material";

const Container = styled.div`
    flex: 1;
    background: ${({theme}) => theme.navbar};
    color: ${({theme}) => theme.text_primary};
    font-weight: bold;
    font-size: 30px;
    padding: 15px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    @media only screen and (max-width: 600px){
        padding: 10px 12px;
    }
`;

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split("/");
    return (
        <Container>Gene AI
            {path[1] === 'post' ? ( 
                <Button 
                onClick={() => navigate("/")}
                text="Explore Images" leftIcon={<ExploreRounded style={{
                    fontSize: "20px",
            }}/>} 
            type="secondary"
            />
            ):(
            <Button 
                onClick={() => navigate("/post")}
                text="Create new Image" leftIcon={<AddRounded style={{
                    fontSize: "20px",
            }}/>} />
            )}
        </Container>
    )
}

export default Navbar
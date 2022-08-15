import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box bgcolor="text.secondary" color="white" width="100%" position="fixed" bottom={0} py={0.5}>
            <Container maxWidth="lg">
                <Typography textAlign="center">
                    phots up &reg; {new Date().getFullYear()}
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;
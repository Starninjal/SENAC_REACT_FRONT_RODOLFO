// src/components/ContactComponent/ContactComponent.tsx
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Grid, Paper} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import { ToastContainer, toast } from 'react-toastify';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import emailjs from 'emailjs-com';

const ContactComponent: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!name || !email || !message) {
            toast.error('Por favor, preencha todos os campos.');
            return;
        }

        const templateParams = {
            name,
            email,
            message
        };

        emailjs.send('service_oogmbcn', 'template_pptmlcd', templateParams, 'WnFFc-sie-ke9gEuC')
            .then((response: any) => {
                toast.success('Mensagem enviada com sucesso!');
                setName('');
                setEmail('');
                setMessage('');
            })
            .catch((err: any) => {
                console.error('FAILED...', err);
                toast.error('Falha ao enviar mensagem. Por favor, tente novamente.');
            });
    };

    return (
        <>
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: '16px' }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Contato
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                label="Nome"
                                variant="outlined"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Mensagem"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <Button variant="contained" color="primary" type="submit">
                                Enviar
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: '16px' }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Informações de Contato
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <WhatsAppIcon color="success" />
                                <Typography>WhatsApp: (48) 9 9372-5610</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PhoneIcon color="primary" />
                                <Typography>Telefone Fixo: (48) 3606-3062</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationOnIcon color="error" />
                                <Typography>Localização: Albernado Torres, 154</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <HomeIcon color="secondary" />
                                <Typography>Endereço: Bairro Albernador, Cidade Tubarão</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AccessTimeIcon />
                                <Typography>Horário de Funcionamento: 9h - 18h</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
        <ToastContainer />
        </>
    );
};

export default ContactComponent;
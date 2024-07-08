import { useEffect, useState } from "react";
import { fetchFAQ } from "../../services/QuestionAPI";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from "@mui/system";
interface FAQItem {
    question: string;
    answer: string;
}

// Estilizando o Accordion
const StyledAccordion = styled(Accordion)({
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    '&:not(:last-child)': {
        marginBottom: '15px',
    },
});

const FAQComponent: React.FC = () => {
    const [FAQ, setFaqData] = useState<FAQItem[]>([])
    const [loading, setLoading] = useState<boolean | null>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchFAQ().then((response) => {
            setFaqData(response.data);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        })
    }, []);

    return (
             <div className="container mt-5">
             <h1 className="text-center mb-4">FAQ</h1>
             {FAQ.map((faq, index) => (
                 <StyledAccordion key={index} className="mb-3">
                 <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                >
                <Typography>{faq.question}</Typography>
                </AccordionSummary> 
                <AccordionDetails>
                    <Typography>{faq.answer}</Typography>
                </AccordionDetails>
            </StyledAccordion>
        ))}
    </div>
       
);
    
}

export default FAQComponent;
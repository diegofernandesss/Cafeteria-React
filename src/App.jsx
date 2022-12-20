import { useState, useEffect } from "react";
import { Button, Container, Form, Modal, Col, Table, InputGroup, Row } from "react-bootstrap";
import Header from './components/Header';
import Footer from './components/Footer';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';

function App(){
    const [clientes, setClientes] = useState([]);
    const [filterresult, setFilterresult] = useState([]);
    const [serachcountry, setSearchcountry] = useState('');
    const [name, nameChange] = useState('');
    const [email, emailChange] = useState('');
    const [nascimento, nascimentoChange] = useState('');
    const [cep, cepChange] = useState('');
    const [validated, setValidated] = useState(false);


    const handlesearch = (event) => {
        const search = event.target.value;
        setSearchcountry(search);

        if(search !== ''){
            const filterdata = clientes.filter( (item)=> {
                return Object.values(item).join('').includes(search)
            })
            setFilterresult(filterdata);
        } else{
            setFilterresult(clientes);
        }
    }
    
    const URL= 'http://localhost:3030';
    
    useEffect(()=>{
        const getcountry = async () => {
            const getres= await fetch(URL +  '/clientes');
            const setcountry = await getres.json();
            setClientes(await setcountry);
        }
    getcountry();
    }, [])

    const handleReset = () => {
        nameChange("");
        emailChange("");
        nascimentoChange("");
        cepChange("");
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            toast.error("Preencha todos os campos",{position:toast.POSITION.TOP_CENTER});
        } else{
            const campos={name, email, nascimento, cep}

            fetch(URL  + '/clientes', {
                method:"POST",
                headers:{"content-type":"application/json"},
                body: JSON.stringify(campos)
            })
            .then((resp) => {return resp.json()})
            .then((data) => {
                toast.success("Enviado com Sucesso",{position:toast.POSITION.TOP_CENTER});
                setClientes([...clientes, data]);
    
                handleReset();
                
                setTimeout(() => {
                    handleClose();
                }, 2000);
            }).catch((error) => {
                toast.error("Erro ao enviar",{position:toast.POSITION.TOP_CENTER});
            })
        }

        setValidated(true);
       
    }
    

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
            <Header />
            <Container>
            <ToastContainer></ToastContainer>
            <Modal show={show} onHide={handleClose} >
                
                <Modal.Header closeButton>
                <Modal.Title>Cadastrar Cliente</Modal.Title>
                <ToastContainer></ToastContainer>
                </Modal.Header>
                <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Group as={Row} className="mb-3" controlId="validationCustom01">
                        <Form.Label column sm="3">
                            <strong>Nome</strong>
                        </Form.Label>
                        <Col sm="9">
                        <Form.Control
                            required
                            type="text"
                            placeholder="Digite seu Nome"
                            value={name} 
                            onChange={e=> nameChange(e.target.value)}
                        />
                        </Col>
                        
                    </Form.Group>


                    <Form.Group as={Row} className="mb-3" controlId="validationCustom02">
                        <Form.Label column sm="3">
                            <strong>E-mail</strong>
                        </Form.Label>
                        <Col sm="9">
                        <Form.Control
                            required
                            type="text"
                            placeholder="example@gmail.com"
                            value={email} onChange={e=> emailChange(e.target.value)}
                        />
                        </Col>
                            
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="validationCustomUsername">
                        <Form.Label column sm="3">
                            <strong>Nascimento</strong>
                        </Form.Label>
                        <Col sm="9">
                        <Form.Control
                            required
                            type="date"
                            placeholder="Digite o Seu Nascimento"
                            value={nascimento} onChange={e=> nascimentoChange(e.target.value)}
                        />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="validationCustom03">
                    <Form.Label column sm="3">
                        <strong>Cep</strong>
                    </Form.Label>
                    <Col sm="9">
                    <Form.Control 
                        required
                        placeholder="Digite o Seu Cep"
                        value={cep} onChange={e=> cepChange(e.target.value)}
                    />
                    </Col>
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="danger" onClick={handleReset}>
                            Limpar
                        </Button>
                        <Button variant="success" type="submit" >
                            Salvar
                        </Button>
                    </Modal.Footer>
                    
                </Form>
                </Modal.Body>
                
            </Modal>

            <Form inline="true">
            <h1 className="mt-3">Clientes</h1>
            <Button variant="success"
            className="rounded-circle mr-4 font-weight-bold mb-3" onClick={handleShow}>
                 +
            </Button>
                <Form.Group >
                <Form.Label className="mb-3" >
                    <strong>Pesquisar Clientes</strong>
                </Form.Label>
                    <Form.Control 
                        placeholder="Procurar por Nome, E-mail, Nascimento ou cep" 
                        className="mb-3"
                        onChange={(e)=> { handlesearch(e) }}
                        />
                </Form.Group>
            </Form>
            <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Nascimento</th>
                            <th>Cep</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            serachcountry.length > 0 ? (
                                filterresult.map((filtercountry, index) => (
                                        <tr key={index}>
                                            <td>{filtercountry.id}</td>
                                            <td>{filtercountry.name}</td>
                                            <td>{filtercountry.email}</td>
                                            <td>{filtercountry.nascimento}</td>
                                            <td>{filtercountry.cep}</td>
                                        </tr>
                                )
                                )
                            ):(
                            clientes.map((getcon, index)=>(
                                <tr key={index}>
                                    <td>{getcon.id}</td>
                                    <td>{getcon.name}</td>
                                    <td>{getcon.email}</td>
                                    <td>{getcon.nascimento}</td>
                                    <td>{getcon.cep}</td>
                                </tr>
                            )
                            )
                            )
                        }
                    </tbody>
                </Table>
                
            </Container >
            <Footer  />

        </>
    );

}

export default App;
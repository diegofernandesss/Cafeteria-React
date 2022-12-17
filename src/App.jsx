import { useState, useEffect } from "react";
import { Button, Container, Form, Modal, Col, Table, InputGroup } from "react-bootstrap";
import Header from './components/Header';
import Footer from './components/Footer';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';

function App(){
    const [clientes, setClientes] = useState([]);
    const [filterresult, setFilterresult] = useState([]);
    const [serachcountry, setSearchcountry] = useState('');
    const [id] = useState('');
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
    
    const URL= 'https://clientes.diegoda7.repl.co';
    
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
            e.stopPropagation();
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
            <h1 className="mt-3">Clientes</h1>
            <Button variant="success"
            className="rounded-circle mr-4 font-weight-bold mb-3" onClick={handleShow}>
                 +
            </Button>

            <Modal show={show} onHide={handleClose} >
                
                <Modal.Header closeButton>
                <Modal.Title>Cadastrar Cliente</Modal.Title>
                <ToastContainer></ToastContainer>
                </Modal.Header>
                <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label>Id</Form.Label>
                        <Form.Control
                            disabled="disabled"
                            value={id}
                            className="mb-3"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="validationCustom01">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            required
                            placeholder="Digite seu Nome"
                            value={name} 
                            onChange={e=> nameChange(e.target.value)}

                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="validationCustom02">
                        <Form.Label>E-mail</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                            required
                            type="text"
                            placeholder="example@gmail.com"
                            value={email} onChange={e=> emailChange(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="validationCustomUsername">
                        <Form.Label>Nascimento</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            placeholder="Digite o Seu Nascimento"
                            value={nascimento} onChange={e=> nascimentoChange(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="validationCustom03">
                    <Form.Label>Cep</Form.Label>
                    <Form.Control 
                        required
                        placeholder="Digite o Seu Cep"
                        value={cep} onChange={e=> cepChange(e.target.value)}
                    />
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
                <Form.Group >
                <Form.Label column sm="2">
                    <strong>CONSULTAR</strong>
                </Form.Label>
                <Col sm="5">
                    <Form.Control 
                        placeholder="Procurar por Nome, E-mail, Nascimento ou cep" 
                        className="mb-3"
                        onChange={(e)=> { handlesearch(e) }}
                        />
                </Col>
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

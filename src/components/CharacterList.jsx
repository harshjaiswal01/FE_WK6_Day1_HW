import React, { useEffect, useState } from 'react';
import md5 from 'md5';
import { Card, Row, Col, Container } from 'react-bootstrap';

const ts = '1';
const publicKey = '7c603c4ee6d0bd8d48191b647f5cdeaa';
const privateKey = 'd0546b0daadfd37956531a886c1283eb296949b2';
const hash = md5(ts + privateKey + publicKey);

const CharacterList = ({ onSelectCharacter }) => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
                const data = await response.json();
                setCharacters(data.data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCharacters();
    }, []);

    return (
        <Container>
            <Row>
                {characters.map(character => (
                    <Col key={character.id} sm={6} md={4} lg={3} className="mb-4">
                        <Card onClick={() => onSelectCharacter(character.id)} className="h-100 shadow" style={{ cursor: 'pointer' }}>
                            <Card.Img variant="top" src={`${character.thumbnail.path}.${character.thumbnail.extension}`} className="img-fluid" style={{ height: '12rem', objectFit: 'cover' }} />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{character.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CharacterList;

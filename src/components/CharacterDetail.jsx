import React, { useEffect, useState } from 'react';
import md5 from 'md5';
import { Container, Card, ListGroup } from 'react-bootstrap';

const ts = '1';
const publicKey = '7c603c4ee6d0bd8d48191b647f5cdeaa';
const privateKey = 'd0546b0daadfd37956531a886c1283eb296949b2';
const hash = md5(ts + privateKey + publicKey);

const CharacterDetail = ({ characterId }) => {
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            if (characterId) {
                try {
                    const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
                    const data = await response.json();
                    setCharacter(data.data.results[0]);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };
        fetchCharacter();
    }, [characterId]);

    if (!character) {
        return <div>Select a character to see details</div>;
    }

    return (
        <Container>
            <Card className="shadow-lg">
                <Card.Img variant="top" src={`${character.thumbnail.path}.${character.thumbnail.extension}`} />
                <Card.Body>
                    <Card.Title>{character.name}</Card.Title>
                    <Card.Text>{character.description}</Card.Text>
                </Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item><h5>Comics:</h5></ListGroup.Item>
                    {character.comics.items.map(comic => (
                        <ListGroup.Item key={comic.resourceURI}>{comic.name}</ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
        </Container>
    );
};

export default CharacterDetail;

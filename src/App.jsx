import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [selectedCharacterId, setSelectedCharacterId] = useState(null);

    const handleSelectCharacter = (characterId) => {
        setSelectedCharacterId(characterId);
    };

    return (
        <Container>
            <h1 className="text-center my-4">Marvel Characters</h1>
            <Row>
                <Col md={8}>
                    <CharacterList onSelectCharacter={handleSelectCharacter} />
                </Col>
                <Col md={4}>
                    <CharacterDetail characterId={selectedCharacterId} />
                </Col>
            </Row>
        </Container>
    );
};

export default App;

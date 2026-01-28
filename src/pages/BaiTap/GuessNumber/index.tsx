import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Typography, Space, Alert } from 'antd';

const { Title, Text, Paragraph } = Typography;

const RandomNumberGame: React.FC = () => {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [guessCount, setGuessCount] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [messageType, setMessageType] = useState<'success' | 'info' | 'warning' | 'error'>('info');
  const [history, setHistory] = useState<number[]>([]);

  const generateNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setTargetNumber(generateNumber());
    setUserGuess('');
    setMessage('Hãy đoán một số từ 1 đến 100!');
    setGuessCount(0);
    setGameOver(false);
    setMessageType('info');
    setHistory([]);
  };

  const handleGuess = () => {
    const guess = parseInt(userGuess);

    if (isNaN(guess)) {
      setMessage('Vui lòng nhập một số hợp lệ!');
      setMessageType('warning');
      return;
    }

    if (guess < 1 || guess > 100) {
      setMessage('Số phải nằm trong khoảng từ 1 đến 100!');
      setMessageType('warning');
      return;
    }

    const newGuessCount = guessCount + 1;
    setGuessCount(newGuessCount);
    setHistory([...history, guess]);

    if (guess === targetNumber) {
      setMessage('Chúc mừng! Bạn đã đoán đúng!');
      setMessageType('success');
      setGameOver(true);
    } else if (newGuessCount >= 10) {
      setMessage(`Bạn đã hết lượt! Số đúng là ${targetNumber}.`);
      setMessageType('error');
      setGameOver(true);
    } else if (guess < targetNumber) {
      setMessage('Bạn đoán quá thấp!');
      setMessageType('info');
    } else {
      setMessage('Bạn đoán quá cao!');
      setMessageType('info');
    }
    
    setUserGuess('');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Card title="Trò chơi đoán số" style={{ width: 400, textAlign: 'center' }}>
        <Title level={4}>Dự đoán số (1-100)</Title>
        <Paragraph>Bạn còn <strong>{10 - guessCount}</strong> lượt đoán.</Paragraph>
        
        {message && (
          <Alert message={message} type={messageType} showIcon style={{ marginBottom: 16 }} />
        )}

        <Space direction="vertical" style={{ width: '100%' }}>
          <Input 
            placeholder="Nhập số dự đoán..." 
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            disabled={gameOver}
            onPressEnter={handleGuess}
            type='number'
          />
          <Button type="primary" onClick={handleGuess} disabled={gameOver} block>
            Đoán
          </Button>
          
          {gameOver && (
            <Button type="default" onClick={startNewGame} block>
              Chơi lại
            </Button>
          )}
        </Space>
        
        {history.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <Text type="secondary">Lịch sử đoán: {history.join(', ')}</Text>
          </div>
        )}
      </Card>
    </div>
  );
};

export default RandomNumberGame;

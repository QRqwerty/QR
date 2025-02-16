import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { ClipboardIcon, Camera } from 'lucide-react';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [participantData, setParticipantData] = useState(null);

  // Функция для парсинга данных QR кода
  const parseQRData = (data) => {
    try {
      const [name, surname, rooms] = data.split(',');
      return {
        name,
        surname,
        rooms: rooms ? rooms.split(' ').map(Number) : 'all',
        timestamp: new Date().toISOString()
      };
    } catch (e) {
      throw new Error('Неверный формат QR кода');
    }
  };

  // Симуляция записи в БД
  const simulateDBWrite = (participant) => {
    console.log('Запись в общую таблицу:', {
      table: 'participants',
      data: participant
    });

    // Определяем в какие залы записать участника
    const rooms = participant.rooms === 'all' ? [1, 2, 3, 4] : participant.rooms;
    
    rooms.forEach(room => {
      console.log(`Запись в таблицу зала ${room}:`, {
        table: `room_${room}`,
        data: participant
      });
    });
  };

  // Обработка успешного сканирования
  const handleScanSuccess = (data) => {
    try {
      const parsedData = parseQRData(data);
      setParticipantData(parsedData);
      simulateDBWrite(parsedData);
      setScanResult('Успешно отсканировано');
      setError(null);
      if (showScanner) {
        setShowScanner(false);
      }
    } catch (e) {
      setError(e.message);
    }
  };

  // Инициализация сканера камеры
  useEffect(() => {
    let scanner = null;
    if (showScanner) {
      scanner = new Html5QrcodeScanner('reader', {
        qrbox: { width: 250, height: 250 },
        fps: 5,
      });
      scanner.render(handleScanSuccess, (error) => {
        console.warn(error);
      });
    }
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [showScanner]);

  // Обработка буфера обмена
  const handlePasteFromScanner = async () => {
    try {
      const text = await navigator.clipboard.readText();
      handleScanSuccess(text);
    } catch (e) {
      setError('Ошибка чтения из буфера обмена');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setShowScanner(!showScanner)}
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Camera className="mr-2 h-5 w-5" />
            {showScanner ? 'Скрыть сканер' : 'Открыть сканер камеры'}
          </button>
          
          <button
            onClick={handlePasteFromScanner}
            className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <ClipboardIcon className="mr-2 h-5 w-5" />
            Сканировать из буфера
          </button>
        </div>

        {showScanner && (
          <div id="reader" className="w-full"></div>
        )}

        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}

        {scanResult && !error && (
          <div className="p-4 mb-4 text-green-700 bg-green-100 rounded">
            {scanResult}
          </div>
        )}

        {participantData && (
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <h3 className="font-bold">Данные участника:</h3>
            <pre className="mt-2 whitespace-pre-wrap">
              {JSON.stringify(participantData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
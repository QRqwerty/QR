<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Scanner</title>
    
    <!-- Подключаем React -->
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    
    <!-- Подключаем библиотеку для сканирования QR -->
    <script src="https://unpkg.com/html5-qrcode"></script>
    
    <!-- Подключаем Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Стили для приложения -->
    <style>
        .button {
            @apply px-4 py-2 rounded-lg font-medium transition-colors;
        }
        .button-primary {
            @apply bg-blue-500 text-white hover:bg-blue-600;
        }
        .button-outline {
            @apply border border-gray-300 hover:bg-gray-100;
        }
        .card {
            @apply bg-white rounded-lg shadow-lg p-6;
        }
        .alert {
            @apply bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded;
        }
        #reader {
            width: 100% !important;
        }
        #reader video {
            width: 100% !important;
        }
    </style>
</head>
<body class="bg-gray-100">
    <div id="root"></div>

    <script type="text/babel">
        const QRScanner = () => {
            const [scanResult, setScanResult] = React.useState(null);
            const [error, setError] = React.useState(null);
            const [isCameraActive, setIsCameraActive] = React.useState(false);
            const [html5QrCode, setHtml5QrCode] = React.useState(null);

            React.useEffect(() => {
                // Очистка при размонтировании компонента
                return () => {
                    if (html5QrCode) {
                        html5QrCode.stop().catch(error => console.error('Ошибка при остановке камеры:', error));
                    }
                };
            }, [html5QrCode]);

            // Имитация работы с устройством сканирования
            const mockExternalScannerData = {
                scan: () => "John,Doe,1,3,4"
            };

            // Функция для разбора данных QR кода
            const parseQRData = (data) => {
                try {
                    const [firstName, lastName, ...rooms] = data.split(',');
                    return {
                        firstName,
                        lastName,
                        rooms: rooms.length ? rooms.map(Number) : 'all'
                    };
                } catch (err) {
                    throw new Error('Неверный формат QR кода');
                }
            };

            // Имитация сохранения в базу данных
            const saveToDatabase = (userData) => {
                console.log('Сохранение в общую таблицу participants:', {
                    first_name: userData.firstName,
                    last_name: userData.lastName,
                    rooms: userData.rooms
                });

                if (userData.rooms === 'all') {
                    console.log('Добавление пользователя во все таблицы rooms:');
                    [1, 2, 3, 4].forEach(roomId => {
                        console.log(`room_${roomId}:`, {
                            participant_id: `${userData.firstName}_${userData.lastName}`,
                            room_id: roomId
                        });
                    });
                } else {
                    console.log('Добавление пользователя в выбранные комнаты:');
                    userData.rooms.forEach(roomId => {
                        console.log(`room_${roomId}:`, {
                            participant_id: `${userData.firstName}_${userData.lastName}`,
                            room_id: roomId
                        });
                    });
                }
            };

            // Обработка данных от внешнего сканера
            const handleExternalScan = () => {
                try {
                    const scanData = mockExternalScannerData.scan();
                    const userData = parseQRData(scanData);
                    setScanResult(userData);
                    saveToDatabase(userData);
                } catch (err) {
                    setError('Ошибка при сканировании внешним устройством');
                }
            };

            // Реальное сканирование камерой
            const handleCameraScan = async () => {
                try {
                    setError(null);
                    setIsCameraActive(true);

                    const html5QrCode = new Html5Qrcode("reader");
                    setHtml5QrCode(html5QrCode);

                    const config = {
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                        aspectRatio: 1.0
                    };

                    await html5QrCode.start(
                        { facingMode: "environment" },
                        config,
                        async (decodedText) => {
                            // Успешное сканирование
                            try {
                                const userData = parseQRData(decodedText);
                                setScanResult(userData);
                                saveToDatabase(userData);
                                
                                // Останавливаем сканирование после успешного результата
                                await html5QrCode.stop();
                                setIsCameraActive(false);
                            } catch (err) {
                                setError('Неверный формат QR кода');
                            }
                        },
                        (errorMessage) => {
                            // Игнорируем промежуточные ошибки сканирования
                        }
                    );
                } catch (err) {
                    setError('Ошибка при доступе к камере');
                    setIsCameraActive(false);
                }
            };

            // Остановка сканирования
            const stopScanning = async () => {
                if (html5QrCode) {
                    try {
                        await html5QrCode.stop();
                        setIsCameraActive(false);
                    } catch (err) {
                        console.error('Ошибка при остановке сканирования:', err);
                    }
                }
            };

            return (
                <div className="max-w-md mx-auto p-4">
                    <div className="card">
                        <h2 className="text-2xl font-bold mb-4">QR Сканер</h2>
                        
                        <div className="space-y-4">
                            {!isCameraActive ? (
                                <>
                                    <button 
                                        onClick={handleCameraScan}
                                        className="button button-primary w-full"
                                    >
                                        Сканировать камерой
                                    </button>
                                    
                                    <button 
                                        onClick={handleExternalScan}
                                        className="button button-outline w-full"
                                    >
                                        Сканировать внешним устройством
                                    </button>
                                </>
                            ) : (
                                <button 
                                    onClick={stopScanning}
                                    className="button button-primary w-full"
                                >
                                    Остановить сканирование
                                </button>
                            )}
                        </div>

                        {isCameraActive && (
                            <div id="reader" className="mt-4"></div>
                        )}

                        {error && (
                            <div className="alert mt-4">
                                {error}
                            </div>
                        )}

                        {scanResult && (
                            <div className="mt-4 p-4 border rounded-lg">
                                <h3 className="font-bold">Результат сканирования:</h3>
                                <p>Имя: {scanResult.firstName}</p>
                                <p>Фамилия: {scanResult.lastName}</p>
                                <p>Доступ к залам: {
                                    scanResult.rooms === 'all' 
                                        ? 'Все залы' 
                                        : scanResult.rooms.join(', ')
                                }</p>
                            </div>
                        )}
                    </div>
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<QRScanner />);
    </script>
</body>
</html>

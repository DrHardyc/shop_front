import {useEffect, useRef} from 'react';

export default function VendorMap() {
    const mapRef = useRef(false);
    const mapInstance = useRef();

    useEffect(() => {
        if (!mapInstance.current) {
            mapInstance.current = true
            // Проверяем, что window.ymaps загружен и готов
            if (window.ymaps && window.ymaps.ready) {
                window.ymaps.ready(() => {
                    try {
                        // Создаем карту
                        mapInstance.current = new window.ymaps.Map(mapRef.current, {
                            center: [43.009673, 44.643474], // Координаты должны быть массивом
                            zoom: 15
                        });
                    } catch (error) {
                        console.error('Ошибка инициализации карты:', error);
                    }
                });
            } else {
                console.error('API Яндекс.Карт не загружен.');
            }
        }
    }, []);

    return (
        <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
    );
}
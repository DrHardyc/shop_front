import { Image } from 'antd';
export default function AntImageCustom(props){
    const defaultProps = {
        style: { borderRadius: '8px' },
        className: "w-full object-cover rounded-lg",
        width: 200, // Ширина по умолчанию
        height: 200, // Высота по умолчанию
        preview: false, // Отключение предпросмотра по умолчанию
        ...props, // Позволяем переопределить значения через props
    };

    return <Image {...defaultProps} />;
};

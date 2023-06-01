interface ModalProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    title: string;
    description: string;
    content: string;
    publishedAt: string;
    image: string;
    source: {
        name: string;
    };
}

export default function Modal({ isOpen, setOpen, title, description, content, publishedAt, image, source }: ModalProps) {
    if (isOpen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-60" onClick={() => setOpen(false)}></div>
                <div className="bg-white p-32 relative text-black">
                    <button
                        className="absolute top-2 right-2 text-4xl p-2"
                        onClick={() => setOpen(!isOpen)}> &times; </button>
                    <h2>{title}</h2>
                    <p>{publishedAt}</p>
                    <p>{description}</p>
                    <img src={image} alt="Imagem da notícia" />
                    <p>{content}</p>
                    <p>{source.name}</p>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}
interface ModalProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    title: string;
    content: string;
    publishedAt: string;
    image: string;
    url: string;
    source: {
        name: string;
    };
}

export default function Modal({ isOpen, setOpen, title, content, publishedAt, image, source, url }: ModalProps) {
    if (isOpen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center pl-16 pr-16 z-20">
                <div className="absolute inset-0 bg-black opacity-60" onClick={() => setOpen(false)}></div>
                <div className="bg-white p-10 relative text-black rounded-xl max-w-5xl">
                    <button
                        className="absolute top-2 right-2 text-4xl pt-0 pr-2 text-gray-500 hover:text-gray-700"
                        onClick={() => setOpen(!isOpen)}> &times; </button>
                    <h2 className="text-3xl font-bold mb-4">{title}</h2>
                    <p className="text-sm text-gray-500 mt-2">{publishedAt}</p>
                    <img className="w-96 h-auto object-cover" src={image} alt="Imagem da notícia" />
                    <p className="text-base leading-relaxed mb-2 max-w-2xl">{content}</p>
                    <a href={url} target="_blank" className="text-blue-500 hover:text-blue-700 font-bold">Saiba mais</a>

                    <p className="text-xl font-bold mt-2">Fonte: {source.name}</p>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}

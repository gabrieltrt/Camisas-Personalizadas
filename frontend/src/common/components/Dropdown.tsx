import { useState, ReactNode, useRef, useEffect } from "react";

interface DropdownInterface {
    className: string,
    togglerTitle: string | ReactNode,
    children: ReactNode
};

const Dropdown = ({ className, togglerTitle, children }: DropdownInterface) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        // fecha o dropdown quando se clica fora dele
        document.onclick = (evt: MouseEvent) => {
            if (!(containerRef.current! as HTMLElement).contains(evt.target as Node))
                setIsOpen(false);
        };
    }, []);

    return (
        <div className={`relative ${className}`} tabIndex={-1} ref={containerRef}>
            <button
                type="button"
                className="mp-dropdown"
                onClick={() => setIsOpen(!isOpen)}
            >
                {togglerTitle}
            </button>
            <div className="absolute right-0 bg-white rounded border p-2 px-4 top-full" hidden={!isOpen}>
                {children}
            </div>
        </div>
    )
};

export default Dropdown;
import { MutableRefObject, RefObject } from "react";
import Template from "./Template";
import Image from "./Image";

// interface do simulador
export default interface Simulator {
    colors: string[],
    customizable_areas: {
        id: number,
        name: string,
        index: number
    }[],
    images: {
        front: Image[],
        back: Image[],
        [key: string]: Image[]
    },
    currentTemplate: Template | null,
    currentTemplateRefs: {
        front: RefObject<SVGAElement> | null,
        back: RefObject<SVGAElement> | null,
        frontMask: MutableRefObject<HTMLDivElement> | null,
        backMask: MutableRefObject<HTMLDivElement> | null,
        [key: string]: any
    }
}
export interface Breed {
    weight: {
        imperial: string,
        metric: string
    },
    height: {
        imperial: string,
        metric: string
    },
    id: string;
    name: string;
    bred_for: string;
    breed_group: string;
    life_span: string;
    temperament: string;
    origin: string;
    reference_image_id: string,
    image: {
        id: string,
        width: number,
        height: number,
        url: string
    }
}

export interface User {
    name: string;
    email: string;
    password: string;
}
import { Photo } from "./Photo";


    export interface Member {
        id: number;
        userName: string;
        age: number;
        knownAs: string;
        created: Date;
        lastActive: Date;
        phototUrl: string;
        gender: string;
        introduction: string;
        lookingFor: string;
        interests: string;
        country: string;
        photos: Photo[];
    }




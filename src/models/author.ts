import { RefModel, SanityModel, TypedModel } from './common';

// export interface BioModel {
//     _key: string;
//     _type: string;
//     children: Child[];
//     markDefs: any[];
//     style: string;
// }

export interface AuthModel extends SanityModel {
    image: TypedModel & {
        asset: TypedModel & RefModel;
    };
    name: string;
    bio: string;
}

// interface RootObject {
//     _key: string;
//     _type: string;
//     children: Child[];
//     markDefs: any[];
//     style: string;
// }

// interface Child {
//     _key: string;
//     _type: string;
//     marks: any[];
//     text: string;
// }

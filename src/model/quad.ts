import { vec3, mat4 } from "gl-matrix";
import { Deg2Rad } from "./math";

export class Quad {
    position: vec3;
    model: mat4;

    constructor(position: vec3) {
        this.position = position;
    }

    update() {
        this.model = mat4.create();
        mat4.translate(this.model, this.model, this.position);
    }

    get_model(): mat4 {
        return this.model;
    }
}
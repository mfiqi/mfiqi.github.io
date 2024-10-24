import { vec3, mat4 } from "gl-matrix";
import { Deg2Rad } from "./math";

export class Camera {

    position: vec3;
    eulers: vec3;
    view: mat4;
    forwards: vec3;
    right: vec3;
    up: vec3;

    constructor(position: vec3, theta: number, phi: number) {
        this.position = position;
        this.eulers = [0, phi, theta];

        this.forwards = vec3.create();
        this.forwards = [
            Math.cos(Deg2Rad(this.eulers[2])) * Math.sin(Deg2Rad(this.eulers[1])),
            Math.sin(Deg2Rad(this.eulers[2])) * Math.sin(Deg2Rad(this.eulers[1])),
            Math.cos(Deg2Rad(this.eulers[1]))
        ];

        this.up = vec3.create();
        this.up = [0,1,0];

        this.right = vec3.create();
        vec3.cross(this.right, this.forwards, this.up);

        this.view = mat4.create();
        mat4.lookAt(this.view, this.position, [0.5,0.5,0.5], this.up);
    }

    update() {
        this.forwards = [
            Math.cos(Deg2Rad(this.eulers[2])) * Math.cos(Deg2Rad(this.eulers[1])),
            Math.sin(Deg2Rad(this.eulers[2])) * Math.cos(Deg2Rad(this.eulers[1])),
            Math.sin(Deg2Rad(this.eulers[1]))
        ];

        vec3.cross(this.right, this.forwards, [0,0,1]);

        vec3.cross(this.up, this.right, this.forwards);

        var target: vec3 = vec3.create();
        vec3.add(target, this.position, this.forwards);
        this.view = mat4.create();
        mat4.lookAt(this.view, this.position, target, this.up);
    }

    get_view(): mat4 {
        return this.view;
    }

    get_eye_position() : vec3 {
        return this.position;
    }
}
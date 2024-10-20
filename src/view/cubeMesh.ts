export class CubeMesh {

    vertexBuffer: GPUBuffer
    vertexBufferLayout: GPUVertexBufferLayout

    indexBuffer: GPUBuffer

    constructor(device: GPUDevice) {
        this.createVertexBuffer(device); // creates vertices and color arrays
        this.createIndexBuffer(device);
    }

    createVertexBuffer(device: GPUDevice) {
        // x y z ----------- Normal vector
        const vertices: Float32Array = new Float32Array(
            [
                0, 0, 1,    1,0,0,
                1, 0, 1,    0,1,0,
                1, 1, 1,    0,0,1,
                0, 1, 1,    1,0,1,

                0, 0, 0,    1,0,0,
                1, 0, 0,    0,1,0,
                1, 1, 0,    0,0,1,
                0, 1, 0,    1,0,1,

                0, 1, 1,    1,0,0,
                1, 1, 1,    0,1,0,
                1, 1, 0,    0,0,1,
                0, 1, 0,    1,0,1,

                0, 0, 1,    1,0,0,
                1, 0, 1,    0,1,0,
                1, 0, 0,    0,0,1,
                0, 0, 0,    1,0,1,

                1, 0, 1,    1,0,0,
                1, 0, 0,    0,1,0,
                1, 1, 0,    0,0,1,
                1, 1, 1,    1,0,1,

                0, 0, 1,    1,0,0,
                0, 0, 0,    0,1,0,
                0, 1, 0,    0,0,1,
                0, 1, 1,    1,0,1
            ]
        );

        //VERTEX: the buffer can be used as a vertex buffer
        //COPY_DST: data can be copied to the buffer
        const usage: GPUBufferUsageFlags = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST;

        const descriptor: GPUBufferDescriptor = {
            size: vertices.byteLength,
            usage: usage,
            mappedAtCreation: true //  allows buffer to be written by the CPU
        };

        this.vertexBuffer = device.createBuffer(descriptor);

        //Buffer has been created, now load in the vertices
        new Float32Array(this.vertexBuffer.getMappedRange()).set(vertices);
        this.vertexBuffer.unmap();

        //Defines buffer layout
        this.vertexBufferLayout = {
            arrayStride: 24, // to get to next element in array, step through 6 ints, int = 4 bytes, 6 ints = 20 bytes
            attributes: [
                // Position
                {
                    shaderLocation: 0,
                    format: "float32x3",
                    offset: 0
                },
                {
                    shaderLocation: 1,
                    format: "float32x3",
                    offset: 12
                }
                
                /*,
                // Vertex Normal
                {
                    shaderLocation: 1,
                    format: "float32x3",
                    offset: 12
                }*/
            ]
        }
    }

    createIndexBuffer(device: GPUDevice) {
        const cubeIndices: Uint16Array = new Uint16Array(
            [
                0, 1, 2,
                0, 2, 3,

                4, 5, 6,
                4, 6, 7,

                8, 9, 10,
                8, 10, 11,

                12, 13, 14,
                12, 14, 15,

                16, 17, 18,
                16, 18, 19,

                20, 21, 22,
                20, 22, 23
            ]
        );

        this.indexBuffer = device.createBuffer({
            size: cubeIndices.byteLength,
            usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
            mappedAtCreation: true
        });

        new Uint16Array(this.indexBuffer.getMappedRange()).set(cubeIndices);
        this.indexBuffer.unmap();
    }
}
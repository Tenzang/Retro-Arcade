    const startingPieces = 
    { 
        line: {
            orientations: [ // first element of each orientation is that pieces PIVOT
                {
                    pos: [
                        { x: 4, y: 0 }, // Pivot cell
                        { x: 3, y: 0 },
                        { x: 5, y: 0 },
                        { x: 6, y: 0 }
                    ],
                    id: {piece: 'line', orientation: 0}
                },
                {
                    pos: [
                        { x: 4, y: 0 }, // Pivot cell
                        { x: 4, y: -1 },
                        { x: 4, y: 1 },
                        { x: 4, y: 2 }
                    ],
                    id: {piece: 'line', orientation: 1}
                }
            ] 
        },
        square: {
            orientations: [
                {
                    pos: [
                        { x: 4, y: 1 }, // Pivot cell
                        { x: 5, y: 1 },
                        { x: 4, y: 0 },
                        { x: 5, y: 0 }
                    ],
                    id: {piece: 'square', orientation: 0}
                }
            ]
        },
        t: {
            orientations: [
                {
                    pos: [
                        { x: 5, y: 1 }, // Pivot cell
                        { x: 4, y: 1 }, 
                        { x: 6, y: 1 }, 
                        { x: 5, y: 0 }
                    ],
                    id: {piece: 't', orientation: 0}
                },
                {
                    pos: [
                        { x: 5, y: 1 }, // Pivot cell
                        { x: 5, y: 0 }, 
                        { x: 5, y: 2 }, 
                        { x: 6, y: 1 }
                    ],
                    id: {piece: 't', orientation: 1}
                },
                {
                    pos: [
                        { x: 5, y: 1 }, // Pivot cell
                        { x: 4, y: 1 }, 
                        { x: 6, y: 1 }, 
                        { x: 5, y: 2 }
                    ],
                    id: {piece: 't', orientation: 2}
                },
                {
                    pos: [
                        { x: 5, y: 1 }, // Pivot cell
                        { x: 5, y: 0 }, 
                        { x: 5, y: 2 }, 
                        { x: 4, y: 1 }
                    ],
                    id: {piece: 't', orientation: 3}
                }
            ] 
        },
        l: {
            orientations: [
                {
                    pos: [
                        { x: 5, y: 1 }, // Pivot cell
                        { x: 5, y: 0 },
                        { x: 5, y: 2 },
                        { x: 6, y: 2 }
                    ],
                    id: {piece: 'l', orientation: 0}
                },
                {
                    pos: [
                        { x: 5, y: 1 }, // Pivot cell
                        { x: 6, y: 1 },
                        { x: 4, y: 1 },
                        { x: 4, y: 2 }
                    ],
                    id: {piece: 'l', orientation: 1}
                },
                {
                    pos: [
                        { x: 5, y: 1 }, // Pivot cell
                        { x: 5, y: 0 },
                        { x: 5, y: 2 },
                        { x: 4, y: 0 }
                    ],
                    id: {piece: 'l', orientation: 2}
                },
                {
                    pos: [
                        { x: 5, y: 1 }, // Pivot cell
                        { x: 6, y: 1 },
                        { x: 4, y: 1 },
                        { x: 6, y: 0 }
                    ],
                    id: {piece: 'l', orientation: 3}
                }
            ] 
        },
        lReverse: {
            orientations: [
                {
                    pos: [
                        { x: 6, y: 1 }, // Pivot cell
                        { x: 6, y: 0 },
                        { x: 6, y: 2 },
                        { x: 5, y: 2 }
                    ],
                    id: {piece: 'lReverse', orientation: 0}
                },
                {
                    pos: [
                        { x: 6, y: 1 }, // Pivot cell
                        { x: 7, y: 1 },
                        { x: 5, y: 1 },
                        { x: 5, y: 0 }
                    ],
                    id: {piece: 'lReverse', orientation: 1}
                },
                {
                    pos: [
                        { x: 6, y: 1 }, // Pivot cell
                        { x: 6, y: 0 },
                        { x: 6, y: 2 },
                        { x: 7, y: 0 }
                    ],
                    id: {piece: 'lReverse', orientation: 2}
                },
                {
                    pos: [
                        { x: 6, y: 1 }, // Pivot cell
                        { x: 7, y: 1 },
                        { x: 5, y: 1 },
                        { x: 7, y: 2 }
                    ],
                    id: {piece: 'lReverse', orientation: 3}
                }
            ] 
        },
        z: {
            orientations: [
                {
                    pos: [
                        { x: 5, y: 1 }, // Pivot cell
                        { x: 4, y: 1 },
                        { x: 5, y: 0 },
                        { x: 6, y: 0 },
                    ],
                    next: () => { return this.z.orientations[1] },
                    prev: () => { return this.z.orientations[1] },
                    id: {piece: 'z', orientation: 0}
                },
                {
                    pos: [
                        { x: 5, y: 1 }, // Pivot cell
                        { x: 5, y: 0 },
                        { x: 6, y: 1 },
                        { x: 6, y: 2 },
                    ],
                    next: () => { return this.z.orientations[0] },
                    prev: () => { return this.z.orientations[0] },
                    id: {piece: 'z', orientation: 1}
                }
            ] 
        },
        zReverse: {
            orientations: [
                {
                    pos: [
                        { x: 5, y: 0 }, // Pivot cell
                        { x: 4, y: 0 },
                        { x: 5, y: 1 },
                        { x: 6, y: 1 },
                    ],
                    next: () => { return this.zReverse.orientations[1] },
                    prev: () => { return this.zReverse.orientations[1] },
                    id: {piece: 'zReverse', orientation: 0}
                },
                {
                    pos: [
                        { x: 5, y: 0 }, // Pivot cell
                        { x: 5, y: -1 },
                        { x: 4, y: 0 },
                        { x: 4, y: 1 },
                    ],
                    next: () => { return this.zReverse.orientations[0] },
                    prev: () => { return this.zReverse.orientations[0] },
                    id: {piece: 'zReverse', orientation: 1}
                }
            ] 
        }
    }

    // add next and prev properties to each orientation for rotate function
    let { orientations } = startingPieces.line;

    orientations[0].next = orientations[1]
    orientations[0].prev = orientations[1]

    orientations[1].next = orientations[0]
    orientations[1].prev = orientations[0]
    
    orientations = startingPieces.square.orientations;

    orientations[0].next = orientations[0]
    orientations[0].prev = orientations[0]

    orientations = startingPieces.t.orientations;

    orientations[0].next = orientations[1]
    orientations[0].prev = orientations[3]

    orientations[1].next = orientations[2]
    orientations[1].prev = orientations[0]

    orientations[2].next = orientations[3]
    orientations[2].prev = orientations[1]

    orientations[3].next = orientations[0]
    orientations[3].prev = orientations[2]

    orientations = startingPieces.l.orientations;

    orientations[0].next = orientations[1]
    orientations[0].prev = orientations[3]

    orientations[1].next = orientations[2]
    orientations[1].prev = orientations[0]

    orientations[2].next = orientations[3]
    orientations[2].prev = orientations[1]

    orientations[3].next = orientations[0]
    orientations[3].prev = orientations[2]

    orientations = startingPieces.lReverse.orientations;

    orientations[0].next = orientations[1]
    orientations[0].prev = orientations[3]

    orientations[1].next = orientations[2]
    orientations[1].prev = orientations[0]

    orientations[2].next = orientations[3]
    orientations[2].prev = orientations[1]

    orientations[3].next = orientations[0]
    orientations[3].prev = orientations[2]

    orientations = startingPieces.z.orientations;

    orientations[0].next = orientations[1]
    orientations[0].prev = orientations[1]

    orientations[1].next = orientations[0]
    orientations[1].prev = orientations[0]

    orientations = startingPieces.zReverse.orientations;

    orientations[0].next = orientations[1]
    orientations[0].prev = orientations[1]

    orientations[1].next = orientations[0]
    orientations[1].prev = orientations[0]


export default startingPieces;
